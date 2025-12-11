import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREENS } from '@/constants/navigation';
import SignUpBasicInformationScreen from '@/screens/SignUp/BasicInformationScreen';
import SignUpSetPasswordScreen from '@/screens/SignUp/SetPasswordScreen';
import SignUpCooperationInformationScreen from '@/screens/SignUp/CooperationInformationScreen';
import SignUpBusinessInformationScreen from '@/screens/SignUp/BusinessInformationScreen';
import SignUpPreferencesScreen from '@/screens/SignUp/PreferencesScreen';

const Stack = createNativeStackNavigator();

const SignUpNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SignUpBasicInformationScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SCREENS.SignUpBasicInformationScreen}
        component={SignUpBasicInformationScreen}
      />
      <Stack.Screen name={SCREENS.SignUpSetPasswordScreen} component={SignUpSetPasswordScreen} />
      <Stack.Screen
        name={SCREENS.SignUpCooperationInformationScreen}
        component={SignUpCooperationInformationScreen}
      />
      <Stack.Screen
        name={SCREENS.SignUpBusinessInformationScreen}
        component={SignUpBusinessInformationScreen}
      />
      <Stack.Screen name={SCREENS.SignUpPreferencesScreen} component={SignUpPreferencesScreen} />
    </Stack.Navigator>
  );
};

export default SignUpNavigation;
