import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { SCREENS } from '@/constants/navigation';
import RadioButton from '@/components/Inputs/RadioSelector';
import DropdownSelector from '@/components/Inputs/DropdownSelector';
import SelectedIcon from '@assets/input/selected.svg';

import GastroRoleIcon from '@assets/roles/gastro.svg';
import HelperRoleIcon from '@assets/roles/helper.svg';
import HostessRoleIcon from '@assets/roles/hostess.svg';
import ManagerRoleIcon from '@assets/roles/manager.svg';
import PromoterRoleIcon from '@assets/roles/promoter.svg';

type PreferenceType = {
  label: string;
  description: string;
  icon: ReactNode;
  value: JopTypes;
  isSelected: boolean;
};

const districtOptions: DropdownOption[] = [
  { label: 'Bratislavský kraj', value: 'bratislavsky' },
  { label: 'Trnavský kraj', value: 'trnavsky' },
  { label: 'Trenčiansky kraj', value: 'trenciansky' },
  { label: 'Nitriansky kraj', value: 'nitriansky' },
  { label: 'Žilinský kraj', value: 'zilinsky' },
  { label: 'Banskobystrický kraj', value: 'banskobystricky' },
  { label: 'Prešovský kraj', value: 'presovsky' },
  { label: 'Košický kraj', value: 'kosicky' },
];

const ARE_YOU_STUDENT_OPTIONS: DropdownOption[] = [
  { label: 'Áno', value: 'yes' },
  { label: 'Nie', value: 'no' },
];

const PREFERENCE_ROLES: PreferenceType[] = [
  {
    label: 'Helper',
    description: 'Naloží, vyloží, prenesie, postaví, zbalí, asistuje',
    icon: <HelperRoleIcon />,
    value: 'helper',
    isSelected: false,
  },
  {
    label: 'Hosteska',
    description: 'Uvíta hostí, registruje účastníka, spravuje guest list, s úsmevom pomôže',
    icon: <HostessRoleIcon />,
    value: 'hostess',
    isSelected: false,
  },
  {
    label: 'Usporiadateľ/ka',
    description: 'Kontroluje na vstupoch, usadí na sektoroch, koordinuje parkovisko',
    icon: <ManagerRoleIcon />,
    value: 'technician',
    isSelected: false,
  },
  {
    label: 'Promotér/ka',
    description: 'Osloví, odprezentuje, zaujme, ponúkne produkt, zvýší viditeľnosť',
    icon: <PromoterRoleIcon />,
    value: 'promoter',
    isSelected: false,
  },
  {
    label: 'Gastro',
    description: 'Čašník, debaras, barman, výčap, kuchár, manažér',
    icon: <GastroRoleIcon />,
    value: 'gastro',
    isSelected: false,
  },
];

const SignUpPreferencesScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [selectedDistrict, setSelectedDistrict] = useState<string | string[]>([]);
  const [selectedDistrictError, setSelectedDistrictError] = useState<string>('');

  const [selectedAreYouStudent, setSelectedAreYouStudent] = useState<string>('');
  const [selectedAreYouStudentError, setSelectedAreYouStudentError] = useState<string>('');

  const [preferences, setPreferences] = useState<PreferenceType[]>(PREFERENCE_ROLES);
  const [preferencesError, setPreferencesError] = useState<string>('');

  const handleSelect = (value: JopTypes) => {
    setPreferences((prev) => {
      const updated = prev.map((option) =>
        option.value === value ? { ...option, isSelected: !option.isSelected } : option,
      );

      // Clear role error once at least one is selected
      if (updated.some((option) => option.isSelected)) {
        setPreferencesError('');
      }

      return updated;
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Clear previous errors
    setPreferencesError('');
    setSelectedAreYouStudentError('');
    setSelectedDistrictError('');

    // 1) At least 1 role
    const hasRole = preferences.some((option) => option.isSelected);
    if (!hasRole) {
      setPreferencesError('Vyberte aspoň 1 úlohu');
      isValid = false;
    }

    // 2) Student / not selected
    if (!selectedAreYouStudent) {
      setSelectedAreYouStudentError('Vyberte nejaký bod');
      isValid = false;
    }

    // 3) At least 1 district
    const hasDistrict =
      (Array.isArray(selectedDistrict) && selectedDistrict.length > 0) ||
      (!Array.isArray(selectedDistrict) && !!selectedDistrict);

    if (!hasDistrict) {
      setSelectedDistrictError('Vyberte aspoň 1 okres');
      isValid = false;
    }

    return isValid;
  };

  const handleContinue = () => {
    //remove it
    // navigation.navigate(SCREENS.SignUpPhotoScreen);

    const isValid = validateForm();
    if (!isValid) return;

    navigation.navigate(SCREENS.SignUpPhotoScreen);
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Header
            title="Registrácia"
            onBackPress={() => navigation.goBack()}
            containerStyle={{ marginBottom: 8 }}
          />

          <StepIndicator currentStep={5} />
        </View>

        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>O aké pozície mám záujem:</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formWrapper}>
            {preferences.map((option) => (
              <View key={option.value} style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.8}
                >
                  {option.isSelected && <SelectedIcon />}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.8}
                >
                  <View style={styles.helperIconWrapper}>{option.icon}</View>

                  <View style={styles.textBlock}>
                    <Text style={styles.title} numberOfLines={1}>
                      {option.label}
                    </Text>
                    <Text style={styles.subtitle}>{option.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}

            {/* Error: no role selected */}
            {preferencesError ? <Text style={styles.errorMessage}>{preferencesError}</Text> : null}

            <View style={styles.radioTitle}>
              <Text style={styles.sectionTitle}>Mám záujem aj o manažérku pozíciu:</Text>
            </View>

            {ARE_YOU_STUDENT_OPTIONS.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                selected={selectedAreYouStudent === option.value}
                onPress={() => {
                  setSelectedAreYouStudent(option.value);
                  setSelectedAreYouStudentError('');
                }}
              />
            ))}

            {/* Error: no student option chosen */}
            {selectedAreYouStudentError ? (
              <Text style={styles.errorMessage}>{selectedAreYouStudentError}</Text>
            ) : null}
          </View>

          <DropdownSelector
            label="Preferovaná pracovná lokalita:"
            value={selectedDistrict}
            placeholder="Vyber lokalita"
            options={districtOptions}
            multiple
            onChange={(newValue) => {
              setSelectedDistrict(newValue);

              const hasDistrict =
                (Array.isArray(newValue) && newValue.length > 0) ||
                (!Array.isArray(newValue) && !!newValue);

              if (hasDistrict) {
                setSelectedDistrictError('');
              }
            }}
          />

          {/* Error: no district chosen */}
          {selectedDistrictError ? (
            <Text style={styles.errorMessage}>{selectedDistrictError}</Text>
          ) : null}

          <PrimaryButton
            onPress={handleContinue}
            title="Pokračovať"
            style={{ marginTop: 28, marginBottom: 24 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpPreferencesScreen;
