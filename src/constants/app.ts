import { Platform, PlatformIOSStatic } from 'react-native';

export const ENV = (process.env.EXPO_PUBLIC_NODE_ENV as Env) || 'production';
export const CHANNEL = process.env.EXPO_PUBLIC_CHANNEL || 'production';

export const isPad = (Platform as PlatformIOSStatic).isPad;

export const CONFIG_REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes

export const NON_AUTHORIZED_USER = 'NON_AUTHORIZED_USER';

export const REMOTE_CONFIG_DEFAULTS: RemoteConfig = {
  version: '----',
  'reservation.modal.promo': false,
};

export enum LOG_LEVEL {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  DEBUG = 'debug',
}

export const LEGAL_NAME = 'YesAgency corporation';
