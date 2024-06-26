import { Language, StringMap } from '@/models/Localization';

import en from '../../assets/localization/en.json' assert { type: 'json' };

export let LANGUAGE = Language.EN;

//const en = {};

const strings: StringMap = {
  [Language.EN]: en,
  [Language.SE]: en,
};

export function translate(key: string) {
  if (strings[LANGUAGE][key]) {
    return strings[LANGUAGE][key];
  }
  return key;
}
