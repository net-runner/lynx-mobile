import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {Services} from '../../../services/Services';
import {UserStore} from '../../user/store/UserStore';
import {AppStore} from './AppStore';
import {LynxStore} from '../../lynx/store/LynxStore';
import {LinkGroupStore} from '../../linkgroup/store/LinkGroupStore';

export class RootStore {
	services: Services;
	appStore: AppStore;
	userStore: UserStore;
	lynxStore: LynxStore;
	groupStore: LinkGroupStore;

	constructor(services: Services) {
		makeAutoObservable(this);
		this.services = services;
		this.appStore = new AppStore(this);
		this.userStore = new UserStore(this);
		this.lynxStore = new LynxStore(this);
		this.groupStore = new LinkGroupStore(this);
	}

	async initApp() {
		await this.appStore.init();
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
