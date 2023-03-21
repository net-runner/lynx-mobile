import {ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {CreateLinkResponse, ReviewResponse} from '../../../services/api/Responses';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';
import {Review, Link, CompleteLinkgroup} from '../../lynx/store/types';
import {LinkInputs} from '../components/LinkForm';
import {ReviewInputs} from '../components/ReviewForm';

export class LinkGroupStore {
	private readonly rootStore: RootStore;
	groupLoadingState: LoadingState = LoadingState.DONE;

	links: Link[] = [];
	reviews: Review[] = [];

	linksCount = () => this.links.length;
	reviewCount = () => this.reviews.length;

	*loadGroupData(gorupName: string, owner: string) {
		this.groupLoadingState = LoadingState.PENDING;

		const res: ApiResponse<CompleteLinkgroup, ServerError> = yield this.rootStore.services.api.getSpecificLinkgroup(
			gorupName,
			owner,
		);
		if (res.ok) {
			this.links = res.data!.links;
			this.reviews = res.data!.reviews;
			this.groupLoadingState = LoadingState.DONE;
		} else {
			this.groupLoadingState = LoadingState.ERROR;
			ErrorHandler.handleApiProblem(res, this.rootStore.services.errorTracking, this.setGroupLoadingState);
		}
	}
	canReview() {
		for (let index = 0; index < this.reviewCount(); index++) {
			const review = this.reviews[index];
			if (review.creatorName === this.rootStore.userStore.username) return false;
		}
		return true;
	}
	*createReview(data: ReviewInputs) {
		this.groupLoadingState = LoadingState.PENDING;

		const res: ApiResponse<ReviewResponse, ServerError> = yield this.rootStore.services.api.createReview(data);

		if (res.ok) {
			this.reviews.push(res.data!);
			this.groupLoadingState = LoadingState.DONE;
		} else {
			this.groupLoadingState = LoadingState.ERROR;
			ErrorHandler.handleApiProblem(res, this.rootStore.services.errorTracking, this.setGroupLoadingState);
		}
	}
	*createLink(data: LinkInputs, groupId: string) {
		this.groupLoadingState = LoadingState.PENDING;

		const res: ApiResponse<CreateLinkResponse, ServerError> = yield this.rootStore.services.api.createLink(
			data,
			groupId,
		);

		if (res.ok) {
			console.log(res.data!);
			this.links.push(res.data!);
			this.groupLoadingState = LoadingState.DONE;
		} else {
			this.groupLoadingState = LoadingState.ERROR;
			ErrorHandler.handleApiProblem(res, this.rootStore.services.errorTracking, this.setGroupLoadingState);
		}
	}

	setGroupLoadingState(state: LoadingState) {
		this.groupLoadingState = state;
	}
	getScore() {
		return this.reviews.reduce((sum, review) => sum + review.score, 0) / this.reviewCount();
	}
	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}
}
