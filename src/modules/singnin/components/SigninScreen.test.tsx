import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {SigninScreen} from './SigninScreen';
import {ThemeProvider} from '@emotion/react';
import {Theme} from '../../../theme/Theme';
import {RootStore, RootStoreProvider} from '../../common/stores/RootStore';
import {HttpApiService} from '../../../services/api/HttpApiService';
import {MMKVStorage} from '../../../services/storage/StorageService';

describe('SigninScreen', () => {
	const rootStore = new RootStore({
		api: new HttpApiService(),
		storage: MMKVStorage,
	});

	it('should render email and password inputs', () => {
		const {getByTestId} = render(
			<ThemeProvider theme={Theme}>
				<SigninScreen />
			</ThemeProvider>,
		);
		const emailInput = getByTestId('email-input');
		const passwordInput = getByTestId('password-input');
		expect(emailInput).toBeDefined();
		expect(passwordInput).toBeDefined();
	});

	it('should call onSubmit handler with email and password when the form is submitted', async () => {
		const login = jest.spyOn(rootStore.userStore, 'login');
		const {getByTestId} = render(
			<RootStoreProvider value={rootStore}>
				<ThemeProvider theme={Theme}>
					<SigninScreen />
				</ThemeProvider>
			</RootStoreProvider>,
		);
		const emailInput = getByTestId('email-input');
		const passwordInput = getByTestId('password-input');
		const submitButton = getByTestId('primary-button');

		fireEvent.changeText(emailInput, 'test@test.com');
		fireEvent.changeText(passwordInput, 'password123');
		fireEvent.press(submitButton);

		await waitFor(() => {
			expect(login).toHaveBeenCalledTimes(1);
			expect(login).toHaveBeenCalledWith('test@test.com', 'password123');
		});
	});
});
