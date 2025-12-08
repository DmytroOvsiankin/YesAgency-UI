import { colors } from '@/constants/colors';
import { QUICKSAND_SEMI_B } from '@/constants/fonts';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const StepIndicator = ({ currentStep = 1, totalSteps = 6 }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.barRow}>
        <View style={[styles.barActive, { flex: currentStep }]} />
        <View style={[styles.barInactive, { flex: totalSteps - currentStep }]} />
      </View>

      <Text style={styles.stepLabel}>
        {currentStep}/{totalSteps}
      </Text>
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 80,
    height: 4,
  },
  barActive: {
    height: 4,
    borderRadius: 1000,
    backgroundColor: colors.purple,
  },
  barInactive: {
    height: 4,
    borderRadius: 1000,
    backgroundColor: '#F1EBF9',
  },
  stepLabel: {
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.06,
    color: colors.semiPurpleText,
  },
});
