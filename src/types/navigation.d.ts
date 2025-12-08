import { SCREENS } from '@/constants/navigation';
import { REPORT_TYPES } from '@/constants/reports';
import { StackNavigationProp } from '@react-navigation/stack';

declare global {
  type RootStackParamList = {
    [SCREENS.MainRoot]: undefined;
    [SCREENS.MainScreen]: undefined;
    [SCREENS.WelcomeScreen]: undefined;
    [SCREENS.LoginByEmailScreen]: undefined;
    [SCREENS.ForgottenPasswordScreen]: undefined;
    [SCREENS.SignUpBasicInformationScreen]: undefined;
    [SCREENS.SignUpNavigation]: undefined;
  };

  type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
}
