import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {LoadingState} from '../utils/LoadingState';
import {LoadingStateSwitcher} from './LoadingStateSwitcher';

const TestProgres = () => <View testID={'testProgressView'} />;
const TestError = () => <View testID={'testErrorView'} />;
const TestNoConnection = () => <View testID={'testNoConnectionView'} />;

it('shows progress component when loadingState is pending', () => {
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.PENDING}
			tryAgainCallback={() => {}}
			renderProgress={() => <TestProgres />}
		/>,
	);

	expect(queryByTestId('testProgressView')).toBeTruthy();
});

it('shows error component when loadingState is error', () => {
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.ERROR}
			tryAgainCallback={() => {}}
			renderError={() => <TestError />}
		/>,
	);

	expect(queryByTestId('testErrorView')).toBeTruthy();
});

it('shows no connection component when loadingState is no connection', () => {
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.NO_CONNECTION}
			tryAgainCallback={() => {}}
			renderNoConnection={() => <TestNoConnection />}
		/>,
	);

	expect(queryByTestId('testNoConnectionView')).toBeTruthy();
});

it('does not render children in any state except done by default', () => {
	const {queryByTestId, rerender} = render(
		<LoadingStateSwitcher loadingState={LoadingState.PENDING} tryAgainCallback={() => {}}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);

	expect(queryByTestId('childView')).toBeFalsy();

	rerender(
		<LoadingStateSwitcher loadingState={LoadingState.DONE} tryAgainCallback={() => {}}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);
	expect(queryByTestId('childView')).toBeTruthy();
});

it('render children in any state when shouldRenderChildren is true', () => {
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.PENDING}
			tryAgainCallback={() => {}}
			shouldRenderChildren={true}
			renderProgress={() => <TestNoConnection />}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);

	expect(queryByTestId('childView')).toBeTruthy();
	expect(queryByTestId('testNoConnectionView')).toBeTruthy();
});
