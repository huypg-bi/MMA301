import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12122A',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
  },
  headerInfo: {
    flex: 1,
  },
  headerCity: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerCondition: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'capitalize',
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 3,
    marginTop: 12,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tabText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  forecastScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 8,
    marginBottom: 4,
  },
  forecastCard: {
    width: 72,
    marginRight: 10,
    borderRadius: 36,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  forecastCardActive: {
    backgroundColor: '#5A4FCF',
  },
  forecastTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  forecastTimeActive: {
    color: '#FFFFFF',
  },
  forecastIcon: {
    width: 36,
    height: 36,
  },
  forecastPop: {
    fontSize: 11,
    color: '#00CFFF',
    fontWeight: '600',
  },
  forecastTemp: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionPadding: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginLeft: 6,
  },
  cardLabelIcon: {
    width: 14,
    height: 14,
  },
  aqiValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  aqiBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  aqiBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  seeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 10,
  },
  seeMoreText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  seeMoreChevron: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  gridCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    padding: 16,
  },
  uvValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  uvLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  uvBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 12,
  },
  sunriseValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  sunsetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sunsetLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  sunsetValue: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  windValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  windUnit: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  compassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  compassLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  rainfallValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  rainfallUnit: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
});
