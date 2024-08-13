export const supportedLocales = ['en-US', 'pt-BR', 'es-ES'];

export const defaultLocale = 'en-US';

export const localePrefix = 'always';

//See https://developer.crowdin.com/language-codes/
export const mapSupportedLocalesToCrowdinLanguageCodes: Record<string, string> =
  {
    'en-US': 'en',
    'pt-BR': 'pt-BR',
    'es-ES': 'es-ES',
    'fr-FR': 'fr',
    'it-IT': 'it',
  };
