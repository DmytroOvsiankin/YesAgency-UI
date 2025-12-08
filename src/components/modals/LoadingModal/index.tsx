import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { QUICKSAND_REGULAR } from '@/constants/fonts';
import { Z_INDEX } from '@/constants/styles';
import { normalize } from '@/utils/fontSize';

type Props = {
  visible: boolean;
  text?: string;
  mode?: 'white' | 'transparent' | 'purple';
};

const LoadingModal = ({ visible, text, mode = 'transparent' }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>{text && <Text style={styles.text}>{text}</Text>}</View>

      <View style={[styles.blur, styles[mode]]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.LOADING_MODAL,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  text: {
    color: 'white',
    fontSize: normalize(24),
    fontWeight: '500',
    fontFamily: QUICKSAND_REGULAR,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  purple: {
    backgroundColor: colors.purple,
  },
  white: {
    backgroundColor: colors.white,
  },
});
export default LoadingModal;
