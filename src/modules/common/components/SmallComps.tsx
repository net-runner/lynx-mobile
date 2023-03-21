import styled, {css} from '@emotion/native';
import {Background} from './Background';
import {LinkIcon} from './SvgIcons/LinkIcon';

export const Header = styled.View(({theme}) => ({
	padding: 10,
	paddingBottom: 15,
	backgroundColor: theme.color.backgroundSecondary,
}));

export const Row = styled.View({
	flexDirection: 'row',
});
export const StyledLinkIcon = styled(LinkIcon)(({theme}) => ({
	transform: [{rotate: '-45deg'}],
	width: 12,
	height: 12,
	fill: theme.color.text,
}));

export const Body = styled.View(({theme}) => ({
	padding: 10,
	borderBottomLeftRadius: 10,
	borderBottomRightRadius: 10,
	backgroundColor: theme.color.background,
}));
export const StyledBg = styled(Background)(({theme}) => ({
	backgroundColor: theme.color.backgroundSecondary,
	flex: 1,
}));

export const ScrollViewStyle = css({
	flexGrow: 1,
});
