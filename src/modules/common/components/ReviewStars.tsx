import {TouchableOpacity} from 'react-native';
import React from 'react';
import {StarEmpty} from './SvgIcons/StarEmpty';
import {StarFull} from './SvgIcons/StarFull';
import {StarHalf} from './SvgIcons/StarHalf';
import styled from '@emotion/native';

interface Props {
	rating: number;
	isInput?: boolean;
	onChange?: (rating: number) => void;
}

export const ReviewStars: React.FC<Props> = ({rating, isInput, onChange}) => {
	const handlePress = (index: number) => {
		if (isInput) {
			if (onChange) {
				onChange(index);
			}
		}
	};
	const stars = () => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i + 0.25 < rating && rating < i + 0.75) stars.push(<StarHalf key={i} />);
			else if (i < rating)
				stars.push(
					<TouchableOpacity key={i} onPress={_ => handlePress(i + 1)}>
						<StarFull />
					</TouchableOpacity>,
				);
			else
				stars.push(
					<TouchableOpacity key={i} onPress={_ => handlePress(i + 1)}>
						<StarEmpty />
					</TouchableOpacity>,
				);
		}
		return stars;
	};
	return <StarWrapper>{stars()}</StarWrapper>;
};

const StarWrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	& > svg:not(:first-child) {
		margin-left: 5px;
	}
`;
