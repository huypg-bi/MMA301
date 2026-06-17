import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { styles } from '@/styles/tabBar';

interface TabBarProps {
  state: any;
  navigation: any;
}

const HOME_XML = (c: string) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3003 15.9182L8.56433 15.9182" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 21L8 21C5.23858 21 3 18.7614 3 16L3 11.2C3.00001 9.68109 3.69046 8.24453 4.87653 7.29568L8.87653 4.09568C10.7026 2.63477 13.2974 2.63477 15.1235 4.09568L19.1235 7.29568C20.3096 8.24455 21 9.6811 21 11.2L21 16C21 18.7614 18.7614 21 16 21Z" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const PLAY_XML = (c: string) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.941 9.05795L14.823 11.3539C15.314 11.6439 15.314 12.3549 14.823 12.6449L10.941 14.9409C10.441 15.2369 9.80902 14.8759 9.80902 14.2949L9.80902 9.70395C9.80902 9.12295 10.441 8.76195 10.941 9.05795Z" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 21L6 21C4.343 21 3 19.657 3 18L3 6C3 4.343 4.343 3 6 3L18 3C19.657 3 21 4.343 21 6L21 18C21 19.657 19.657 21 18 21Z" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const SEARCH_XML = (c: string) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1931 5.58187C16.5249 7.91369 16.5249 11.6943 14.1931 14.0261C11.8613 16.358 8.08062 16.358 5.7488 14.0261C3.41698 11.6943 3.41698 7.91369 5.7488 5.58187C8.08062 3.25005 11.8613 3.25005 14.1931 5.58187" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.15 14.0601L20 19.9901" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const HEART_XML = (c: string) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5091 5.9742L12 6.49112L11.4908 5.97412C10.5625 5.03106 9.29461 4.5 7.97132 4.5C6.64804 4.5 5.38012 5.03106 4.45182 5.97412C2.51606 7.96337 2.51606 11.1322 4.45182 13.1215L9.84447 18.5971C10.413 19.1747 11.1896 19.5 12 19.5C12.8105 19.5 13.587 19.1747 14.1556 18.5971L19.5482 13.1216C21.4839 11.1323 21.4839 7.96347 19.5482 5.97421C18.6199 5.03112 17.3519 4.50003 16.0286 4.50003C14.7053 4.50003 13.4374 5.03111 12.5091 5.9742Z" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const PROFILE_XML = (c: string) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20L20 19.25C20 16.9028 18.0972 15 15.75 15L8.25 15C5.90279 15 4 16.9028 4 19.25L4 20" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="12" cy="7" r="4" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ICON_MAP: Record<string, (color: string) => string> = {
  index: HOME_XML,
  play: PLAY_XML,
  search: SEARCH_XML,
  favorites: HEART_XML,
  profile: PROFILE_XML,
};

const ACTIVE_COLOR = '#FF7474';
const INACTIVE_COLOR = 'rgba(255,255,255,0.65)';

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#8A1C1C', '#200B0B']}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconFn = ICON_MAP[route.name];
          const iconColor = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              {iconFn && <SvgXml xml={iconFn(iconColor)} width={26} height={26} />}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
      {insets.bottom > 0 && (
        <View style={[styles.navBarFill, { height: insets.bottom }]} />
      )}
    </View>
  );
}
