import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../App';
import {Screen} from '../../common/utils/Screen';
import {Body, Header, Row, StyledLinkIcon} from '../../common/components/SmallComps';
import {BoldLabel, H1, Label} from '../../../theme/Typography';
import {StatPill} from '../../common/components/StatPill';
import {useTheme} from '@emotion/react';
import {LinkedAmountIcon} from '../../common/components/SvgIcons/LinkedAmountIcon';
import {WatchersIcon} from '../../common/components/SvgIcons/WatchersIcon';
import {ReviewStars} from '../../common/components/ReviewStars';
import styled, {css} from '@emotion/native';
import {LinkComponent} from './LinkComponent';
import {useStores} from '../../common/stores/RootStore';
import {ReviewComponent} from '../../common/components/ReviewComponent';
import {Background} from '../../common/components/Background';
import {ReviewForm} from './ReviewForm';
import {LoadingStateSwitcher} from '../../common/components/LoadingStateSwitcher';
import {observer} from 'mobx-react-lite';
import {LinkForm} from './LinkForm';

type Props = NativeStackScreenProps<MainStackParams, Screen.LINKGROUP>;

export const LinkGroupScreen = observer(({route}: Props) => {
	const store = useStores();
	const LinkGroup = route.params;

	useEffect(() => {
		store.groupStore.loadGroupData(LinkGroup.groupname, LinkGroup.owner);
	}, [LinkGroup.groupname, LinkGroup.owner, store.groupStore]);

	const isUserResource = store.userStore.username === LinkGroup.owner;
	const theme = useTheme();

	return (
		<StyledBg>
			<Header>
				<Row>
					<BoldLabel>{'@' + LinkGroup.owner}</BoldLabel>
					<Label>{'/' + LinkGroup.name}</Label>
				</Row>
				<Row>
					<StatPill stat={store.groupStore.linksCount()} ico={<StyledLinkIcon fill={theme.color.text} />} />
					<StatPill stat={LinkGroup.linkedCount} ico={<LinkedAmountIcon />} />
					<StatPill stat={LinkGroup.watcherCount} ico={<WatchersIcon />} />
					<StatPill stat={store.groupStore.reviewCount()} ico={<ReviewStars rating={store.groupStore.getScore()} />} />
				</Row>
			</Header>
			<LoadingStateSwitcher
				tryAgainCallback={() => store.groupStore.loadGroupData(LinkGroup.groupname, LinkGroup.owner)}
				loadingState={store.groupStore.groupLoadingState}>
				<StyledScrollView contentContainerStyle={ScrollViewStyle}>
					<StyledBody>
						{store.groupStore.linksCount() > 0 && <H1>Links</H1>}
						{store.groupStore.links.map(link => (
							<LinkComponent key={link.id} data={link} />
						))}
						{store.groupStore.reviewCount() > 0 && <H1>Reviews</H1>}
						{store.groupStore.reviews.map(review => (
							<ReviewComponent key={review.creatorName} data={review} />
						))}
						{!isUserResource && store.groupStore.canReview() && <ReviewForm groupId={LinkGroup.id} />}
						{isUserResource && <LinkForm owner={LinkGroup.owner} groupId={LinkGroup.id} />}
					</StyledBody>
				</StyledScrollView>
			</LoadingStateSwitcher>
		</StyledBg>
	);
});

const StyledBg = styled(Background)(({theme}) => ({
	backgroundColor: theme.color.backgroundSecondary,
	flex: 1,
}));

const StyledBody = styled(Body)({
	borderRadius: 0,
	flex: 1,
	flexGrow: 1,
	alignItems: 'flex-start',
	paddingBottom: 80,
});

const StyledScrollView = styled.ScrollView({
	flex: 1,
	flexGrow: 1,
});

const ScrollViewStyle = css({
	flexGrow: 1,
});
