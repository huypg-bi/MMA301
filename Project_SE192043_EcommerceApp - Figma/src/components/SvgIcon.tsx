import { SvgProps } from 'react-native-svg';

type SvgIconProps = SvgProps & {
  name: string;
  width?: number;
  height?: number;
  color?: string;
};

// Map các SVG files từ assets
const svgMap: Record<string, any> = {
  backward: require('@/assets/svg/Backward.svg'),
  call: require('@/assets/svg/Call.svg'),
  close: require('@/assets/svg/Close.svg'),
  do_not_bleach: require('@/assets/svg/Do_Not_Bleach.svg'),
  do_not_tumble_dry: require('@/assets/svg/Do_Not_Tumble_Dry.svg'),
  do_not_wash: require('@/assets/svg/Do_Not_Wash.svg'),
  door_to_door_delivery: require('@/assets/svg/Door_to_Door_Delivery.svg'),
  down: require('@/assets/svg/Down.svg'),
  export: require('@/assets/svg/Export.svg'),
  filter: require('@/assets/svg/Filter.svg'),
  forward_arrow: require('@/assets/svg/Forward_Arrow.svg'),
  forward: require('@/assets/svg/Forward.svg'),
  gallery: require('@/assets/svg/Gallery.svg'),
  grid_view: require('@/assets/svg/grid_view.svg'),
  heart: require('@/assets/svg/Heart.svg'),
  iron_low_temperature: require('@/assets/svg/Iron_Low_Temperature.svg'),
  listview: require('@/assets/svg/Listview.svg'),
  location: require('@/assets/svg/Location.svg'),
  menu: require('@/assets/svg/Menu.svg'),
  plus: require('@/assets/svg/Plus.svg'),
  refresh: require('@/assets/svg/Refresh.svg'),
  resize: require('@/assets/svg/Resize.svg'),
  search: require('@/assets/svg/Search.svg'),
  shipping: require('@/assets/svg/Shipping.svg'),
  shopping_bag: require('@/assets/svg/shopping_bag.svg'),
  tag: require('@/assets/svg/Tag.svg'),
  up: require('@/assets/svg/Up.svg'),
  voucher: require('@/assets/svg/Voucher.svg'),
  logo: require('@/assets/svg/Logo.svg'),
  footer: require('@/assets/svg/Footer.svg'),
  openfashion: require('@/assets/svg/Openfashion.svg'),
  add_to_basket: require('@/assets/svg/Add_to_basket.svg'),
  twitter: require('@/assets/svg/Twitter.svg'),
  instagram: require('@/assets/svg/Instagram.svg'),
  youtube: require('@/assets/svg/Youtube.svg'),
  profile: require('@/assets/svg/profile.svg'),
  about: require('@/assets/svg/about.svg'),
  logout: require('@/assets/svg/logout.svg'),
  sercurity: require('@/assets/svg/sercurity.svg'),
  brush: require('@/assets/svg/Brush.svg'),
  noti: require('@/assets/svg/noti.svg'),
};

export function SvgIcon({ name, width = 24, height = 24, color = '#1A1A1A', ...props }: SvgIconProps) {
  const svgModule = svgMap[name];

  if (!svgModule) {
    console.warn(`SVG icon "${name}" not found`);
    return null;
  }

  const SvgComponent = svgModule.default ?? svgModule;

  return (
    <SvgComponent
      width={width}
      height={height}
      color={color}
      {...props}
    />
  );
}
