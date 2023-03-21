import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useStores} from '../../common/stores/RootStore';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {Screen} from '../../common/utils/Screen';
import {MainStackParams} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {GroupTag} from '../../lynx/store/types';
import styled, {css} from '@emotion/native';
import {StyledLinkIcon} from '../../common/components/LinkIconFlavor';
import {Background} from '../../common/components/Background';
import {H1, Label} from '../../../theme/Typography';
import {OutlineInput} from '../../common/components/OutlineInput';
import {useTranslation} from 'react-i18next';
import {TagList} from '../../common/components/TagList';

export type NewGroupInputs = {
	name: string;
	groupname: string;
	description: string;
	owner: string;
	privacyLevel: number;
};

type Props = NativeStackScreenProps<MainStackParams, Screen.CREATEGROUP>;

export const CreateGroupScreen = observer(({navigation}: Props) => {
	const {t} = useTranslation('createGroup');
	const store = useStores();
	const {navigate} = navigation;
	const tags = store.lynxStore.tags;
	const {
		control,
		handleSubmit,
		formState: {errors},
		setValue,
	} = useForm<NewGroupInputs>();
	const [selectedTags, setSelectedTags] = useState<number[]>([]);
	const [selectedPrivacyLevel] = useState(0);

	const onTagClick = (i: number) => {
		let sTags = [...selectedTags];
		if (sTags.includes(i)) {
			sTags = sTags.filter(t => t !== i);
		} else {
			sTags.push(i);
		}
		setSelectedTags(sTags);
	};

	useEffect(() => {
		setValue('owner', store.userStore.username as string);
		setValue('privacyLevel', selectedPrivacyLevel);
	}, [store.userStore, setValue, selectedPrivacyLevel]);

	const onSubmit = async (data: NewGroupInputs) => {
		//Request creation of new linkgroup
		const createResponse = await store.services.api.createGroup(data);
		if (!createResponse) return;

		if (createResponse.ok) {
			const newGroup = createResponse.data!;

			//Create Group tags
			const preparedTags: Omit<GroupTag, 'id'>[] = [];
			for (let index = 0; index < selectedTags.length; index++) {
				const tagIndex = selectedTags[index];
				const tag = tags[tagIndex];
				preparedTags.push({groupId: newGroup.id, tagId: tag.id});
			}

			const createTagResponse = await store.services.api.createMultipleGroupTags(preparedTags);

			if (createTagResponse.ok) {
				store.userStore.loadGroups();
				navigate(Screen.LINKGROUP, newGroup);
			}
		}
	};
	return (
		<Background>
			<ScrollView showsVerticalScrollIndicator={false}>
				<H1>{t('createNewGroup')}</H1>
				<StyledInputContainer>
					<StyledLabel>{t('name')}</StyledLabel>
					<Controller
						control={control}
						name="name"
						rules={{
							required: {value: true, message: 'Description is required'},
						}}
						render={({field: {onChange, value}}) => (
							<OutlineInput
								value={value}
								onChangeText={(text: string) => onChange(text)}
								errorText={errors.name?.message}
							/>
						)}
					/>
				</StyledInputContainer>
				<StyledInputContainer>
					<StyledLabel>{t('groupname')}</StyledLabel>
					<Controller
						control={control}
						name="groupname"
						rules={{
							required: {value: true, message: 'Group name must be provided'},
						}}
						render={({field: {onChange, value}}) => (
							<OutlineInput
								value={value}
								autoCapitalize="none"
								onChangeText={(text: string) => onChange(text)}
								errorText={errors.groupname?.message}
							/>
						)}
					/>
				</StyledInputContainer>
				<StyledInputContainer>
					<StyledLabel>{t('tags')}</StyledLabel>
					<TagList large tags={store.lynxStore.tags} selectedTags={selectedTags} onClickHandler={onTagClick} />
				</StyledInputContainer>
				<StyledInputContainer>
					<StyledLabel>{t('description')}</StyledLabel>
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
								errorText={errors.groupname?.message}
							/>
						)}
					/>
				</StyledInputContainer>
				<ButtonRow>
					<StyledLinkIcon width={45} height={45} />
					<PrimaryButton style={ButtonStyle} title="Add group" onPress={handleSubmit(onSubmit)} />
					<StyledLinkIcon width={45} height={45} />
				</ButtonRow>
			</ScrollView>
		</Background>
	);
});
const StyledLabel = styled(Label)({
	fontSize: 20,
	marginTop: 20,
});
const StyledInputContainer = styled.View({
	alignContent: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	marginHorizontal: 40,
});
const ButtonRow = styled.View({
	flexDirection: 'row',
	alignContent: 'center',
	justifyContent: 'center',
});
const ButtonStyle = css({
	width: 250,
	marginHorizontal: 10,
});
