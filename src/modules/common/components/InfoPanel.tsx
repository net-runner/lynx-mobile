import React from 'react';
import {H1} from '../../../theme/Typography';
import styled from '@emotion/native';
import {LogoDetail} from './SvgIcons/LogoDetail';
import {LinkIconFlavor} from './LinkIconFlavor';

interface Props {
	text: string;
	size?: number;
}
const INITAL_LOGO_SIZE = 150;

const InfoPanel = ({text, size}: Props) => {
	return (
		<Wrapper>
			<LinkIconFlavor position={'top'} />
			<Logo width={size || INITAL_LOGO_SIZE} height={size || INITAL_LOGO_SIZE} testID={'logo'} />
			<H1>{text}</H1>
			<LinkIconFlavor position={'bottom'} />
		</Wrapper>
	);
};

const Wrapper = styled.View(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	width: '100%',
	marginTop: 20,
	paddingTop: 80,
	paddingBottom: 80,
	backgroundColor: theme.color.background,
}));

const Logo = styled(LogoDetail)({
	margin: 15,
});

export default InfoPanel;
