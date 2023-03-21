import {Theme as ITheme} from '@emotion/react';
import {DefaultTheme} from '@react-navigation/native';
import {Platform} from 'react-native';
import {Color} from './Color';

export const Theme: ITheme = {
	color: {
		background: Color.BACKGROUND,
		backgroundTertiary: Color.BACKGROUND_TERTIARY,
		backgroundSecondary: Color.BACKGROUND_SECONDARY,
		button: Color.PRIMARY,
		buttonText: Color.BACKGROUND,
		text: Color.PRIMARY_WHITE,
		primary: Color.PRIMARY,
	},
	text: {fontFamily: Platform.select({android: 'Roboto', default: 'Helvetica'})},
};
export const NavigationTheme: typeof DefaultTheme = {
	dark: true,
	colors: {
		primary: Color.PRIMARY,
		background: Color.BACKGROUND,
		card: Color.BACKGROUND_SECONDARY,
		text: Color.PRIMARY_WHITE,
		notification: Color.PRIMARY,
		border: Color.BACKGROUND,
	},
};
