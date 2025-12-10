import { colors } from '@/constants/colors';
import { QUICKSAND_MEDIUM } from '@/constants/fonts';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';

type CustomLoginButtonProps = {
  onPress: () => void;
  icon: any;
  title: string;
  style?: ViewStyle;
};

const CustomLoginButton: React.FC<CustomLoginButtonProps> = ({ onPress, style, icon, title }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, style]}>
      <View style={styles.content}>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleIcon: {
    fontSize: 18,
    color: '#000000',
  },
  text: {
    fontFamily: QUICKSAND_MEDIUM,
    fontWeight: 500,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },
});

export default CustomLoginButton;
