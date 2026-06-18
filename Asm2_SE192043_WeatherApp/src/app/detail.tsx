import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '@/styles/detailStyles';
import { ForecastItem, getAQILabel, getWeatherIconAsset } from '@/utils/weatherApi';
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

function formatTime(unix: number): string {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getWindDir(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function getUVLabel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export default function DetailScreen() {
  const data = getWeatherData();
  const [tab, setTab] = useState<'hourly' | 'weekly'>('hourly');

  if (!data) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
            No data available.
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  const { current, forecast, airQuality, uvIndex } = data;

  const nowIndex = forecast.findIndex(item => isNowSlot(item.dt));
  const activeIndex = nowIndex >= 0 ? nowIndex : 0;

  function renderForecastCard(item: ForecastItem, index: number) {
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

  const aqiFill = airQuality?.aqi ?? 0;
  const uvFill = Math.min(uvIndex ?? 0, 11);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/Starry Mountain.png')}
        style={styles.bg}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerCity}>{current.city}</Text>
              <Text style={styles.headerCondition}>
                {current.temperature}° | {current.description}
              </Text>
            </View>
          </View>

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

          {/* Forecast scroll */}
          {forecast.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.forecastScroll}
            >
              {forecast.map((item, i) => renderForecastCard(item, i))}
            </ScrollView>
          )}

          {/* Cards section */}
          <View style={styles.sectionPadding}>
            {/* Air Quality */}
            {airQuality && (
              <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Image
                    source={require('@/assets/images/air_quality.png')}
                    style={styles.cardLabelIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.cardLabelText}>AIR QUALITY</Text>
                </View>
                <Text style={styles.aqiValue}>{getAQILabel(airQuality.aqi)}</Text>
                <View style={[styles.aqiBar, { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View style={{ flex: aqiFill, backgroundColor: '#00CFFF', borderRadius: 2 }} />
                  <View style={{ flex: 5 - aqiFill }} />
                </View>
                <View style={styles.seeMore}>
                  <Text style={styles.seeMoreText}>See more</Text>
                  <Text style={styles.seeMoreChevron}>›</Text>
                </View>
              </View>
            )}

            {/* UV Index + Sunrise row */}
            <View style={styles.gridRow}>
              {/* UV Index */}
              <View style={styles.gridCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Image
                    source={require('@/assets/images/uv_index.png')}
                    style={styles.cardLabelIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.cardLabelText}>UV INDEX</Text>
                </View>
                <Text style={styles.uvValue}>{uvIndex ?? '--'}</Text>
                <Text style={styles.uvLabel}>{uvIndex != null ? getUVLabel(uvIndex) : ''}</Text>
                <View style={[styles.uvBar, { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View style={{ flex: uvFill, backgroundColor: '#FFD700', borderRadius: 2 }} />
                  <View style={{ flex: 11 - uvFill }} />
                </View>
              </View>

              {/* Sunrise */}
              <View style={styles.gridCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Image
                    source={require('@/assets/images/sunrise.png')}
                    style={styles.cardLabelIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.cardLabelText}>SUNRISE</Text>
                </View>
                <Text style={styles.sunriseValue}>{formatTime(current.sunrise)}</Text>
                <View style={styles.sunsetRow}>
                  <Text style={styles.sunsetLabel}>Sunset:</Text>
                  <Text style={styles.sunsetValue}>{formatTime(current.sunset)}</Text>
                </View>
              </View>
            </View>

            {/* Wind + Rainfall row */}
            <View style={styles.gridRow}>
              {/* Wind */}
              <View style={styles.gridCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Image
                    source={require('@/assets/images/wind.png')}
                    style={styles.cardLabelIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.cardLabelText}>WIND</Text>
                </View>
                <Text style={styles.windValue}>{current.windSpeed}</Text>
                <Text style={styles.windUnit}>km/h</Text>
                <View style={styles.compassRow}>
                  <Text style={styles.compassLabel}>↑</Text>
                  <Text style={styles.compassLabel}>{getWindDir(current.windDeg)}</Text>
                </View>
              </View>

              {/* Rainfall */}
              <View style={styles.gridCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Image
                    source={require('@/assets/images/rainfall.png')}
                    style={styles.cardLabelIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.cardLabelText}>RAINFALL</Text>
                </View>
                <Text style={styles.rainfallValue}>
                  {current.rain1h.toFixed(1)}
                  <Text style={styles.rainfallUnit}> mm</Text>
                </Text>
                <Text style={styles.rainfallUnit}>in last hour</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
