import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREENS } from '@/constants/navigation';
import WelcomeScreen from '@/screens/SignIn/WelcomeScreen';
import LoginByEmailScreen from '@/screens/SignIn/LoginByEmailScreen';
import ForgottenPasswordScreen from '@/screens/SignIn/ForgottenPasswordScreen';
import SignUpNavigation from './SignUpNavigation';
import EmailConfirmationScreen from '@/screens/SignIn/EmailConfirmationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.WelcomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={SCREENS.LoginByEmailScreen} component={LoginByEmailScreen} />
      <Stack.Screen name={SCREENS.ForgottenPasswordScreen} component={ForgottenPasswordScreen} />
      <Stack.Screen name={SCREENS.EmailConfirmationScreen} component={EmailConfirmationScreen} />
      <Stack.Screen name={SCREENS.SignUpNavigation} component={SignUpNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
