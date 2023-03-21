import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			background: string;
			backgroundSecondary: string;
			backgroundTertiary: string;
			button: string;
			buttonText: string;
			text: string;
			primary: string;
		};
		text: {
			fontFamily: string;
		};
	}
}
