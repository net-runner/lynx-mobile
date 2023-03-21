import {StorageController} from 'mobx-persist-store';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
export const MMKVStorage: StorageController = {
	setItem: (key, data) => storage.set(key, data),
	getItem: key => storage.getString(key) as string | null,
	removeItem: key => storage.delete(key),
};
export interface StorageService {}
