import {NativeModules} from 'react-native';

NativeModules.MainModule = {
	getConstants: () => ({
		VERSION_NAME: '1',
		VERSION_CODE: '0.0.1',
	}),
};
