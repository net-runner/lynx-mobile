import React from 'react';
import {render} from '@testing-library/react-native';
import {ReviewComponent} from './ReviewComponent';
import {Theme} from '../../../theme/Theme';
import {ThemeProvider} from '@emotion/react';

describe('ReviewComponent', () => {
	const mockData = {
		id: '1',
		score: 4,
		description: 'This is a great product!',
		creatorName: 'JohnDoe',
		groupId: null,
	};

	it('should render the creator name and description', () => {
		const {getByText} = render(
			<ThemeProvider theme={Theme}>
				<ReviewComponent data={mockData} />
			</ThemeProvider>,
		);

		expect(getByText('@JohnDoe')).toBeTruthy();
		expect(getByText('This is a great product!')).toBeTruthy();
	});

	it('should render the review stars with correct score', () => {
		const {getByTestId, getAllByTestId} = render(
			<ThemeProvider theme={Theme}>
				<ReviewComponent data={mockData} />
			</ThemeProvider>,
		);

		expect(getByTestId('review-stars')).toBeTruthy();
		expect(getAllByTestId('star-full').length).toEqual(4);
		expect(getAllByTestId('star-empty').length).toEqual(1);
	});
});
