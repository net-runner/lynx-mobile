import {ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {LinkGroupResponse, TagGroupResponse, UserGroupResponse} from '../../../services/api/Responses';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';

import {CompleteLinkgroup, TagWithCount} from './types';

export class LynxStore {
	private readonly rootStore: RootStore;
	isLoading: boolean = false;
	userLoadingState: LoadingState = LoadingState.DONE;
	groupLoadingState: LoadingState = LoadingState.DONE;
	tagLoadingState: LoadingState = LoadingState.DONE;
	currentPage: number = 0;
	linkGroups: CompleteLinkgroup[] = [];
	tagLinkGroups: CompleteLinkgroup[] = [];
	userLinkGroups: CompleteLinkgroup[] = [];
	tags: TagWithCount[] = [];

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;

		makePersistable(this, {
			name: 'LynxStore',
			storage: rootStore.services.storage,
			properties: ['linkGroups', 'tags', 'tagLinkGroups', 'userLinkGroups'],
		}).then(_ => {
			if (this.linkGroups.length === 0 || this.tags.length === 0) {
				this.loadGroups();
				this.loadTags();
			}
		});
	}
	setUserLoadingState(loadingState: LoadingState) {
		this.userLoadingState = loadingState;
	}
	async loadGroups(limit: number = 20, page: number = 0) {
		const res = await this.rootStore.services.api.getLinkGroups(limit, page);
		if (res) {
			const rs = res as LinkGroupResponse;
			this.setLinkGroups(rs.groups);
		}
	}
	async loadTagGroups(tag: string) {
		const res = await this.rootStore.services.api.getTagGroups(tag);
		if (res) {
			const rs = res as TagGroupResponse;
			this.setTagGroups(rs.tagLinkGroups);
		}
	}
	*loadUserGroups(userName: string) {
		this.userLoadingState = LoadingState.PENDING;
		const res: ApiResponse<UserGroupResponse, ServerError> = yield this.rootStore.services.api.getUserGroups(userName);
		console.log(res.data);
		if (res.ok) {
			this.userLinkGroups = res.data!.linkGroups;
			this.userLoadingState = LoadingState.DONE;
		} else {
			this.groupLoadingState = LoadingState.ERROR;
			ErrorHandler.handleApiProblem(res, this.setUserLoadingState);
		}
	}
	setTagGroups(linkGroups: CompleteLinkgroup[]) {
		this.tagLinkGroups = linkGroups;
	}
	setLinkGroups(linkGroups: CompleteLinkgroup[]) {
		this.linkGroups = linkGroups;
	}
	setTags(tags: TagWithCount[]) {
		this.tags = tags;
	}
	async loadTags() {
		this.isLoading = true;
		const tags = await this.rootStore.services.api.getTags();
		if (tags) {
			this.setTags(tags as TagWithCount[]);
			this.isLoading = false;
		}
	}
}
