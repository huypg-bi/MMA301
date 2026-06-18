import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '@/styles/mainStyles';
import {
  DailyForecast,
  ForecastItem,
  WeatherResult,
  getDailyForecasts,
  getWeatherIconAsset,
} from '@/utils/weatherApi';
import { getWeatherData } from '@/utils/weatherStore';

function formatHour(dt: number): string {
  const d = new Date(dt * 1000);
  const h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12} ${ampm}`;
}

function isNowSlot(dt: number): boolean {
  return Math.abs(dt - Date.now() / 1000) < 5400;
}

export default function HomeScreen() {
  const [data, setData] = useState<WeatherResult | null>(null);
  const [tab, setTab] = useState<'hourly' | 'weekly'>('hourly');

  useFocusEffect(
    useCallback(() => {
      const stored = getWeatherData();
      if (stored) setData(stored);
    }, [])
  );

  const current = data?.current;
  const forecast = data?.forecast ?? [];
  const hourlySlots = forecast.slice(0, 6);
  const dailyForecasts = forecast.length > 0 ? getDailyForecasts(forecast) : [];

  const nowIndex = hourlySlots.findIndex(item => isNowSlot(item.dt));
  const activeIndex = nowIndex >= 0 ? nowIndex : 0;

  function renderHourlyCard(item: ForecastItem, index: number) {
    const isActive = index === activeIndex;
    const label = isActive ? 'Now' : formatHour(item.dt);
    return (
      <View key={item.dt} style={[styles.forecastCard, isActive && styles.forecastCardActive]}>
        <Text style={[styles.forecastTime, isActive && styles.forecastTimeActive]}>{label}</Text>
        <Image
          source={getWeatherIconAsset(item.conditionCode, item.icon)}
          style={styles.forecastIcon}
          contentFit="contain"
        />
        {item.pop > 0 && <Text style={styles.forecastPop}>{item.pop}%</Text>}
        <Text style={styles.forecastTemp}>{item.temperature}°</Text>
      </View>
    );
  }

  function renderWeeklyCard(item: DailyForecast) {
    const isToday = item.dayLabel === 'Today';
    return (
      <View
        key={item.dayLabel + item.date}
        style={[styles.forecastCard, isToday && styles.forecastCardActive]}
      >
        <Text style={[styles.forecastTime, isToday && styles.forecastTimeActive]}>
          {item.dayLabel}
        </Text>
        <Image
          source={getWeatherIconAsset(item.conditionCode, item.icon)}
          style={styles.forecastIcon}
          contentFit="contain"
        />
        <Text style={styles.forecastTemp}>{item.tempMax}°</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/Starry Mountain.png')}
        style={styles.bg}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        {/* City + temperature info */}
        <View style={styles.topSection}>
          {current ? (
            <>
              <Text style={styles.cityName}>{current.city}</Text>
              <Text style={styles.temperature}>{current.temperature}°</Text>
              <Text style={styles.condition}>{current.description}</Text>
              <View style={styles.hlRow}>
                <Text style={styles.hlText}>H:{current.tempMax}°</Text>
                <Text style={styles.hlText}>L:{current.tempMin}°</Text>
              </View>
            </>
          ) : null}
        </View>

        {/* House image — fills all space between info and bottom panel */}
        <View style={styles.houseContainer}>
          {current ? (
            <Image
              source={require('@/assets/images/House.png')}
              style={styles.houseImage}
              contentFit="contain"
            />
          ) : (
            <Text style={styles.emptyHint}>Tap + to search for a city</Text>
          )}
        </View>

        {/* Bottom panel */}
        <View style={styles.bottomPanel}>
          <View style={styles.dragHandle} />

          {/* Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'hourly' && styles.tabBtnActive]}
              onPress={() => setTab('hourly')}
            >
              <Text style={[styles.tabText, tab === 'hourly' && styles.tabTextActive]}>
                Hourly Forecast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'weekly' && styles.tabBtnActive]}
              onPress={() => setTab('weekly')}
            >
              <Text style={[styles.tabText, tab === 'weekly' && styles.tabTextActive]}>
                Weekly Forecast
              </Text>
            </TouchableOpacity>
          </View>

          {/* Hourly forecast */}
          {tab === 'hourly' && (
            hourlySlots.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.forecastScroll}
              >
                {hourlySlots.map((item, i) => renderHourlyCard(item, i))}
              </ScrollView>
            ) : (
              <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                  No forecast data
                </Text>
              </View>
            )
          )}

          {/* Weekly forecast — horizontal scroll, same shape as hourly */}
          {tab === 'weekly' && (
            dailyForecasts.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.forecastScroll}
              >
                {dailyForecasts.map(renderWeeklyCard)}
              </ScrollView>
            ) : (
              <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                  No forecast data
                </Text>
              </View>
            )
          )}

          {/* Bottom nav */}
          <View style={styles.bottomNav}>
            <Image
              source={require('@/assets/svg/map.svg')}
              style={styles.navIcon}
              contentFit="contain"
            />
            <TouchableOpacity
              style={styles.navPlusBtn}
              onPress={() => router.push('/search')}
            >
              <Image
                source={require('@/assets/svg/plus.svg')}
                style={styles.navPlusIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => current && router.push('/detail')}>
              <Image
                source={require('@/assets/svg/list.svg')}
                style={styles.navIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
