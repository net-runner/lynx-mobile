import {StorageController} from 'mobx-persist-store';

import {HttpApiService} from './api/HttpApiService';
export interface Services {
	api: HttpApiService;
	storage: StorageController;
}
