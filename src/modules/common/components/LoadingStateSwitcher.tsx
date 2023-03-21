import styled from '@emotion/native';
import React, {FC, ReactNode} from 'react';
import {ActivityIndicator, Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoadingState} from '../utils/LoadingState';

interface Props {
	loadingState: LoadingState;
	tryAgainCallback: () => void;
	renderProgress?: () => ReactNode;
	renderError?: () => ReactNode;
	renderNoConnection?: () => ReactNode;
	shouldRenderChildren?: boolean;
	reFetch?: boolean;
}

export const LoadingStateSwitcher: FC<Props> = React.memo(
	({
		loadingState,
		shouldRenderChildren,
		renderProgress = () => (
			<DefaultProgressContainer>
				{/* TODO: default progress*/}
				<ActivityIndicator size={64} color={'#FFFFFF'} />
			</DefaultProgressContainer>
		),
		renderError = () => (
			<AbsoluteFillContainer>
				{/* TODO: default error screen */}
				<Button title={'Try again'} onPress={tryAgainCallback} />
			</AbsoluteFillContainer>
		),
		renderNoConnection = () => (
			<AbsoluteFillContainer>
				{/* TODO: default no connection screen */}
				<Button title={'Try again'} onPress={tryAgainCallback} />
			</AbsoluteFillContainer>
		),
		children,
		tryAgainCallback,
	}) => {
		if (loadingState === LoadingState.PENDING && renderProgress) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderProgress()}
				</>
			);
		}

		if (loadingState === LoadingState.ERROR && tryAgainCallback) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderError()}
				</>
			);
		}

		if (loadingState === LoadingState.NO_CONNECTION && tryAgainCallback) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderNoConnection()}
				</>
			);
		}

		return <>{children}</>;
	},
);

const AbsoluteFillContainer = styled(SafeAreaView)({
	...StyleSheet.absoluteFillObject,
	padding: 24,
	alignItems: 'center',
	justifyContent: 'center',
});

const DefaultProgressContainer = styled(AbsoluteFillContainer)({
	backgroundColor: '#00000090',
});
