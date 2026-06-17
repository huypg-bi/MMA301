import { View, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/styles/colors';
import { styles } from '@/styles/searchBar';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function ClearIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12 4L4 12M4 4L12 12"
        stroke={colors.textSecondary}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SearchBar({ value, onChangeText, placeholder = 'Search movies...', autoFocus }: Props) {
  return (
    <View style={styles.container}>
      <Svg width={18} height={18} viewBox="197 19 17 17" fill="none" style={styles.searchIcon}>
        <Path
          d="M208.193 21.5819C210.525 23.9137 210.525 27.6943 208.193 30.0261C205.861 32.358 202.081 32.358 199.749 30.0261C197.417 27.6943 197.417 23.9137 199.749 21.5819C202.081 19.2501 205.861 19.2501 208.193 21.5819"
          stroke={colors.textSecondary}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M208.15 30.0601L214 35.9901"
          stroke={colors.textSecondary}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoFocus={autoFocus}
        returnKeyType="search"
        selectionColor={colors.accent}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn}>
          <ClearIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}
