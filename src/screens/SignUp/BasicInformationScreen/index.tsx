import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import DatePickerSelector from '@/components/Inputs/DatePickerSelector';
import DropdownSelector from '@/components/Inputs/DropdownSelector';
import Input from '@/components/Inputs/Input';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styles } from './styles';
import { validateEmail, validateName, validatePhone, validateSurname } from '@/utils/validators';
import { SCREENS } from '@/constants/navigation';

const genderOptions: DropdownOption[] = [
  { label: 'Muž', value: 'male' },
  { label: 'Žena', value: 'female' },
];

const SignUpBasicInformationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [gender, setGender] = useState<string | string[]>('');
  const [birthDate, setBirthDate] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleContinue = () => {
    const emailErr = validateEmail(email);

    const firstErr = validateName(firstName);
    const lastErr = validateSurname(lastName);
    const phoneErr = validatePhone(phone);

    setEmailError(emailErr);
    setFirstNameError(firstErr);
    setLastNameError(lastErr);
    setPhoneError(phoneErr);

    //remove it
    // onContinue();

    if (emailErr || firstErr || lastErr || phoneErr) return;

    onContinue();
  };

  const onContinue = () => {
    console.log(email, firstName, lastName, gender, birthDate, phone);
    navigation.navigate(SCREENS.SignUpSetPasswordScreen);
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

          <StepIndicator currentStep={1} totalSteps={6} />
        </View>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Základné údaje</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Content */}
          <>
            <Input
              label="Email"
              placeholder="Zadaj email..."
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) {
                  setEmailError('');
                }
              }}
              errorMessage={emailError}
            />
            <Input
              label="Meno"
              placeholder="Zadaj meno..."
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (firstNameError) setFirstNameError('');
              }}
              errorMessage={firstNameError}
            />
            <Input
              label="Priezvisko"
              placeholder="Zadaj priezvisko..."
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (lastNameError) setLastNameError('');
              }}
              errorMessage={lastNameError}
            />

            <DropdownSelector
              label="Pohlavie"
              value={gender}
              placeholder="Vyber pohlavie"
              options={genderOptions}
              onChange={(newValue) => {
                setGender(newValue);
              }}
            />

            <DatePickerSelector
              label="Dátum narodenia"
              placeholder="Vyber dátum narodenia"
              selectedDate={birthDate}
              changeDate={(date) => {
                setBirthDate(date);
              }}
            />

            <Input
              label="Tel. číslo"
              placeholder="Zadaj tel číslo..."
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (phoneError) setPhoneError('');
              }}
              errorMessage={phoneError}
              keyboardType="phone-pad"
            />
          </>

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} style={{ marginTop: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpBasicInformationScreen;
