import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import { QUICKSAND_REGULAR } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import Input from '@/components/Inputs/Input';

const ForgottenPasswordScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [email, setEmail] = useState<string>('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = () => {
    if (!emailValid) return;

    onSubmit(email.trim());
  };

  const onSubmit = (email: string) => {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Header title="Zabudnuté heslo" onBackPress={() => navigation.goBack()} />
        <Text style={styles.description}>
          Zadaj svoj e-mail a pošleme ti odkaz na obnovenie hesla.
        </Text>

        <Input
          label="Email"
          placeholder="Zadaj email..."
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Email"
          containerStyle={styles.containerStyle}
        />

        <PrimaryButton
          title="Poslať odkaz"
          onPress={handleSubmit}
          // disabled={!emailValid}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgottenPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 16,
    color: colors.neutralBlack,
    marginBottom: 40,
    fontFamily: QUICKSAND_REGULAR,
    fontWeight: 400,
  },
  containerStyle: {
    marginBottom: 44,
  },
});
