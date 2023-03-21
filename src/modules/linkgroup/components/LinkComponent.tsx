import {Linking} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {Link} from '../../lynx/store/types';
import {LinkIcon} from '../../common/components/SvgIcons/LinkIcon';
import {Label} from '../../../theme/Typography';

interface Props {
	data: Link;
}
export const LinkComponent = ({data}: Props) => {
	return (
		<LinkWrapper onPress={() => Linking.openURL(data.link)}>
			<LinkIco />
			<LabelContainer>
				<StyledLabel>{data.description}</StyledLabel>
			</LabelContainer>
		</LinkWrapper>
	);
};

const LinkWrapper = styled.TouchableOpacity({
	width: '100%',
	display: 'flex',
	flex: 1,
	alignItems: 'center',
	paddingRight: 30,
	flexDirection: 'row',
	justifyContent: 'flex-start',
	marginBottom: 15,
});

const LinkIco = styled(LinkIcon)({
	transform: [{rotate: '-45deg'}],
	marginRight: 10,
});
const StyledLabel = styled(Label)({
	fontSize: 17,
	marginBottom: 0,
});
const LabelContainer = styled.View({
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
});
