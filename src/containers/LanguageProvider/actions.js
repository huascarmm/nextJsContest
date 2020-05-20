/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
export function test(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
