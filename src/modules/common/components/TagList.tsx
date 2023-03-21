import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {MainStackParams} from '../../../App';
import {Label} from '../../../theme/Typography';
import {GroupTag, TagWithCount} from '../../lynx/store/types';
import {Screen} from '../utils/Screen';

interface TagWrapperProps {
	tag: TagWithCount;
	i: number;
}
interface Props {
	tags: TagWithCount[];
	filterTags?: GroupTag[];
	showCount?: boolean;
	selectedTags?: number[];
	large?: boolean;
	onClickHandler?: (index: number) => void;
}
type NavigationProps = NativeStackNavigationProp<MainStackParams, Screen.HOME>;

export const TagList = ({tags, filterTags, showCount, selectedTags, large, onClickHandler}: Props) => {
	const {navigate} = useNavigation<NavigationProps>();
	const filterTaglist = useMemo(() => {
		if (!filterTags) return tags;
		return filterTags.map(tag => {
			for (let index = 0; index < tags.length; index++) {
				const element = tags[index];
				if (tag.tagId === element.id) {
					return element;
				}
			}
			return null;
		});
	}, [tags, filterTags]) as TagWithCount[];

	const redirectToTagScreen = (tag: TagWithCount) => {
		navigate(Screen.TAG, tag);
	};

	const TagWrapper: React.FC<TagWrapperProps> = ({tag, i, children}) => {
		if (onClickHandler) return <TouchableOpacity onPress={() => onClickHandler(i)}>{children}</TouchableOpacity>;
		return <TouchableOpacity onPress={() => redirectToTagScreen(tag)}>{children}</TouchableOpacity>;
	};

	return (
		<Wrapper>
			{filterTaglist.map((tag, index) => (
				<TagContainer key={tag?.name} selected={selectedTags ? selectedTags.includes(index) : false}>
					<TagWrapper i={index} tag={tag}>
						<StyledLabel large={large ? large : false}>
							{tag.name.charAt(0).toLocaleUpperCase() + tag.name.slice(1)} {showCount && tag._count.Groups}
						</StyledLabel>
					</TagWrapper>
				</TagContainer>
			))}
		</Wrapper>
	);
};

const Wrapper = styled.View({
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	alignSelf: 'flex-start',
	marginBottom: 15,
});

const TagContainer = styled.View<{selected: boolean}>(({theme, selected}) => ({
	backgroundColor: selected ? theme.color.primary : theme.color.backgroundSecondary,
	margin: 4,
	borderRadius: 8,
	justifyContent: 'center',
	alignItems: 'center',
	padding: 5,
	textAlign: 'center',
}));

const StyledLabel = styled(Label)<{large: boolean}>(({large}) => ({
	textAlign: 'center',
	marginBottom: 0,
	fontSize: large ? 20 : 15,
}));
