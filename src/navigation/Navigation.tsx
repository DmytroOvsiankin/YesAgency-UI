import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { SCREENS } from '@/constants/navigation';
import WelcomeScreen from '@/screens/Auth/WelcomeScreen';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  // const { profile } = useAuth();

  // const { first_name, email } = profile;

  return (
    <Stack.Navigator
      initialRouteName={SCREENS.WelcomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.WelcomeScreen} component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
