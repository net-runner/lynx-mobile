import React from 'react';
import {Text} from 'react-native';
import {MainModule} from '../utils/MainModule';
import Config from 'react-native-config';

export const VersionLabel = () => {
	const {VERSION_CODE, VERSION_NAME} = MainModule.getConstants();
	return (
		<>
			<Text>{`Version name: ${VERSION_CODE}`}</Text>
			<Text>{`Version code: ${VERSION_NAME}`}</Text>
			<Text>{`Release type: ${Config.RN_RELEASE_TYPE}`}</Text>
			<Text>{`Variant: ${__DEV__ ? 'debug' : 'release'}`}</Text>
		</>
	);
};
