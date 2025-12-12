import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styles } from './styles';
import PasswordInput from '@/components/Inputs/PasswordInput';
import { SCREENS } from '@/constants/navigation';

const SignUpSetPasswordScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [repeatPassword, setRepeatedPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;

  const validatePassword = (pwd: string) => {
    return passwordRegex.test(pwd);
  };

  const handleContinue = () => {
    const isPasswordValid = validatePassword(password);

    //remove it
    // onContinue();

    if (!isPasswordValid) {
      setPasswordError('Heslo nespĺňa požiadavky');
      return;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError('Heslá sa nezhodujú');
    }

    onContinue();
  };

  const onContinue = () => {
    navigation.navigate(SCREENS.SignUpCooperationInformationScreen);
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

          <StepIndicator currentStep={2} />
        </View>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Heslo</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Content */}
          <View style={styles.formWrapper}>
            <PasswordInput
              label="Heslo"
              placeholder="Zadaj heslo..."
              autoCapitalize="none"
              textContentType="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) {
                  setPasswordError('');
                }
              }}
              errorMessage={passwordError}
            />

            <PasswordInput
              label="Potvrdenie hesla"
              placeholder="Zadaj heslo..."
              autoCapitalize="none"
              textContentType="password"
              value={repeatPassword}
              onChangeText={(text) => {
                setRepeatedPassword(text);
                if (repeatPasswordError) {
                  setRepeatPasswordError('');
                }
              }}
              errorMessage={repeatPasswordError}
            />

            <View style={styles.hintContainer}>
              <Text style={styles.title}>Heslo by malo byť bezpečné a obsahovať:</Text>
              <View>
                <View style={styles.dot} />
                <Text style={styles.hintText}>min. 8 znakov,</Text>
              </View>
              <View>
                <View style={styles.dot} />
                <Text style={styles.hintText}>veľké a malé písmeno (A-Z, a-z),</Text>
              </View>
              <View>
                <View style={styles.dot} />
                <Text style={styles.hintText}>číslo (0-9),</Text>
              </View>
              <View>
                <View style={styles.dot} />
                <Text style={styles.hintText}>špeciálny znak (!@#$%^&).</Text>
              </View>
              <Text style={styles.note}>Vyhnite sa bežným slovám a osobným údajom.</Text>
            </View>
          </View>

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpSetPasswordScreen;
