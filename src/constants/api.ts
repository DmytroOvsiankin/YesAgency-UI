import Constants from 'expo-constants';

import { ENV } from './app';

//use localhost for now
export const BASE_URL = ENV === 'production' ? 'prod' : 'Qa';

// API
export enum API_VERSION_TYPE {
  'V1' = 'v1',
  'V2' = 'v2',
}

export const API_VERSION: API_VERSION_TYPE = API_VERSION_TYPE.V1;
export const API_URL = `${BASE_URL}/api/${API_VERSION}`;

export const APP_VERSION = Constants.expoConfig?.version;
export const SDK_VERSION = Constants.expoConfig?.sdkVersion;

export enum PATHS {
  // Auth
  PROFILE = '/profile/',
}

export const AUTH_PREFIX = 'Token ';
