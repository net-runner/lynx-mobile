import React from 'react';
import {Screen} from '../../common/utils/Screen';
import {HomeScreen} from './HomeScreen';
import {TagListScreen} from '../../tag/components/TagListScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../../user/components/UserScreen';
import {CustomTabBar} from './CustomTabBar';
import {useTranslation} from 'react-i18next';

export type HomeTabParams = {
	[Screen.EXPLORE]: undefined;
	[Screen.USER]: undefined;
	[Screen.TAGS]: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParams>();

export const HomeTab = () => {
	const {t} = useTranslation('screens');
	return (
		<Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <CustomTabBar {...props} />}>
			<Tab.Screen name={Screen.EXPLORE} options={{title: t('explore')}} component={HomeScreen} />
			<Tab.Screen name={Screen.USER} options={{title: t('user')}} component={UserScreen} />
			<Tab.Screen name={Screen.TAGS} options={{title: t('tags')}} component={TagListScreen} />
		</Tab.Navigator>
	);
};
