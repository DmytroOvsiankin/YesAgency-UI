import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import DatePickerSelector from '@/components/Inputs/DatePickerSelector';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styles } from './styles';
import { SCREENS } from '@/constants/navigation';
import RadioButton from '@/components/Inputs/RadioSelector';
import DropdownSelector from '@/components/Inputs/DropdownSelector';

const districtOptions: DropdownOption[] = [
  { label: 'Bratislavský kraj', value: 'Bratislavský kraj' },
  { label: 'Trnavský kraj', value: 'Trnavský kraj' },
  { label: 'Trenčiansky kraj', value: 'Trenčiansky kraj' },
  { label: 'Nitriansky kraj', value: 'Nitriansky kraj' },
  { label: 'Žilinský kraj', value: 'Žilinský kraj' },
  { label: 'Banskobystrický kraj', value: 'Banskobystrický kraj' },
  { label: 'Prešovský kraj', value: 'Prešovský kraj' },
  { label: 'Košický kraj', value: 'Košický kraj' },
];

const ARE_YOU_STUDENT_OPTIONS: DropdownOption[] = [
  { label: 'Áno', value: 'yes' },
  { label: 'Nie', value: 'no' },
];

const SignUpPositionSelectionScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [selectedDistrict, setSelectedDistrict] = useState<string | string[]>([]);

  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState<string>('');
  const [selectedAreYouStudent, setSelectedAreYouStudent] = useState<string>('');

  const handleContinue = () => {
    onContinue();
  };

  const onContinue = () => {
    navigation.navigate(SCREENS.SignUpBusinessInformationScreen);
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Content */}
          <View style={styles.formWrapper}>
            <View style={styles.sectionTitleWrapper}>
              <Text style={styles.sectionTitle}>Mám záujem aj o manažérku pozíciu:</Text>
            </View>

            {ARE_YOU_STUDENT_OPTIONS.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                selected={selectedAreYouStudent === option.value}
                onPress={() => setSelectedAreYouStudent(option.value)}
              />
            ))}
          </View>
          <DropdownSelector
            label="Preferovaná pracovná lokalita:"
            value={selectedDistrict}
            placeholder="Vyber lokalita"
            options={districtOptions}
            multiple
            onChange={(newValue) => {
              setSelectedDistrict(newValue);
            }}
          />

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} style={{ marginTop: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpPositionSelectionScreen;
