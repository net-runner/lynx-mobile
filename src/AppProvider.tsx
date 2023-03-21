import {ThemeProvider} from '@emotion/react';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {App} from './App';
import {RootStore, RootStoreProvider} from './modules/common/stores/RootStore';
import {HttpApiService} from './services/api/HttpApiService';
import {MMKVStorage} from './services/storage/StorageService';
import {Theme} from './theme/Theme';

const rootStore = new RootStore({
	api: new HttpApiService(),
	storage: MMKVStorage,
});

export const AppProvider = observer(() => {
	useEffect(() => {
		rootStore.initApp();
	}, []);

	return (
		<RootStoreProvider value={rootStore}>
			<ThemeProvider theme={Theme}>
				<SafeAreaProvider>
					<App />
				</SafeAreaProvider>
			</ThemeProvider>
		</RootStoreProvider>
	);
});
