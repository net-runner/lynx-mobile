import {InitOptions, LanguageDetectorModule, Services} from 'i18next';
import * as RNLocalize from 'react-native-localize';

export const LanguageDetector: LanguageDetectorModule = {
	type: 'languageDetector',

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	init: (services: Services, detectorOptions: object, i18nextOptions: InitOptions): void => {},

	detect: (): string => {
		return RNLocalize.getLocales()[0].languageCode;
	},

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	cacheUserLanguage: (lng: string): void => {},
};
