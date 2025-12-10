import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { QUICKSAND_MEDIUM, QUICKSAND_SEMI_B } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';

type SelectorProps = {
  label: string;
  value?: string;
  placeholder: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
};

const Selector: React.FC<SelectorProps> = ({
  label,
  value,
  placeholder,
  onPress,
  containerStyle,
  leftAccessory,
  rightAccessory,
}) => {
  const hasValue = !!value;

  return (
    <View style={[styles.fieldGroup, containerStyle]}>
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>{label}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.inputWrapper} onPress={onPress}>
        {leftAccessory ? <View style={styles.leftAccessory}>{leftAccessory}</View> : null}

        <Text style={[styles.selectText, !hasValue && styles.placeholderText]} numberOfLines={1}>
          {value || placeholder}
        </Text>

        {rightAccessory ? <View style={styles.rightAccessory}>{rightAccessory}</View> : null}
      </TouchableOpacity>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  labelWrapper: {
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
  inputWrapper: {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    flex: 1,
    fontFamily: QUICKSAND_MEDIUM,
    fontSize: 16,
    color: colors.purpleLight,
  },
  placeholderText: {
    color: colors.purpleLight,
  },
  leftAccessory: {
    marginRight: 12,
  },
  rightAccessory: {
    marginLeft: 8,
  },
});
