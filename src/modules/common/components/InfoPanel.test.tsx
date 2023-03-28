import React from 'react';
import {render} from '@testing-library/react-native';
import InfoPanel from './InfoPanel';
import {Theme} from '../../../theme/Theme';
import {ThemeProvider} from '@emotion/react';

describe('InfoPanel', () => {
	it('should render the text and logo', () => {
		const {getByText, getByTestId} = render(
			<ThemeProvider theme={Theme}>
				<InfoPanel text="Hello" />
			</ThemeProvider>,
		);

		expect(getByText('Hello')).toBeTruthy();
		expect(getByTestId('logo')).toBeTruthy();
	});

	it('should render the logo with the initial size if no size prop is provided', () => {
		const {getByTestId} = render(
			<ThemeProvider theme={Theme}>
				<InfoPanel text="Hello" />
			</ThemeProvider>,
		);

		const logo = getByTestId('logo');
		expect(logo.props.width).toBe(150);
		expect(logo.props.height).toBe(150);
	});

	it('should render the logo with the specified size if a size prop is provided', () => {
		const {getByTestId} = render(
			<ThemeProvider theme={Theme}>
				<InfoPanel text="Hello" size={200} />
			</ThemeProvider>,
		);

		const logo = getByTestId('logo');
		expect(logo.props.width).toBe(200);
		expect(logo.props.height).toBe(200);
	});
});
