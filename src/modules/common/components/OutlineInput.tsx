import {TextInputProps} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

type Props = TextInputProps & {errorText: string | undefined};

export const OutlineInput = (props: Props) => {
	return (
		<>
			<InputContainer>
				<StyledInput {...props} />
				{props.errorText && <ErrorText>{props.errorText}</ErrorText>}
			</InputContainer>
		</>
	);
};
const InputContainer = styled.View({
	marginBottom: 30,
});

const ErrorText = styled.Text({
	color: 'red',
});

const StyledInput = styled.TextInput(({theme}) => ({
	color: theme.color.text,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 300,
	height: 50,
	borderWidth: 0.8,
	borderColor: 'rgba(249, 249, 249, 0.25)',
	borderRadius: 10,
	padding: 5,
}));
