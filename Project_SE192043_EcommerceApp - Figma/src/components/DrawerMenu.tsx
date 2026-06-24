import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/styles/color';
import { drawerStyles as styles } from '@/styles/drawerMenu';
import { SvgIcon } from './SvgIcon';

const GENDER_TABS = ['Women', 'Man', 'Kids'];

const CATEGORIES: { label: string; subItems?: string[] }[] = [
  { label: 'New' },
  {
    label: 'Apparel',
    subItems: ['Outer', 'Dress', 'Blouse/Shirt', 'T-Shirt', 'Knitwear', 'Skirt', 'Pants', 'Denim', 'Kids'],
  },
  { label: 'Bag' },
  { label: 'Shoes' },
  { label: 'Beauty' },
  { label: 'Accessories' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function DrawerMenu({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tabLayouts, setTabLayouts] = useState<Record<number, { x: number; width: number }>>({});

  const layout = tabLayouts[activeTab];
  const diamondLeft = layout != null ? layout.x + layout.width / 2 - 4 : undefined;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Close */}
        <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
          <SvgIcon name="close" width={24} height={24} color={COLORS.body} />
        </Pressable>

        {/* Gender tabs */}
        <View style={styles.tabsRow}>
          {GENDER_TABS.map((tab, i) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(i)}
              style={styles.tab}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                setTabLayouts((prev) => ({ ...prev, [i]: { x, width } }));
              }}
            >
              <Text style={[styles.tabText, i === activeTab && styles.tabTextActive]}>
                {tab.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Indicator line + diamond */}
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorLine} />
          {diamondLeft != null && (
            <View style={[styles.diamond, { left: diamondLeft }]} />
          )}
        </View>

        {/* Category list */}
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {CATEGORIES.map(({ label, subItems }) => (
            <View key={label}>
              <Pressable
                style={styles.item}
                onPress={() => subItems && setExpanded(expanded === label ? null : label)}
              >
                <Text style={styles.itemText}>{label}</Text>
                <SvgIcon
                  name={subItems ? (expanded === label ? 'up' : 'down') : 'down'}
                  width={20}
                  height={20}
                  color={COLORS.body}
                />
              </Pressable>

              {subItems && expanded === label && (
                <View style={styles.subList}>
                  {subItems.map((sub) => (
                    <Pressable key={sub} style={styles.subItem} onPress={onClose}>
                      <Text style={styles.subItemText}>{sub}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Footer contact + social */}
        <View style={[styles.drawerFooter, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.footerItem}>
            <SvgIcon name="call" width={20} height={20} color={COLORS.label} />
            <Text style={styles.footerText}>(786) 713-8616</Text>
          </View>
          <View style={styles.footerItem}>
            <SvgIcon name="location" width={20} height={20} color={COLORS.label} />
            <Text style={styles.footerText}>Store locator</Text>
          </View>
          <View style={styles.socialRow}>
            <Pressable hitSlop={8}>
              <SvgIcon name="twitter" width={22} height={22} color={COLORS.body} />
            </Pressable>
            <Pressable hitSlop={8}>
              <SvgIcon name="instagram" width={22} height={22} color={COLORS.body} />
            </Pressable>
            <Pressable hitSlop={8}>
              <SvgIcon name="youtube" width={22} height={22} color={COLORS.body} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
