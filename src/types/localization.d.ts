import * as langs from '@/localizations';
import sk from '@/localizations/langs/sk';

declare global {
  type Languages = keyof typeof langs;
  type LangKeys = keyof (typeof sk)['translation'];
}
