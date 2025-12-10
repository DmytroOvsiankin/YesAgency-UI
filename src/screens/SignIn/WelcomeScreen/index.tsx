import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';
import { margins } from '@/constants/sizes';
import { SCREENS } from '@/constants/navigation';
import AppleIcon from '@assets/signInMethods/apple.svg';
import GoogleIcon from '@assets/signInMethods/google.svg';
import FacebookIcon from '@assets/signInMethods/facebook.svg';

import {
  QUICKSAND_BOLD,
  QUICKSAND_MEDIUM,
  QUICKSAND_REGULAR,
  QUICKSAND_SEMI_B,
} from '@/constants/fonts';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { normalize } from '@/utils/fontSize';
import CustomLoginButton from './components/CustomLoginButton';

const WelcomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const handleGoogleSignIn = () => {
    // TODO: integrate Google sign-in
  };

  const handleAppleSignIn = () => {
    // TODO: integrate Apple sign-in
  };

  const handleFacebookSignIn = () => {
    // TODO: integrate Facebook sign-in
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Ahoj, vitaj v</Text>
        <Text style={styles.headerSubTitle}>YES TEAM AGENCY</Text>

        <CustomLoginButton
          onPress={handleGoogleSignIn}
          style={styles.button}
          icon={<GoogleIcon top={1} />}
          title="Sign in with Google"
        />

        {Platform.OS !== 'ios' && (
          <CustomLoginButton
            onPress={handleAppleSignIn}
            style={styles.button}
            icon={<AppleIcon top={1} />}
            title={'Continue with Apple'}
          />
        )}

        <PrimaryButton
          title="Continue with Facebook"
          onPress={handleFacebookSignIn}
          backgroundColor={'#1877F2'}
          prefixIcon={<FacebookIcon />}
        />

        <View style={styles.dividerRow}>
          <Text style={styles.dividerText}>alebo</Text>
        </View>

        <PrimaryButton
          title="Pokračuj cez e-mail"
          onPress={() => navigation.navigate(SCREENS.LoginByEmailScreen)}
        />

        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerText}>Nemáš ešte účet? </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.SignUpNavigation);
            }}
          >
            <Text style={styles.footerLink}>Zaregistruj sa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.legal}>
        Používaním aplikácie súhlasím s Podmienkami používania a Zásadami ochrany osobných údajov
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingHorizontal: margins.l,
    marginHorizontal: margins.xl,
    paddingVertical: margins.xxxl,
  },
  headerTitle: {
    textAlign: 'center',
    color: '#383B4D',
    fontSize: 30,
    fontFamily: QUICKSAND_BOLD,
    fontWeight: 700,
  },
  headerSubTitle: {
    textAlign: 'center',
    color: '#383B4D',
    fontSize: 30,
    fontFamily: QUICKSAND_BOLD,
    fontWeight: 700,
    marginBottom: normalize(32),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: margins.l,
  },
  dividerText: {
    marginHorizontal: margins.s,
    color: colors.semiPurpleText,
    fontSize: 13,
    fontFamily: QUICKSAND_MEDIUM,
    fontWeight: 500,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(32),
  },
  footerText: {
    marginTop: margins.s,
    color: colors.semiPurpleText,
    fontSize: 14,
    fontFamily: QUICKSAND_MEDIUM,
    fontWeight: 500,
  },
  footerLink: {
    color: colors.purple,
    fontFamily: QUICKSAND_SEMI_B,
    fontWeight: 600,
    fontSize: 14,
    textDecorationLine: 'underline',
    marginBottom: -5,
  },
  legal: {
    textAlign: 'center',
    color: '#F1EBF9',
    fontSize: 13,
    fontFamily: QUICKSAND_REGULAR,
    paddingHorizontal: margins.xl,
    paddingVertical: margins.xl,
  },
  button: {
    marginBottom: margins.l,
  },
});

export default WelcomeScreen;
