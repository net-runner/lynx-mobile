import styled from '@emotion/native';
import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {Background} from '../../common/components/Background';
import {ScrollViewStyle} from '../../common/components/SmallComps';
import {TagList} from '../../common/components/TagList';
import {useStores} from '../../common/stores/RootStore';

export const TagListScreen = () => {
	const store = useStores();
	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={store.lynxStore.isLoading} onRefresh={() => store.lynxStore.loadTags()} />
			}
			contentContainerStyle={ScrollViewStyle}>
			<MaxBg>
				<TagList tags={store.lynxStore.tags} showCount large />
			</MaxBg>
		</ScrollView>
	);
};
const MaxBg = styled(Background)({
	flex: 1,
	padding: 20,
	flexGrow: 1,
});
