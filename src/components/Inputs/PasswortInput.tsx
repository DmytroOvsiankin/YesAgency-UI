import { colors } from '@/constants/colors';
import { QUICKSAND_MEDIUM, QUICKSAND_SEMI_B } from '@/constants/fonts';
import ShowPasswordIcon from '@assets/input/showPassword.svg';
import { normalize } from '@/utils/fontSize';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

export interface PasswordInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;

  // Custom style overrides
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputTextStyle?: TextStyle;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  ...textInputProps
}) => {
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const toggleSecure = () => setIsSecure((prev) => !prev);

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
        secureTextEntry={isSecure}
        {...textInputProps}
      />

      <TouchableOpacity style={styles.eyeButton} onPress={toggleSecure} activeOpacity={0.7}>
        <ShowPasswordIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: normalize(16),
    position: 'relative',
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

  eyeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: 40,
  },
});

export default PasswordInput;
