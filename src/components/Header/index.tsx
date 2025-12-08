import { QUICKSAND_BOLD } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';
import BackButtonIcon from '@assets/buttons/backButton.svg';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

type HeaderProps = {
  title: string;
  onBackPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
};

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <BackButtonIcon />
      </TouchableOpacity>

      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: normalize(56),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(12),
    marginBottom: normalize(24),
    marginLeft: -12,
  },
  backButton: {},
  title: {
    fontSize: normalize(24),
    fontFamily: QUICKSAND_BOLD,
    fontWeight: 700,
    marginLeft: normalize(8),
  },
});

export default Header;
