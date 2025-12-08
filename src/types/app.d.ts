import { LOG_LEVEL } from '@/constants/app';

declare global {
  type RemoteConfig = {
    version: string;
    'reservation.modal.promo': boolean;
  };

  type Env = 'development' | 'production';
  type Channel = 'development-simulator' | 'development' | 'preview' | 'production';

  type CrashlyticsAttributes = 'APP_VERSION' | 'CHANNEL' | 'ENV' | 'SCREEN';

  type LogLevel = LOG_LEVEL;

  type LogSessionAttributes =
    | CrashlyticsAttributes
    | 'AUTHORIZED'
    | 'USER'
    | 'USER_EMAIL'
    | 'PLATFORM'
    | 'DEVICE'
    | 'SESSION_ID'
    | 'SESSION_START'
    | 'level'
    | 'service_name'
    | 'KEY';

  type SessionData = {
    [key in LogSessionAttributes]: string | boolean | number;
  } & { level?: LogLevel };

  interface LogStream {
    streams: {
      stream: SessionData;
      values: [string, string][];
    }[];
  }
}
