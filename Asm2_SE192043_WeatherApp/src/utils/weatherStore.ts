import { WeatherResult } from './weatherApi';

let _data: WeatherResult | null = null;

export function setWeatherData(data: WeatherResult) {
  _data = data;
}

export function getWeatherData(): WeatherResult | null {
  return _data;
}
