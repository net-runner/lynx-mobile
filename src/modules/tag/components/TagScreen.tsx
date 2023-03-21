import {FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../App';
import {Screen} from '../../common/utils/Screen';
import {H1} from '../../../theme/Typography';
import {Row} from '../../common/components/SmallComps';
import {useStores} from '../../common/stores/RootStore';
import {CompleteLinkgroup} from '../../lynx/store/types';
import {LinkGroupDisplay} from '../../common/components/LinkGroupDisplay';
import styled from '@emotion/native';
import {Background} from '../../common/components/Background';
type Props = NativeStackScreenProps<MainStackParams, Screen.TAG>;

export const TagScreen = ({route, navigation}: Props) => {
	const Tag = route.params;
	const store = useStores();

	useEffect(() => {
		store.lynxStore.loadTagGroups(Tag.name);
	}, [Tag.name, store.lynxStore]);
	const navigateToLinkGroup = (group: CompleteLinkgroup) => {
		navigation.navigate(Screen.LINKGROUP, group);
	};
	return (
		<Background>
			<StyledRow>
				<H1>{'#' + Tag.name.charAt(0).toLocaleUpperCase() + Tag.name.slice(1)}</H1>
				<StyledNumber>{store.lynxStore.tagLinkGroups.length}</StyledNumber>
			</StyledRow>
			<FlatList
				keyExtractor={item => item.owner + item.groupname}
				data={store.lynxStore.tagLinkGroups}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigateToLinkGroup(item)}>
						<LinkGroupDisplay tags={store.lynxStore.tags} data={item} />
					</TouchableOpacity>
				)}
			/>
		</Background>
	);
};
const StyledRow = styled(Row)({
	marginLeft: 20,
});

const StyledNumber = styled(H1)({
	marginLeft: 10,
});
