const BASE_URL = process.env.EXPO_PUBLIC_WEATHER_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
  conditionCode: number;
  conditionMain: string;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  rain1h: number;
  icon: string;
}

export interface ForecastItem {
  dt: number;
  temperature: number;
  conditionCode: number;
  icon: string;
  pop: number;
}

export interface AirQualityData {
  aqi: number;
  pm25: number;
}

export interface WeatherResult {
  current: WeatherData;
  forecast: ForecastItem[];
  airQuality: AirQualityData | null;
  uvIndex: number | null;
}

export interface DailyForecast {
  dayLabel: string;
  date: string;
  tempMax: number;
  tempMin: number;
  conditionCode: number;
  icon: string;
  pop: number;
}

export function getDailyForecasts(items: ForecastItem[]): DailyForecast[] {
  const dayMap = new Map<string, ForecastItem[]>();
  items.forEach(item => {
    const d = new Date(item.dt * 1000);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(item);
  });

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  return Array.from(dayMap.entries())
    .slice(0, 7)
    .map(([, dayItems]) => {
      const date = new Date(dayItems[0].dt * 1000);
      const midnight = new Date(date);
      midnight.setHours(0, 0, 0, 0);
      const isToday = midnight.getTime() === todayMidnight.getTime();
      const mid = dayItems[Math.floor(dayItems.length / 2)];
      return {
        dayLabel: isToday ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' }),
        date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        tempMax: Math.max(...dayItems.map(i => i.temperature)),
        tempMin: Math.min(...dayItems.map(i => i.temperature)),
        conditionCode: mid.conditionCode,
        icon: mid.icon,
        pop: Math.max(...dayItems.map(i => i.pop)),
      };
    });
}

export function getWeatherIconAsset(conditionCode: number, iconCode?: string): any {
  const isDay = iconCode ? iconCode.endsWith('d') : true;

  if (conditionCode >= 200 && conditionCode < 300) {
    return require('@/assets/svg/cloud_thunder.svg');
  }
  if (conditionCode >= 300 && conditionCode < 400) {
    return isDay
      ? require('@/assets/svg/sun_cloud_mid_rain.svg')
      : require('@/assets/svg/moon_cloud.svg');
  }
  if (conditionCode >= 500 && conditionCode < 600) {
    return isDay
      ? require('@/assets/svg/sun_cloud_angled_rain.svg')
      : require('@/assets/svg/moon_cloud.svg');
  }
  if (conditionCode >= 600 && conditionCode < 700) {
    return isDay
      ? require('@/assets/svg/sun_cloud_mid_rain.svg')
      : require('@/assets/svg/moon_cloud.svg');
  }
  if (conditionCode === 781) {
    return require('@/assets/svg/tornado.svg');
  }
  if (conditionCode >= 700 && conditionCode < 800) {
    return isDay
      ? require('@/assets/svg/moon_fast_wind.svg')
      : require('@/assets/svg/moon_cloud_fast_wind.svg');
  }
  if (conditionCode === 800) {
    return isDay
      ? require('@/assets/svg/sun_cloud_mid_rain.svg')
      : require('@/assets/svg/moon_cloud.svg');
  }
  return isDay
    ? require('@/assets/svg/sun_cloud_angled_rain.svg')
    : require('@/assets/svg/moon_cloud_fast_wind.svg');
}

export function getAQILabel(aqi: number): string {
  const labels = ['Good', 'Fair', 'Moderate-Low Health Risk', 'Poor', 'Very Poor'];
  return `${aqi}-${labels[aqi - 1] ?? 'Unknown'}`;
}

async function safeFetch(url: string): Promise<any> {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export async function fetchWeatherData(city: string): Promise<WeatherResult> {
  if (!BASE_URL || !API_KEY) throw new Error('API configuration missing');

  let res: Response;
  try {
    res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
  } catch {
    throw new Error('No internet connection');
  }

  if (res.status === 404) throw new Error('City not found');
  if (!res.ok) throw new Error('Failed to fetch weather data');

  const raw = await res.json();
  const { lat, lon } = raw.coord;

  const [forecastRaw, airRaw, uvRaw] = await Promise.all([
    safeFetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
    safeFetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
    safeFetch(`${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
  ]);

  const current: WeatherData = {
    city: raw.name,
    country: raw.sys.country,
    lat,
    lon,
    temperature: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    tempMin: Math.round(raw.main.temp_min),
    tempMax: Math.round(raw.main.temp_max),
    description: raw.weather[0].description,
    conditionCode: raw.weather[0].id,
    conditionMain: raw.weather[0].main,
    humidity: raw.main.humidity,
    windSpeed: Math.round(raw.wind.speed * 3.6),
    windDeg: raw.wind.deg ?? 0,
    visibility: Math.round((raw.visibility ?? 10000) / 1000),
    pressure: raw.main.pressure,
    sunrise: raw.sys.sunrise,
    sunset: raw.sys.sunset,
    rain1h: raw.rain?.['1h'] ?? 0,
    icon: raw.weather[0].icon,
  };

  const forecast: ForecastItem[] = (forecastRaw?.list ?? []).map((item: any) => ({
    dt: item.dt,
    temperature: Math.round(item.main.temp),
    conditionCode: item.weather[0].id,
    icon: item.weather[0].icon,
    pop: Math.round((item.pop ?? 0) * 100),
  }));

  const airQuality: AirQualityData | null = airRaw?.list?.[0]
    ? { aqi: airRaw.list[0].main.aqi, pm25: Math.round(airRaw.list[0].components.pm2_5) }
    : null;

  const uvIndex: number | null =
    uvRaw?.value != null ? Math.round(uvRaw.value) : null;

  return { current, forecast, airQuality, uvIndex };
}
