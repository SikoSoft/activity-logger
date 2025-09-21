export enum Language {
  EN = 'en',
}

export const DEFAULT_LANGUAGE = Language.EN;

export type LocalizationStringMap = Record<string, string>;

export type LocalizationLanguageMap = Record<Language, LocalizationStringMap>;
