import React from 'react';
import {render} from '@testing-library/react-native';
import {ReviewStars} from './ReviewStars';
import {Theme} from '../../../theme/Theme';
import {ThemeProvider} from '@emotion/react';

describe('ReviewStars component', () => {
	it('should render correctly', () => {
		const {getByTestId} = render(
			<ThemeProvider theme={Theme}>
				<ReviewStars rating={3} />
			</ThemeProvider>,
		);
		expect(getByTestId('review-stars')).toBeDefined();
	});

	it('should render the correct number of stars', () => {
		const {getAllByTestId} = render(
			<ThemeProvider theme={Theme}>
				<ReviewStars rating={3} />
			</ThemeProvider>,
		);

		expect(getAllByTestId('star-full').length).toEqual(3);
		expect(getAllByTestId('star-empty').length).toEqual(2);
	});

	it('should render the correct number of stars (with half-star present)', () => {
		const {getAllByTestId} = render(
			<ThemeProvider theme={Theme}>
				<ReviewStars rating={3.5} />
			</ThemeProvider>,
		);

		expect(getAllByTestId('star-full').length).toEqual(3);
		expect(getAllByTestId('star-half').length).toEqual(1);
		expect(getAllByTestId('star-empty').length).toEqual(1);
	});
});
