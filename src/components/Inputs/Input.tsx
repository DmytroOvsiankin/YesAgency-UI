import { colors } from '@/constants/colors';
import { QUICKSAND_MEDIUM, QUICKSAND_SEMI_B } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;

  // Custom style overrides
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputTextStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.purpleLight}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: normalize(16),
  },

  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  labelText: {
    fontFamily: QUICKSAND_SEMI_B,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.72,
    color: colors.semiPurpleText,
    textAlignVertical: 'bottom',
    marginBottom: 4,
  },

  input: {
    height: 56,
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.purpleLight,
    borderRadius: 12,
    paddingHorizontal: normalize(16),
    fontSize: 16,
    fontFamily: QUICKSAND_MEDIUM,
    color: colors.purpleLight,
    backgroundColor: colors.white,
  },
});

export default Input;
