import styled from '@emotion/native';
import {GestureResponderEvent, TouchableOpacity, ViewStyle} from 'react-native';
import {Text} from 'react-native';
import React from 'react';

type Props = {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	style?: ViewStyle;
};
export const PrimaryButton = ({title, onPress, style}: Props) => {
	return (
		<ButtonContainer style={style} onPress={onPress}>
			<ButtonText>{title}</ButtonText>
		</ButtonContainer>
	);
};

const ButtonContainer = styled(TouchableOpacity)(({theme}) => ({
	backgroundColor: theme.color.primary,
	padding: 10,
	height: 50,
	width: 300,
	alignItems: 'center',
	marginBottom: 40,
	justifyContent: 'center',
	borderRadius: 10,
}));
const ButtonText = styled(Text)(({theme}) => ({
	color: theme.color.buttonText,
	fontWeight: 'bold',
	fontSize: 16,
}));
