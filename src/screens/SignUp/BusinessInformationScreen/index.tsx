import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import Input from '@/components/Inputs/Input';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styles } from './styles';
import { validateString } from '@/utils/validators';
import { SCREENS } from '@/constants/navigation';
import RadioButton from '@/components/Inputs/RadioSelector';

const SignUpBusinessInformationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [isVATpayer, setIsVATpayer] = useState('');
  const [ID, setID] = useState('');
  const [IDError, setIDError] = useState('');

  const [tradeName, setTradeName] = useState('');
  const [tradeNameError, setTradeNameError] = useState('');

  const [TIN, setTIN] = useState('');
  const [TINError, setTINError] = useState('');

  const [VAT_number, setVAT_number] = useState('');
  const [VAT_numberError, setVAT_numberError] = useState('');

  const handleContinue = () => {
    const ID_error = validateString(ID, 'IČO je povinné');
    const tradeName_Error = validateString(ID, 'Obchodný názov je povinné');
    const TIN_Error = validateString(ID, 'DIČ je povinné');
    const VatNumber_Error = isVATpayer ? validateString(ID, 'IČ DPH"') : '';

    setIDError(ID_error);
    setTradeNameError(tradeName_Error);
    setTINError(TIN_Error);
    setVAT_numberError(VatNumber_Error);

    //remove it
    onContinue();

    if (ID_error || tradeName_Error || TIN_Error) return;

    onContinue();
  };

  const onContinue = () => {
    console.log(ID, tradeName);
    navigation.navigate(SCREENS.SignUpPreferencesScreen);
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

          <StepIndicator currentStep={4} />
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
              label="IČO"
              placeholder="Zadaj IČO..."
              keyboardType="number-pad"
              value={ID}
              onChangeText={(text) => {
                setID(text);
                if (IDError) {
                  setIDError('');
                }
              }}
              maxLength={8}
              errorMessage={IDError}
            />
            <Input
              label="Obchodný názov"
              placeholder="Zadaj obchodný názov..."
              value={tradeName}
              onChangeText={(text) => {
                setTradeName(text);
                if (tradeNameError) {
                  setTradeNameError('');
                }
              }}
              maxLength={24}
              errorMessage={tradeNameError}
            />
            <Input
              label="DIČ"
              placeholder="Zadaj DIČ......"
              keyboardType="number-pad"
              value={TIN}
              onChangeText={(text) => {
                setTIN(text);
                if (TINError) {
                  setTINError('');
                }
              }}
              errorMessage={TINError}
            />

            <View style={{ marginBottom: 16 }}>
              {[{ label: 'Som platca DPH', value: 'true' }].map((option) => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  selected={isVATpayer === option.value}
                  onPress={() => setIsVATpayer(option.value)}
                />
              ))}
            </View>

            <>
              {isVATpayer && (
                <Input
                  label="IČ DPH"
                  placeholder="Zadaj IČ DPH..."
                  keyboardType="number-pad"
                  value={VAT_number}
                  onChangeText={(text) => {
                    setVAT_number(text);
                    if (VAT_numberError) {
                      setVAT_numberError('');
                    }
                  }}
                  errorMessage={VAT_numberError}
                />
              )}
            </>
          </>

          <PrimaryButton onPress={handleContinue} title={'Pokračovať'} style={{ marginTop: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpBusinessInformationScreen;
