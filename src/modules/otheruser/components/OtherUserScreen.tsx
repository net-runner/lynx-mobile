import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../common/stores/RootStore';
import {Background} from '../../common/components/Background';
import styled from '@emotion/native';
import {Row} from '../../common/components/SmallComps';
import {H1} from '../../../theme/Typography';
import {MainStackParams} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Screen} from '../../common/utils/Screen';
import {FlatList, TouchableOpacity} from 'react-native';
import {CompleteLinkgroup} from '../../lynx/store/types';
import {LinkGroupDisplay} from '../../common/components/LinkGroupDisplay';
import {LoadingStateSwitcher} from '../../common/components/LoadingStateSwitcher';

type Props = NativeStackScreenProps<MainStackParams, Screen.OTHERUSER>;

export const OtherUserScreen = observer<Props>(({navigation, route}) => {
	const store = useStores();
	const userName = route.params.username;

	useEffect(() => {
		store.lynxStore.loadUserGroups(userName);
	}, [userName, store.lynxStore]);

	const navigateToLinkGroup = (group: CompleteLinkgroup) => {
		navigation.navigate(Screen.LINKGROUP, group);
	};

	return (
		<Background>
			<StyledRow>
				<H1>{'@' + userName}</H1>
				<StyledNumber>{store.lynxStore.userLinkGroups.length}</StyledNumber>
			</StyledRow>
			<LoadingStateSwitcher
				tryAgainCallback={() => store.lynxStore.loadUserGroups(userName)}
				loadingState={store.lynxStore.userLoadingState}>
				<FlatList
					keyExtractor={item => item.owner + item.groupname}
					data={store.lynxStore.userLinkGroups}
					renderItem={({item}) => (
						<TouchableOpacity onPress={() => navigateToLinkGroup(item)}>
							<LinkGroupDisplay tags={store.lynxStore.tags} data={item} />
						</TouchableOpacity>
					)}
				/>
			</LoadingStateSwitcher>
		</Background>
	);
});
const StyledRow = styled(Row)({
	marginLeft: 20,
});

const StyledNumber = styled(H1)({
	marginLeft: 10,
});
