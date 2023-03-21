import styled from '@emotion/native';
import React from 'react';
import {Button, StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

type State = {
	error: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
	state = {
		error: false,
	};

	static getDerivedStateFromError() {
		return {error: true};
	}

	componentDidCatch(error: Error) {
		//TODO: deal with errorInfo if needed
		console.log(error);
	}

	restartApp = async () => {
		RNRestart.Restart();
	};

	render() {
		if (this.state.error) {
			return (
				<AbsoluteFillContainer testID={'errorBoundaryView'}>
					{/* TODO: error boundry view */}
					<Button title={'Try again'} onPress={this.restartApp} />
				</AbsoluteFillContainer>
			);
		} else {
			return this.props.children;
		}
	}
}

const AbsoluteFillContainer = styled(SafeAreaView)({
	...StyleSheet.absoluteFillObject,
	padding: 24,
	alignItems: 'center',
	justifyContent: 'center',
});
