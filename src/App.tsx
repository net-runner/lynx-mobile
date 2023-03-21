import styled from '@emotion/native';
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {LoadingStateSwitcher} from './modules/common/components/LoadingStateSwitcher';
import {useStores} from './modules/common/stores/RootStore';
import {Screen} from './modules/common/utils/Screen';
import {HomeTab, HomeTabParams} from './modules/home/components/HomeTab.navigator';
import {CreateGroupScreen} from './modules/linkgroup/components/CreateGroupScreen';
import {LinkGroupScreen} from './modules/linkgroup/components/LinkGroupScreen';
import {CompleteLinkgroup, TagWithCount} from './modules/lynx/store/types';
import {OtherUserScreen} from './modules/otheruser/components/OtherUserScreen';
import {SignupScreen} from './modules/signup/components/SignupScreen';
import {SigninScreen} from './modules/singnin/components/SigninScreen';
import {StartScreen} from './modules/start/components/StartScreen';
import {TagScreen} from './modules/tag/components/TagScreen';
import {storage} from './services/storage/StorageService';
import {NavigationTheme} from './theme/Theme';

if (__DEV__) {
	const {initializeMMKVFlipper} = require('react-native-mmkv-flipper-plugin');
	initializeMMKVFlipper({default: storage});
}

export type MainStackParams = {
	[Screen.START]: undefined;
	[Screen.SIGNIN]: undefined;
	[Screen.SIGNUP]: undefined;
	[Screen.HOME]: NavigatorScreenParams<HomeTabParams>;
	[Screen.TAG]: TagWithCount;
	[Screen.OTHERUSER]: {username: string};
	[Screen.LINKGROUP]: CompleteLinkgroup;
	[Screen.CREATEGROUP]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

type Props = {};

export const App = observer(({}: Props) => {
	const rootStore = useStores();
	return (
		<LoadingStateSwitcher
			loadingState={rootStore.appStore.loadingState}
			tryAgainCallback={rootStore.appStore.restartApp}>
			<AppContainer>
				<NavigationContainer theme={NavigationTheme}>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={rootStore.appStore.initialRouteName}>
						{rootStore.userStore.authorized ? (
							<>
								<Stack.Screen name={Screen.HOME} component={HomeTab} />
								<Stack.Screen name={Screen.LINKGROUP} component={LinkGroupScreen} />
								<Stack.Screen name={Screen.TAG} component={TagScreen} />
								<Stack.Screen name={Screen.OTHERUSER} component={OtherUserScreen} />
								<Stack.Screen name={Screen.CREATEGROUP} component={CreateGroupScreen} />
							</>
						) : (
							<>
								<Stack.Screen name={Screen.START} component={StartScreen} />
								<Stack.Screen name={Screen.SIGNIN} component={SigninScreen} />
								<Stack.Screen name={Screen.SIGNUP} component={SignupScreen} />
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</AppContainer>
		</LoadingStateSwitcher>
	);
});

const AppContainer = styled.View(() => ({
	flex: 1,
}));
