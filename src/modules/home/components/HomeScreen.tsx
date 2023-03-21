import React from 'react';
import {useStores} from '../../common/stores/RootStore';
import {FlatList, TouchableOpacity} from 'react-native';
import {LinkGroupDisplay} from '../../common/components/LinkGroupDisplay';
import {CompleteLinkgroup} from '../../lynx/store/types';
import {Screen} from '../../common/utils/Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../App';
import styled, {css} from '@emotion/native';
import {Background} from '../../common/components/Background';
import {observer} from 'mobx-react-lite';

type NavigationProps = NativeStackScreenProps<MainStackParams, Screen.HOME>;

export const HomeScreen = observer<NavigationProps>(({navigation}) => {
	const store = useStores();
	const {navigate} = navigation;
	const navigateToLinkGroup = (group: CompleteLinkgroup) => {
		navigate(Screen.LINKGROUP, group);
	};
	return (
		<StyledBackground>
			<FlatList
				keyExtractor={item => item.owner + item.groupname}
				style={FlatListStyle}
				data={store.lynxStore.linkGroups}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigateToLinkGroup(item)}>
						<LinkGroupDisplay tags={store.lynxStore.tags} data={item} />
					</TouchableOpacity>
				)}
			/>
		</StyledBackground>
	);
});
const StyledBackground = styled(Background)({
	flex: 1,
	padding: 0,
	margin: 'auto',
});

const FlatListStyle = css({
	flex: 1,
	flexGrow: 1,
	marginBottom: -30,
});
