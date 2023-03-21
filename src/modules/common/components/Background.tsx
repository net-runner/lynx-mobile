import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
export const Background = styled(SafeAreaView)(({theme}) => ({
	backgroundColor: theme.color.background,
}));
