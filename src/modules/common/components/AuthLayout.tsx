import styled, {css} from '@emotion/native';
import React from 'react';
import {Box} from './Box';
import {LinkIconFlavor} from './LinkIconFlavor';
type Props = {};

export const AuthLayout: React.FC<Props> = ({children}) => {
	return (
		<Box>
			<LinkIconFlavor position="top" />
			<CenteringScrollView showsVerticalScrollIndicator={false} contentContainerStyle={ContainerStyle}>
				{children}
			</CenteringScrollView>
			<LinkIconFlavor position="bottom" />
		</Box>
	);
};

export const CenteringScrollView = styled.ScrollView({
	display: 'flex',
	flex: 1,
	flexGrow: 1,
	marginTop: 60,
	marginBottom: 60,
});

const ContainerStyle = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexGrow: 1,
});
