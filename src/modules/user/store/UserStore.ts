import {ApiErrorResponse, ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {clearPersistedStore, makePersistable} from 'mobx-persist-store';
import {UserGroupResponse} from '../../../services/api/Responses';
import {SampleResponse} from '../../../services/api/SampleResponse';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';
import {CompleteLinkgroup} from '../../lynx/store/types';
import {User} from './types';

export class UserStore {
	private readonly rootStore: RootStore;

	score: number = 0;
	groups: CompleteLinkgroup[] = [];
	loadingState: LoadingState = LoadingState.DONE;
	authorized: boolean = false;
	username?: string = undefined;
	userId?: string = undefined;
	name?: string = undefined;
	email?: string = undefined;
	createdAt?: Date = undefined;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
		makePersistable(this, {
			name: 'UserStore',
			storage: rootStore.services.storage,
			properties: ['userId', 'name', 'email', 'createdAt', 'authorized', 'username', 'groups'],
		});
	}
	private setUser(user: User) {
		this.userId = user.id;
		this.name = user.name;
		this.email = user.email;
		this.username = user.username;
		this.createdAt = user.createdAt;
		this.authorized = true;
	}
	async login(email: string, password: string): Promise<boolean> {
		const isLoggedIn = await this.rootStore.services.api.login(email, password);

		if (isLoggedIn) {
			const user = await this.rootStore.services.api.getMe();
			if (user) {
				const newUser = user as User;
				this.setUser(newUser);
				this.loadGroups();
				return true;
			}
		}
		return false;
	}
	async logout() {
		this.userId = undefined;
		this.authorized = false;
		this.name = undefined;
		this.email = undefined;
		this.createdAt = undefined;
		this.rootStore.services.api.clearTokens();
		clearPersistedStore(this);
	}

	setGroups(linkGroups: CompleteLinkgroup[]) {
		this.groups = linkGroups;
	}
	*loadGroups() {
		this.loadingState = LoadingState.PENDING;
		const res: ApiResponse<UserGroupResponse, ServerError> = yield this.rootStore.services.api.getUserGroups(
			this.username as string,
		);
		if (res.ok) {
			this.groups = res.data!.linkGroups;
			this.loadingState = LoadingState.DONE;
		} else {
			this.loadingState = LoadingState.ERROR;
			ErrorHandler.handleApiProblem(res, this.setLoadingState);
		}
	}
	async signup(data: {name: string; email: string; password: string; repeat_password: string}) {
		const registerStatus = await this.rootStore.services.api.signup(data);
		if (registerStatus === 200) {
			return true;
		}
		return false;
	}

	*getScore(name: string) {
		const response: ApiResponse<SampleResponse, ServerError> = yield this.rootStore.services.api.sampleRequest(name);

		if (response.ok && response.data?.score) {
			this.score = response.data.score;
		} else {
			ErrorHandler.handleApiProblem(response as ApiErrorResponse<ServerError>, this.setLoadingState);
		}
	}

	setLoadingState(state: LoadingState) {
		this.loadingState = state;
	}
}
