import {View} from 'react-native';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {Label} from '../../../theme/Typography';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useStores} from '../../common/stores/RootStore';
import {OutlineInput} from '../../common/components/OutlineInput';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../../common/components/PrimaryButton';

export type LinkInputs = {
	link: string;
	description: string;
};
interface Props {
	groupId: string;
	owner: string;
}
const LINK_REGEX =
	/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
export const LinkForm = ({groupId}: Props) => {
	const {
		handleSubmit,
		control,

		formState: {errors},
	} = useForm<LinkInputs>();

	const [Open, setOpen] = useState(false);

	const store = useStores();
	const onSubmit: SubmitHandler<LinkInputs> = async data => {
		console.log(data);
		store.groupStore.createLink(data, groupId);
		setOpen(false);
	};
	const {t} = useTranslation('linkForm');
	return (
		<ReviewContainer onPress={() => setOpen(!Open)}>
			{Open ? (
				<>
					<View>
						<Label>{t('link')}</Label>
						<Controller
							control={control}
							name="link"
							rules={{
								pattern: {
									value: LINK_REGEX,
									message: 'Invalid link',
								},
								required: {value: true, message: 'Link is required'},
							}}
							render={({field: {onChange, value}}) => (
								<OutlineInput
									value={value}
									autoCapitalize="none"
									onChangeText={(text: string) => onChange(text)}
									errorText={errors.description?.message}
								/>
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
					<PrimaryButton title={t('createLink')} onPress={handleSubmit(onSubmit)} />
				</>
			) : (
				<StyledLabel>{t('createLink')}</StyledLabel>
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

const StyledLabel = styled(Label)({
	paddingTop: 15,
});
