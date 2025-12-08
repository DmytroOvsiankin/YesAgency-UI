import { colors } from '@/constants/colors';
import { QUICKSAND_SEMI_B } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  postfixIcon?: React.ReactNode;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  backgroundColor = colors.purple,
  textColor = colors.white,
  style,
  textStyle,
  disabled,
  prefixIcon,
  postfixIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor }, styles.button, style]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}
      <Text style={[{ color: textColor }, styles.text, textStyle]}>{title}</Text>
      {postfixIcon && <View style={styles.postfixIcon}>{postfixIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: normalize(48),
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(16),
    fontFamily: QUICKSAND_SEMI_B,
  },
  prefixIcon: {
    marginRight: 8,
  },
  postfixIcon: {
    marginLeft: 8,
  },
});

export default PrimaryButton;
