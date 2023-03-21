import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
export const Box = styled(SafeAreaView)(({theme}) => ({
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
	backgroundColor: theme.color.background,
}));
