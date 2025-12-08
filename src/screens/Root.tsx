import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import LoadingModal from '@/components/modals/LoadingModal';
import { LINKING_CONFIG, SCREENS } from '@/constants/navigation';
import AuthNavigation from '@/navigation/AuthNavigation';
import { AppNavigation } from '@/navigation/Navigation';
import { useAuth } from '@/providers/AuthProvider';
import { logger, setLogAttributes } from '@/utils/logger';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const NavigatorScreen = () => {
  const { isAuth, appLoading } = useAuth();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const [routeName, setRouteName] = useState<SCREENS | null>(null);

  const handleChangeState = () => {
    const route = navigationRef?.current?.getCurrentRoute()?.name as SCREENS;

    setLogAttributes({ SCREEN: routeName ? routeName : 'Error to get Screen name' });

    logger('CURRENT_ROUTE', route);

    setRouteName(route);
  };

  return !appLoading ? (
    <NavigationContainer<RootStackParamList>
      linking={LINKING_CONFIG}
      ref={navigationRef}
      onStateChange={handleChangeState}
      onReady={handleChangeState}
    >
      {isAuth ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  ) : (
    <LoadingModal visible mode="transparent" />
  );
};

export default observer(NavigatorScreen);
