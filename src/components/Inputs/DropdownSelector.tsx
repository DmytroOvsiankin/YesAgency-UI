import React, { useEffect, useMemo, useState } from 'react';
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
import SelectedIcon from '@assets/input/selected.svg';
import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD, QUICKSAND_MEDIUM, QUICKSAND_SEMI_B } from '@/constants/fonts';

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownSelectorProps = {
  label: string;
  value?: string | string[];
  placeholder: string;
  options: DropdownOption[];
  /** For multiple = false: (value, option)
   *  For multiple = true:  (values[], options[])
   */
  onChange: (value: string | string[], option: DropdownOption | DropdownOption[]) => void;
  disabled?: boolean;
  multiple?: boolean;
};

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
  multiple,
}) => {
  const [visible, setVisible] = useState(false);
  const [tempSelectedValues, setTempSelectedValues] = useState<string[]>([]);

  const isMultiple = !!multiple;

  /** Sync temp selection when modal opens */
  useEffect(() => {
    if (visible) {
      if (Array.isArray(value)) {
        setTempSelectedValues(value);
      } else if (typeof value === 'string' && value) {
        setTempSelectedValues([value]);
      } else {
        setTempSelectedValues([]);
      }
    }
  }, [visible, value]);

  /** Label for main Selector */
  const selectedLabel = useMemo(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) return undefined;

    if (Array.isArray(value)) {
      const selectedOptions = options.filter((o) => value.includes(o.value));
      if (!selectedOptions.length) return undefined;

      if (selectedOptions.length <= 3) {
        return selectedOptions.map((o) => o.label).join(', ');
      }

      const [first, ...rest] = selectedOptions;
      return `${first.label} + ${rest.length} ďalšie`;
    }

    const selectedOption = options.find((o) => o.value === value);
    return selectedOption?.label;
  }, [options, value]);

  const handleOpen = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleClose = (_e?: GestureResponderEvent) => {
    setVisible(false);
  };

  const toggleMultiValue = (option: DropdownOption) => {
    setTempSelectedValues((prev) => {
      if (prev.includes(option.value)) {
        return prev.filter((v) => v !== option.value);
      }
      return [...prev, option.value];
    });
  };

  const handleSelect = (option: DropdownOption) => {
    if (isMultiple) {
      toggleMultiValue(option);
    } else {
      onChange(option.value, option);
      setVisible(false);
    }
  };

  const handleConfirmMulti = () => {
    if (!isMultiple) {
      setVisible(false);
      return;
    }

    const selectedOptions = options.filter((o) => tempSelectedValues.includes(o.value));
    onChange(tempSelectedValues, selectedOptions);
    setVisible(false);
  };

  return (
    <>
      <Selector
        label={label}
        value={selectedLabel}
        placeholder={placeholder}
        onPress={handleOpen}
        rightAccessory={
          <View
            style={[
              styles.chevronDown,
              visible && styles.chevronDownOpen,
              disabled && styles.chevronDisabled,
            ]}
          />
        }
      />

      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <TouchableOpacity activeOpacity={1} style={styles.backdrop} onPress={handleClose}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{label}</Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = isMultiple
                  ? tempSelectedValues.includes(item.value)
                  : item.value === value;

                return (
                  <TouchableOpacity
                    style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {item.label}
                    </Text>
                    {isMultiple && (
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <SelectedIcon />}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />

            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelText}>Zrušiť</Text>
              </TouchableOpacity>

              {isMultiple && (
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmMulti}>
                  <Text style={styles.confirmText}>Hotovo</Text>
                </TouchableOpacity>
              )}
            </View>
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
  chevronDownOpen: {
    transform: [{ rotate: '135deg' }],
  },
  chevronDisabled: {
    borderColor: colors.neutralBlack + '60',
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
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 16,
    marginBottom: 12,
    color: colors.neutralBlack,
  },
  optionRow: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  optionRowSelected: {
    backgroundColor: colors.purple + '20', // light overlay
  },
  optionLabel: {
    fontFamily: QUICKSAND_MEDIUM,
    fontSize: 15,
    color: colors.neutralBlack,
  },
  optionLabelSelected: {
    fontFamily: QUICKSAND_BOLD,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.purple,
  },
  footerRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 14,
    color: colors.purple,
  },
  confirmButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.purple,
  },
  confirmText: {
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 14,
    color: colors.white,
  },
});
