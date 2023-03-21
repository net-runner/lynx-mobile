import {ApiResponse, ApisauceInstance, create, HEADERS} from 'apisauce';
import Config from 'react-native-config';
import {NewGroupInputs} from '../../modules/linkgroup/components/CreateGroupScreen';
import {LinkInputs} from '../../modules/linkgroup/components/LinkForm';
import {ReviewInputs} from '../../modules/linkgroup/components/ReviewForm';
import {CompleteLinkgroup, GroupTag} from '../../modules/lynx/store/types';
import {storage} from '../storage/StorageService';

import {ApiService} from './ApiService';
import {
	AuthMeResponse,
	CreateLinkResponse,
	LinkGroupResponse,
	ReviewResponse,
	TagGroupResponse,
	TagResponse,
	UserGroupResponse,
} from './Responses';
import {SampleResponse} from './SampleResponse';
import {ServerError} from './ServerError';

const {API_URL} = Config;
// const API_URL = 'http://192.168.0.3';

export class HttpApiService implements ApiService {
	private api: ApisauceInstance;
	private session: {
		access_token?: string;
		refresh_token?: string;
	};

	private stripCookies(headers: HEADERS) {
		//Strip tokens from cookies
		const cookie_tokens = headers['set-cookie'][0];
		const access_token = cookie_tokens.split(';')[0].split('access_token=')[1];
		const refresh_token = cookie_tokens.split('refresh_token=')[1].split(';')[0];
		this.session.access_token = access_token;
		this.session.refresh_token = refresh_token;
		storage.set('session', JSON.stringify(this.session));
		this.api.setHeaders({
			Authorization: 'Bearer ' + access_token,
			'x-refresh': refresh_token,
		});
	}
	constructor() {
		this.api = create({
			baseURL: API_URL,
			headers: {'Content-Type': 'application/json'},
		});

		this.session = {access_token: undefined, refresh_token: undefined};
		const stored_session = storage.getString('session');
		if (stored_session) {
			this.session = JSON.parse(stored_session);
			this.api.setHeaders({
				Authorization: 'Bearer ' + this.session.access_token,
				'x-refresh': this.session.refresh_token as string,
			});
		}
	}
	clearTokens() {
		this.session.access_token = undefined;
		storage.delete('session');
		this.api.setHeaders({});
	}

	async sampleRequest(name: string): Promise<ApiResponse<SampleResponse, ServerError>> {
		return this.api.get('/score', {name});
	}

	async login(email: string, password: string): Promise<boolean> {
		const res = await this.api.post('/auth/signin', {email, password}, {withCredentials: true});

		if (res.status && res.status === 200) {
			const headers = res.headers as HEADERS;
			this.stripCookies(headers);
			return true;
		} else {
			return false;
		}
	}
	async createReview(data: ReviewInputs): Promise<ApiResponse<ReviewResponse, ServerError>> {
		return this.api.post('/review/add', data);
	}
	async createLink(
		data: LinkInputs,
		groupId: string,
		privacyLevel: number = 0,
	): Promise<ApiResponse<CreateLinkResponse, ServerError>> {
		return this.api.post('/link/add', {...data, privacyLevel, groupId});
	}
	async getSpecificLinkgroup(groupName: string, user: string): Promise<ApiResponse<CompleteLinkgroup, ServerError>> {
		return this.api.get<CompleteLinkgroup, ServerError>(`/user/${user}/g/${groupName}`);
	}
	async getTags() {
		return this.api.get<TagResponse, ServerError>('/tag').then(res => res.data);
	}
	async getTagGroups(tag: string) {
		return this.api.get<TagGroupResponse, ServerError>(`/tag/${tag}/g`).then(res => res.data);
	}
	async getUserGroups(user: string): Promise<ApiResponse<UserGroupResponse, ServerError>> {
		return this.api.get(`/user/${user}`);
	}
	async getLinkGroups(limit: number = 20, page: number = 0) {
		return this.api.get<LinkGroupResponse, ServerError>(`/linkgroup/${limit}/${page}`).then(res => res.data);
	}
	async signup(data: {name: string; email: string; password: string; repeat_password: string}) {
		return this.api.post<AuthMeResponse, ServerError>('/auth/signup', data).then(res => res.status);
	}

	async getMe() {
		return this.api.get<AuthMeResponse, ServerError>('/auth/me').then(res => res.data);
	}
	async createGroup(data: NewGroupInputs): Promise<ApiResponse<CompleteLinkgroup, ServerError>> {
		return this.api.post('/linkgroup/add', data);
	}
	async createMultipleGroupTags(data: Omit<GroupTag, 'id'>[]) {
		return this.api.post('tag/add/group/many', data);
	}
}
