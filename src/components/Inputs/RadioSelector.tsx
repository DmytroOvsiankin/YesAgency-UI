import { colors } from '@/constants/colors';
import { QUICKSAND_SEMI_B } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.outerCircle, selected && styles.outerCircleSelected]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  outerCircle: {
    width: 28,
    height: 28,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
  },
  outerCircleSelected: {
    borderColor: colors.purple,
  },
  innerCircle: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: colors.purple,
  },
  label: {
    fontSize: 16,
    color: colors.neutralBlack,
    fontFamily: QUICKSAND_SEMI_B,
    fontWeight: 600,
  },
});

export default RadioButton;
