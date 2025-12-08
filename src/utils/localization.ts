import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import * as translations from '@/localizations';
import { getItem } from '@/utils/storage';

export const getDeviceLocale = (): Languages => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;
};

i18n
  .use({
    init: Function.prototype,
    type: 'languageDetector',
    async: true,
    detect: async (callback: (selectedLanguage: string) => void) => {
      const selectedLanguage = (await getItem('LOCALE')) || getDeviceLocale();

      callback(selectedLanguage);
    },
    cacheUserLanguage: () => {},
  })
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: translations,
    fallbackLng: 'sk',
  });

export default i18n;
