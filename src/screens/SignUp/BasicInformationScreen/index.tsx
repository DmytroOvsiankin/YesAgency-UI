import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import DropdownSelector from '@/components/Inputs/DropdownSelector';
import Input from '@/components/Inputs/Input';
import StepIndicator from '@/components/StepIndicator';
import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD, QUICKSAND_MEDIUM, QUICKSAND_SEMI_B } from '@/constants/fonts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const genderOptions: DropdownOption[] = [
  { label: 'Muž', value: 'male' },
  { label: 'Žena', value: 'female' },
];

const SignUpBasicInformationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    onContinue({
      email,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
    });
  };

  const onContinue = ({
    email,
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    phone: string;
  }) => {};

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
          <View style={styles.formWrapper}>
            <Input
              label="Email"
              placeholder="Zadaj email..."
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Meno"
              placeholder="Zadaj meno..."
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              label="Priezvisko"
              placeholder="Zadaj priezvisko..."
              value={lastName}
              onChangeText={setLastName}
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
            {/* Birth date – as a pseudo date picker */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelWrapper}>
                <Text style={styles.labelText}>Dátum narodenia</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.inputWrapper, styles.dateWrapper]}
                // hook your date picker here
                onPress={() => {}}
              >
                {/* calendar “icon” placeholder */}
                <View style={styles.calendarIcon} />
                <Text
                  style={[styles.selectText, !birthDate && styles.placeholderText]}
                  numberOfLines={1}
                >
                  {birthDate || 'Vyber dátum narodenia'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone */}

            <Input
              label="Tel. číslo"
              placeholder="Zadaj tel číslo..."
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} style={{ marginTop: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpBasicInformationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    minHeight: Dimensions.get('window').height,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },

  /* Content */
  contentWrapper: {
    justifyContent: 'flex-start',
  },
  sectionTitleWrapper: {
    paddingHorizontal: 34,
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: QUICKSAND_BOLD,
    fontSize: 18,
    color: colors.neutralBlack,
  },

  formWrapper: {
    flexDirection: 'column',
  },

  fieldGroup: {
    marginBottom: 24,
  },
  labelWrapper: {
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  labelText: {
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.06,
    color: colors.semiPurpleText,
  },
  inputWrapper: {
    height: 56,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.semiPurpleText,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  /* Select-like input (gender) */
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  selectText: {
    flex: 1,
    fontFamily: QUICKSAND_MEDIUM,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: colors.neutralBlack,
  },
  placeholderText: {
    color: colors.semiPurpleText,
  },
  chevronDown: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.purple,
    transform: [{ rotate: '-45deg' }],
    marginLeft: 8,
  },

  /* Date picker-like field */
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: colors.purple,
    borderRadius: 6,
    marginRight: 10,
  },

  /* Primary button */
  primaryButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: QUICKSAND_SEMI_B,
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  },
});
