import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREENS } from '@/constants/navigation';
import SignUpBasicInformationScreen from '@/screens/SignUp/BasicInformationScreen';

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
    </Stack.Navigator>
  );
};

export default SignUpNavigation;
