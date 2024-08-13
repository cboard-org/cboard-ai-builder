//To compile the script run the following command in the terminal:
//npx -p typescript tsc --project src/intl/intl.ts-config.json
//To run the script, use the following command:
//node src/intl/dist/getSupportedLocales.js

import {
  supportedLocales,
  mapSupportedLocalesToCrowdinLanguageCodes,
  defaultLocale,
} from '../intl.constants';

const result = supportedLocales
  .map((locale) => {
    if (!(locale in mapSupportedLocalesToCrowdinLanguageCodes)) {
      throw new Error(
        `The locale "${locale}" is not supported by Crowdin. Please add it to the "mapSupportedLocalesToCrowdinLanguageCodes" object in "src/intl/intl.constants.ts".`,
      );
    }
    if (locale === defaultLocale) {
      return '';
    }

    const crowdinLanguageCode =
      mapSupportedLocalesToCrowdinLanguageCodes[locale];
    return `-l ${crowdinLanguageCode}`;
  })
  .join(' ');
console.log(result);
