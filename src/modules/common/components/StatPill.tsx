import React from 'react';
import styled from '@emotion/native';
import {Label} from '../../../theme/Typography';
interface StatPillProps {
	ico: JSX.Element;
	stat: number | string;
}

export const StatPill = ({ico, stat}: StatPillProps) => (
	<Pill>
		<CenterText>{stat}</CenterText>
		<IconWrapper>{ico}</IconWrapper>
	</Pill>
);
const Pill = styled.View(({theme}) => ({
	flexDirection: 'row',
	borderRadius: 8,
	fontWeight: 'bold',
	paddingLeft: 10,
	height: 25,
	paddingRight: 10,
	marginRight: 10,
	backgroundColor: theme.color.backgroundTertiary,
}));

const CenterText = styled(Label)({
	marginRight: 5,
	marginTop: 4,
	height: 15,
});

const IconWrapper = styled.View({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});
