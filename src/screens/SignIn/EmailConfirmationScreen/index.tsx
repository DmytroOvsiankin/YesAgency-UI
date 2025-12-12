import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Input from '@/components/Inputs/Input';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SCREENS } from '@/constants/navigation';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.EmailConfirmationScreen>;

const EmailConfirmationScreen = ({ route }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const email = route.params?.email;
  const title = route.params?.title;

  const handleSubmit = () => {
    onSubmit();
  };

  const onSubmit = () => {
    navigation.navigate(SCREENS.LoginByEmailScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.description}>
          Otvor e‑mail a potvrď svoju adresu kliknutím na odkaz.
        </Text>
        <Text style={styles.description}>
          Ak e-mail nevidíš, skontroluj priečinok so spamom alebo hromadnou poštou.
        </Text>

        <PrimaryButton title="Prihlásiť sa" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EmailConfirmationScreen;
