import React from 'react';
import styled from '@emotion/native';
import {Review} from '../../lynx/store/types';
import {BoldLabel, Label} from '../../../theme/Typography';
import {ReviewStars} from './ReviewStars';
import {Row} from './SmallComps';

interface Props {
	data: Review;
}
export const ReviewComponent = ({data}: Props) => {
	return (
		<ReviewRow>
			<StyledRow>
				<StyledBoldLabel>{'@' + data.creatorName}</StyledBoldLabel>
				<ReviewStars rating={data.score} />
			</StyledRow>

			<Label>{data.description}</Label>
		</ReviewRow>
	);
};

const ReviewRow = styled.View({
	display: 'flex',
	width: '100%',
	marginBottom: 10,
	alignItems: 'center',
});

const StyledRow = styled(Row)({
	justifyContent: 'space-between',
	marginBottom: 5,
	width: '100%',
	alignItems: 'center',
});

const StyledBoldLabel = styled(BoldLabel)({
	paddingTop: 15,
});
