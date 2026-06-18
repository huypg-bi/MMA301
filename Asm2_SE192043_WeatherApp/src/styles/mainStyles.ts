import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12122A',
  },
  bg: {
    position: 'absolute',
    marginTop: -100,
    marginLeft: -400,
    width: 1000,
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 4,
  },
  cityName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  temperature: {
    fontSize: 80,
    fontWeight: '200',
    color: '#FFFFFF',
    lineHeight: 88,
  },
  condition: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'capitalize',
    marginTop: 2,
    marginRight: 30,
  },
  hlRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
    marginRight: 20,
  },
  hlText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  houseContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseImage: {
    width: 350,
    height: 350,
    marginBottom: 5,
  },
  emptyHint: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bottomPanel: {
    backgroundColor: 'rgba(18, 18, 46, 0.94)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingBottom: 0,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 3,
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
  // Weekly forecast styles
  weeklyList: {
    paddingHorizontal: 20,
    paddingBottom: 6,
    maxHeight: 220,
  },
  weeklyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  weeklyDayLabel: {
    width: 54,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  weeklyIcon: {
    width: 34,
    height: 34,
    marginHorizontal: 8,
  },
  weeklyPop: {
    width: 38,
    fontSize: 12,
    color: '#00CFFF',
    fontWeight: '600',
  },
  weeklyTemps: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  weeklyTempH: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  weeklyTempL: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.38)',
  },
  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 8,
  },
  navIcon: {
    width: 26,
    height: 26,
    tintColor: 'rgba(255,255,255,0.5)',
  },
  navPlusBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B6FE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    marginTop: -24,
  },
  navPlusIcon: {
    width: 28,
    height: 28,
  },
});
