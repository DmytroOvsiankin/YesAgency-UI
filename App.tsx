import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import { I18nextProvider } from 'react-i18next';

import { LOG_LEVEL } from '@/constants/app';
import { colors } from '@/constants/colors';
import AuthProvider from '@/providers/AuthProvider';
import NavigatorScreen from '@/screens/Root';
// import appStore from '@/stores/app';
import { bootstrap } from '@/utils/bootstrap';
import { ignoreErrors, logger } from '@/utils/logger';
import i18n from '@/utils/localization';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

ignoreErrors();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // const { init } = appStore;

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      // init();
      await Promise.all([bootstrap(), SplashScreen.preventAutoHideAsync()]);
    } catch (e) {
      logger('APP_INIT_ERROR', e, LOG_LEVEL.ERROR);
    } finally {
      setAppIsReady(true);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <I18nextProvider i18n={i18n}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NotifierWrapper>
                <AuthProvider>
                  <StatusBar style="dark" backgroundColor="transparent" />

                  <NavigatorScreen />
                </AuthProvider>
              </NotifierWrapper>
            </GestureHandlerRootView>
          </View>
        </I18nextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B5FFA',
  },
});
