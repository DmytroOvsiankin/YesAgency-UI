import Constants from 'expo-constants';
import * as Device from 'expo-device';
import moment from 'moment';
import { LogBox, Platform } from 'react-native';
import uuid from 'react-native-uuid';

import { API_URL, APP_VERSION } from '@/constants/api';
import { CHANNEL, ENV, LOG_LEVEL, NON_AUTHORIZED_USER } from '@/constants/app';

export let LOG_SESSION: SessionData = {
  level: LOG_LEVEL.ERROR,
  service_name: 'scooters-mobile',
  ENV,
  CHANNEL,
  AUTHORIZED: false,
  APP_VERSION: Constants.expoConfig?.version || '1.0.0',
  SCREEN: 'APP_INIT',
  USER: NON_AUTHORIZED_USER,
  USER_EMAIL: NON_AUTHORIZED_USER,
  PLATFORM: Platform.OS,
  DEVICE: Device.modelName || '',
  SESSION_ID: uuid.v4() as string,
  SESSION_START: new Date().toISOString(),
  KEY: '',
};

export const setLogAttributes = (attributes: Partial<SessionData>) => {
  LOG_SESSION = { ...LOG_SESSION, ...attributes };
};

export const logger = (key: string, data: any, level = LOG_LEVEL.DEBUG) => {
  const date = moment().format('HH:mm:ss');
  const logString = `+++ [LOG]:: [${key}]:: [${date}]:: ${JSON.stringify(data)}`;

  console.log(logString);
};

export const apiLogger = (key: string, request: any, response: ApiResponse) => {
  const date = moment().format('HH:mm:ss');
  const logString = `+++ [API]:: [${key}]:: [${date}]:: [REQUEST]:: ${JSON.stringify(
    request,
  )} [RESPONSE]:: ${JSON.stringify(response)}`;

  console.log(logString);
};

export const ignoreErrors = () => {
  LogBox.ignoreLogs([
    'Possible Unhandled Promise Rejection',
    '`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method',
    '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
  ]);
};

if (ENV === 'development') {
  logger('APP_VERSION', APP_VERSION);
  logger('CHANNEL', CHANNEL);
  logger('API_URL', API_URL);
  logger('ENV', ENV);
}
