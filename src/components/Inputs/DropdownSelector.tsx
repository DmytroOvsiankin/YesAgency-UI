import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import Selector from '@/components/Inputs/Selector';
import { colors } from '@/constants/colors';

type DropdownSelectorProps = {
  label: string;
  value?: string; // selected value (value from options)
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string, option: DropdownOption) => void;
  disabled?: boolean;
};

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = useMemo(() => options.find((o) => o.value === value), [options, value]);

  const handleOpen = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleClose = (e?: GestureResponderEvent) => {
    setVisible(false);
  };

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value, option);
    setVisible(false);
  };

  return (
    <>
      <Selector
        label={label}
        value={selectedOption?.label}
        placeholder={placeholder}
        onPress={handleOpen}
        rightAccessory={<View style={styles.chevronDown} />}
      />

      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <TouchableOpacity activeOpacity={1} style={styles.backdrop} onPress={handleClose}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{label}</Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Zrušiť</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DropdownSelector;

const styles = StyleSheet.create({
  chevronDown: {
    width: 14,
    height: 14,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.purple,
    transform: [{ rotate: '-45deg' }],
    right: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white,
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    marginBottom: 12,
    color: colors.neutralBlack,
  },
  optionRow: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  optionRowSelected: {
    backgroundColor: colors.purple + '20', // light overlay
  },
  optionLabel: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: colors.neutralBlack,
  },
  optionLabelSelected: {
    fontFamily: 'Quicksand-Bold',
  },
  cancelButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: colors.purple,
  },
});
