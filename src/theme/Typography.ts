import styled from '@emotion/native';

export const H1 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
	fontWeight: 'bold',
	fontSize: 25,
	marginTop: 20,
	marginBottom: 20,
	color: theme.color.text,
	textAlign: 'center',
}));

export const H2 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H3 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H4 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H5 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H6 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H7 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Subtitle1 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Subtitle2 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Body1 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Body2 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Body3 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const ButtonText = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Caption = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Overline = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Label = styled.Text`
	align-self: flex-start;
	margin-bottom: 15px;
	color: ${({theme}) => theme.color.text};
`;
export const BoldLabel = styled(Label)`
	font-weight: bold;
`;
