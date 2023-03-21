import React from 'react';
import {CompleteLinkgroup, TagWithCount} from '../../lynx/store/types';
import styled from '@emotion/native';
import {BoldLabel, Label} from '../../../theme/Typography';
import {TagList} from './TagList';
import {useTheme} from '@emotion/react';
import {ReviewStars} from './ReviewStars';
import {StatPill} from './StatPill';
import {Body, Header, Row, StyledLinkIcon} from './SmallComps';
import {WatchersIcon} from './SvgIcons/WatchersIcon';
import {LinkedAmountIcon} from './SvgIcons/LinkedAmountIcon';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../stores/RootStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../App';
import {Screen} from '../utils/Screen';
interface Props {
	data: CompleteLinkgroup;
	tags: TagWithCount[];
}
type NavigationProps = NativeStackNavigationProp<MainStackParams>;

export const LinkGroupDisplay = ({data, tags}: Props) => {
	const getReviewsCount = () => {
		if (data.reviews) return data.reviews.length;
		return 0;
	};
	const getScore = () => {
		if (!data.reviews) return 0;
		return data.reviews.reduce((sum, review) => sum + review.score, 0) / getReviewsCount();
	};
	const getLinksCount = () => {
		if (data.links) return data.links.length;
		return data.linksCount || 0;
	};
	const theme = useTheme();
	const {navigate} = useNavigation<NavigationProps>();
	const store = useStores();
	return (
		<Container>
			<Header>
				<TouchableOpacity
					onPress={() =>
						store.userStore.username === data.owner
							? navigate(Screen.HOME, {screen: Screen.USER})
							: navigate(Screen.OTHERUSER, {username: data.owner})
					}>
					<Row>
						<BoldLabel>{'@' + data.owner}</BoldLabel>
						<Label>{'/' + data.name}</Label>
					</Row>
				</TouchableOpacity>

				<Row>
					<StatPill stat={getLinksCount()} ico={<StyledLinkIcon fill={theme.color.text} />} />
					<StatPill stat={data.linkedCount} ico={<LinkedAmountIcon />} />
					<StatPill stat={data.watcherCount} ico={<WatchersIcon />} />
					<StatPill stat={getReviewsCount()} ico={<ReviewStars rating={getScore()} />} />
				</Row>
			</Header>
			<Body>
				<TagList tags={tags} filterTags={data.tags} />
				<StyledLabel>{data.description}</StyledLabel>
			</Body>
		</Container>
	);
};
const Container = styled.View(({theme}) => ({
	marginLeft: 20,
	marginRight: 20,
	marginBottom: 30,
	display: 'flex',
	flex: 1,
	borderRadius: 10,
	borderWidth: 5,
	borderStyle: 'solid',
	borderColor: theme.color.backgroundSecondary,
}));

const StyledLabel = styled(Label)({
	marginLeft: 4,
});
