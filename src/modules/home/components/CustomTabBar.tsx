import {TouchableOpacity} from 'react-native';
import React from 'react';
import styled, {css} from '@emotion/native';
import {H1} from '../../../theme/Typography';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

export const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
	return (
		<RouteContainer>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						//@ts-ignore
						navigation.navigate({name: route.name, merge: true});
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? {selected: true} : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={TouchableStyle}>
						<RouteText selected={isFocused}>{label}</RouteText>
					</TouchableOpacity>
				);
			})}
		</RouteContainer>
	);
};
const RouteText = styled(H1)<{selected: boolean}>(({theme, selected}) => ({
	color: !selected ? theme.color.text : theme.color.primary,
}));

const RouteContainer = styled.View(({theme}) => ({
	height: 80,
	paddingBottom: 10,
	flexDirection: 'row',
	backgroundColor: theme.color.background,
}));

const TouchableStyle = css({
	flex: 1,
});
