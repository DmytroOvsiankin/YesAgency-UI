import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export enum SCREENS {
  MainRoot = 'MainRoot',
  MainScreen = 'MainScreen',
  WelcomeScreen = 'WelcomeScreen',
  LoginByEmailScreen = 'LoginByEmailScreen',
  ForgottenPasswordScreen = 'ForgottenPasswordScreen',
  SignUpNavigation = 'SignUpNavigation',
  SignUpBasicInformationScreen = 'SignUpBasicInformationScreen',
  SignUpSetPasswordScreen = 'SignUpSetPasswordScreen',
  SignUpCooperationInformationScreen = 'SignUpCooperationInformationScreen',
  SignUpBusinessInformationScreen = 'SignUpBusinessInformationScreen',
  SignUpPositionSelectionScreen = 'SignUpPositionSelectionScreen',
  SignUpPreferencesScreen = 'SignUpPreferencesScreen',
}

export const LINKING_CONFIG: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL(''), 'link', 'link'],
  config: {
    screens: {
      [SCREENS.MainRoot]: {
        path: 'downloads',
        parse: {
          no: (value: string) => decodeURIComponent(value),
        },
      },
      // [SCREENS.MainRoot]: '*',
    },
  },
};
