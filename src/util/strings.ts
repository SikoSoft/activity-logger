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

export async function digestMessage(message: string) {
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(message),
  );
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}
