import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import {App} from './App';
import {RootStore, RootStoreProvider} from './modules/common/stores/RootStore';
import {HttpApiService} from './services/api/HttpApiService';
import {MMKVStorage} from './services/storage/StorageService';

it('renders correctly', async () => {
	const rootStore = new RootStore({
		api: new HttpApiService(),
		storage: MMKVStorage,
	});

	render(
		<RootStoreProvider value={rootStore}>
			<App />
		</RootStoreProvider>,
	);
});
