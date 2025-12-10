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

const TYPE_OF_WORK_OPTIONS = [
  { label: 'Chcem uzavrieť pracovný pomer', value: 'employment' },
  { label: 'Mám firmu / živnosť', value: 'trade' },
];

const ARE_YOU_STUDENT_OPTIONS = [
  { label: 'Áno', value: 'yes' },
  { label: 'Nie', value: 'no' },
];

const SignUpCooperationInformationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [expectedYearOfGraduation, setExpectedYearOfGraduation] = useState('');

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

          <StepIndicator currentStep={3} />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Content */}
          <View style={styles.formWrapper}>
            <View style={styles.sectionTitleWrapper}>
              <Text style={styles.sectionTitle}>Akým spôsobom chceš s nami spolupracovať?</Text>
            </View>
            {TYPE_OF_WORK_OPTIONS.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                selected={selectedTypeOfWork === option.value}
                onPress={() => setSelectedTypeOfWork(option.value)}
              />
            ))}

            <View style={styles.sectionTitleWrapper}>
              <Text style={styles.sectionTitle}>Si študent/ka alebo žiak/čka denného štúdia?</Text>
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
          <DatePickerSelector
            label="Predpokladaný rok ukončenia štúdia"
            placeholder="Zvoľ rok"
            selectedDate={expectedYearOfGraduation}
            containerStyle={styles.datePickerContainer}
            changeDate={(date) => {
              setExpectedYearOfGraduation(date);
            }}
          />

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} style={{ marginTop: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpCooperationInformationScreen;
