import {ApiResponse} from 'apisauce';
import {ReviewInputs} from '../../modules/linkgroup/components/ReviewForm';
import {ReviewResponse} from './Responses';
import {SampleResponse} from './SampleResponse';
import {ServerError} from './ServerError';

export interface ApiService {
	sampleRequest(name: string): Promise<ApiResponse<SampleResponse, ServerError>>;

	clearTokens(): void;
	login(email: string, password: string): Promise<Boolean>;

	createReview(data: ReviewInputs): Promise<ApiResponse<ReviewResponse, ServerError>>;
}
