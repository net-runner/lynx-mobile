import React from 'react';
import {LinkIcon} from './SvgIcons/LinkIcon';
import styled from '@emotion/native';

type Props = {
	position: 'top' | 'bottom';
	size?: number;
};
const ICON_SIZE = 45;
export const LinkIconFlavor = ({position, size}: Props) => {
	return (
		<ContainingRow position={position}>
			<StyledLinkIcon width={size || ICON_SIZE} height={size || ICON_SIZE} />
			<StyledLinkIcon width={size || ICON_SIZE} height={size || ICON_SIZE} />
			<StyledLinkIcon width={size || ICON_SIZE} height={size || ICON_SIZE} />
			<StyledLinkIcon width={size || ICON_SIZE} height={size || ICON_SIZE} />
		</ContainingRow>
	);
};

const ContainingRow = styled.View<{position: Props['position']}>`
	display: flex;
	flex-direction: row;
	position: absolute;
	${({position}) => {
		switch (position) {
			case 'top':
				return {
					top: 30,
					left: 20,
				};
			case 'bottom':
				return {
					bottom: 30,
					right: 20,
				};
		}
	}}
`;
export const StyledLinkIcon = styled(LinkIcon)({
	transform: [{rotate: '-45deg'}],
	marginRight: 5,
	marginLeft: 5,
});
