import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {Label} from '../../../theme/Typography';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useStores} from '../../common/stores/RootStore';
import {OutlineInput} from '../../common/components/OutlineInput';
import {useTranslation} from 'react-i18next';
import {ReviewStars} from '../../common/components/ReviewStars';
import {PrimaryButton} from '../../common/components/PrimaryButton';

export type ReviewInputs = {
	creatorName: string;
	score: number;
	description: string;
	groupId: string;
};
interface Props {
	groupId: string;
}

export const ReviewForm = ({groupId}: Props) => {
	const {
		handleSubmit,
		control,
		setValue,
		formState: {errors},
	} = useForm<ReviewInputs>();
	const [Open, setOpen] = useState(false);
	const [isDisplayed, setIsDisplayed] = useState(true);
	const store = useStores();
	useEffect(() => {
		setValue('creatorName', store.userStore.username as string);
		setValue('groupId', groupId);
	}, [store.userStore.username, setValue, groupId]);

	const onSubmit: SubmitHandler<ReviewInputs> = async data => {
		console.log(data);
		store.groupStore.createReview(data);
		setIsDisplayed(false);
	};
	const {t} = useTranslation('reviewForm');
	if (!isDisplayed) return null;
	return (
		<ReviewContainer onPress={() => setOpen(!Open)}>
			{Open ? (
				<>
					<View>
						<Label>{t('score')}</Label>
						<Controller
							control={control}
							name="score"
							render={({field: {onChange, value}}) => (
								<StarContainer>
									<ReviewStars rating={value} onChange={onChange} isInput />
								</StarContainer>
							)}
						/>
					</View>

					<View>
						<Label>{t('description')}</Label>
						<Controller
							control={control}
							name="description"
							rules={{
								minLength: {value: 4, message: 'Description too short'},
								required: {value: true, message: 'Description is required'},
							}}
							render={({field: {onChange, value}}) => (
								<OutlineInput
									value={value}
									onChangeText={(text: string) => onChange(text)}
									errorText={errors.description?.message}
								/>
							)}
						/>
					</View>
					<PrimaryButton title={t('createReview')} onPress={handleSubmit(onSubmit)} />
				</>
			) : (
				<StyledLabel>{t('createReview')}</StyledLabel>
			)}
		</ReviewContainer>
	);
};

const ReviewContainer = styled.TouchableOpacity(({theme}) => ({
	alignSelf: 'center',
	padding: 15,
	borderRadius: 8,
	backgroundColor: theme.color.backgroundSecondary,
}));

const StarContainer = styled.View(({theme}) => ({
	backgroundColor: theme.color.backgroundTertiary,
	display: 'flex',
	borderRadius: 8,
	width: '50%',
	alignSelf: 'center',
	height: 30,
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledLabel = styled(Label)({
	paddingTop: 15,
});
