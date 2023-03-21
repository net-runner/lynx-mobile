import {FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useStores} from '../../common/stores/RootStore';
import {LinkGroupDisplay} from '../../common/components/LinkGroupDisplay';
import {CompleteLinkgroup} from '../../lynx/store/types';
import {Screen} from '../../common/utils/Screen';
import {MainStackParams} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import InfoPanel from '../../common/components/InfoPanel';
import {Background} from '../../common/components/Background';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {HomeTabParams} from '../../home/components/HomeTab.navigator';
import {css} from '@emotion/native';
import {observer} from 'mobx-react-lite';
import {LoadingStateSwitcher} from '../../common/components/LoadingStateSwitcher';

type Props = CompositeScreenProps<
	BottomTabScreenProps<HomeTabParams, Screen.USER>,
	NativeStackScreenProps<MainStackParams>
>;

const UserScreen = observer<Props>(({navigation}) => {
	const store = useStores();

	useEffect(() => {
		store.userStore.loadGroups();
	}, [store.userStore]);

	const navigateToLinkGroup = (group: CompleteLinkgroup) => {
		navigation.navigate(Screen.LINKGROUP, group);
	};

	return (
		<Background>
			{store.userStore.groups.length === 0 && <InfoPanel text={'Nothing to see here!'} />}
			<PrimaryButton
				style={ButtonStyle}
				title="Add new group"
				onPress={() => navigation.navigate(Screen.CREATEGROUP)}
			/>
			<LoadingStateSwitcher
				tryAgainCallback={() => store.userStore.loadGroups()}
				loadingState={store.userStore.loadingState}>
				<FlatList
					keyExtractor={item => item.owner + item.groupname}
					data={store.userStore.groups}
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
const ButtonStyle = css({
	marginTop: 20,
	alignSelf: 'center',
});
export default UserScreen;
