import { SvgXml } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

interface FillableIconProps extends IconProps {
  filled?: boolean;
}

// Arrow.svg
export function ArrowIcon({ color = 'white', size = 32 }: IconProps) {
  const xml = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6667 10.6667L13.3333 16L18.6667 21.3334"
      stroke="${color}" stroke-opacity="0.7" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}

// dots.svg
export function DotsIcon({ color = 'white', size = 32 }: IconProps) {
  const xml = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.996 23.3364C15.6292 23.3364 15.329 23.6365 15.333 24.0033C15.333 24.3701 15.6332 24.6703 16 24.6703C16.3668 24.6703 16.6669 24.3701 16.6669 24.0033C16.6669 23.6365 16.3668 23.3364 15.996 23.3364"
      stroke="${color}" stroke-opacity="0.7" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.996 15.3331C15.6292 15.3331 15.329 15.6332 15.333 16C15.333 16.3668 15.6332 16.667 16 16.667C16.3668 16.667 16.6669 16.3668 16.6669 16C16.6669 15.6332 16.3668 15.3331 15.996 15.3331"
      stroke="${color}" stroke-opacity="0.7" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.996 7.32971C15.6292 7.32971 15.329 7.62984 15.333 7.99666C15.333 8.36348 15.6332 8.6636 16 8.6636C16.3668 8.6636 16.6669 8.36348 16.6669 7.99666C16.6669 7.62984 16.3668 7.32971 15.996 7.32971"
      stroke="${color}" stroke-opacity="0.7" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}

// Star.svg
export function StarIcon({ color = '#FF9900', size = 24, filled = false }: FillableIconProps) {
  const xml = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12 17.235L6.179 20L7.388 13.88L3 9.392L9.179 8.621L12 3L14.821 8.621L21 9.392L16.612 13.88L17.821 20L12 17.235Z"
      stroke="${color}" fill="${filled ? color : 'none'}"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}

// Heart icon (từ Frame 98.svg)
export function HeartIcon({ color = 'white', size = 24, filled = false }: FillableIconProps) {
  const xml = `<svg viewBox="281 20 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M291.509 21.9742L291 22.4911L290.491 21.9741C289.563 21.0311 288.295 20.5 286.971 20.5C285.648 20.5 284.38 21.0311 283.452 21.9741V21.9741C281.516 23.9634 281.516 27.1322 283.452 29.1215L288.844 34.5971C289.413 35.1747 290.19 35.5 291 35.5C291.81 35.5 292.587 35.1747 293.156 34.5971L298.548 29.1216C300.484 27.1323 300.484 23.9635 298.548 21.9742V21.9742C297.62 21.0311 296.352 20.5 295.029 20.5C293.705 20.5 292.437 21.0311 291.509 21.9742Z"
      stroke="${color}" fill="${filled ? color : 'none'}"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}
