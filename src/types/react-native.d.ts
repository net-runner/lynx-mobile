import 'react-native';

declare module 'react-native' {
	interface NativeModulesStatic {
		MainModule: {
			getConstants: () => {
				VERSION_NAME: string;
				VERSION_CODE: string;
			};
		};
	}
}
