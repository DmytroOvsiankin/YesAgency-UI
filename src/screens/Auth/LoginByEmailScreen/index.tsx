import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@/constants/navigation';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import Input from '@/components/Inputs/Input';
import PasswordInput from '@/components/Inputs/PasswortInput';
import { colors } from '@/constants/colors';
import { QUICKSAND_REGULAR } from '@/constants/fonts';

const LoginByEmailScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePressLogin = () => {
    onSubmit({ email, password });
  };

  const onSubmit = ({ email, password }: { email: string; password: string }) => {};

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Header title="Prihlásenie cez email" onBackPress={() => navigation.goBack()} />

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Zadaj email..."
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordInput
            label="Heslo"
            placeholder="Zadaj heslo..."
            autoCapitalize="none"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot password */}
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.ForgottenPasswordScreen)}
            activeOpacity={0.7}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Zabudnuté heslo?</Text>
          </TouchableOpacity>

          <PrimaryButton onPress={handlePressLogin} title="Prihlás sa" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginByEmailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  form: {
    flexGrow: 1,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 44,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.purple,
    fontFamily: QUICKSAND_REGULAR,
    fontWeight: 400,
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
