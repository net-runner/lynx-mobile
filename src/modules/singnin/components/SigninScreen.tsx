import React from 'react';
import {useTranslation} from 'react-i18next';
import {H1, Label} from '../../../theme/Typography';
import {useForm, Controller} from 'react-hook-form';
import {OutlineInput} from '../../common/components/OutlineInput';
import {View} from 'react-native';
import {useStores} from '../../common/stores/RootStore';
import {AuthLayout} from '../../common/components/AuthLayout';
import {PrimaryButton} from '../../common/components/PrimaryButton';

type Inputs = {
	email: string;
	password: string;
};

export const SigninScreen = () => {
	const store = useStores();
	const {t} = useTranslation('auth');
	const {
		control,
		formState: {errors},
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		await store.userStore.login(data.email, data.password);
	};
	return (
		<AuthLayout>
			<H1>{t('welcome')}</H1>
			<View>
				<Label>{t('email')}</Label>
				<Controller
					control={control}
					name="email"
					render={({field: {onChange, value}}) => (
						<OutlineInput
							testID={'email-input'}
							keyboardType={'email-address'}
							autoCapitalize="none"
							value={value}
							onChangeText={(text: string) => onChange(text)}
							errorText={errors.email?.message}
						/>
					)}
				/>
			</View>
			<View>
				<Label>{t('password')}</Label>
				<Controller
					control={control}
					name="password"
					render={({field: {onChange, value}}) => (
						<OutlineInput
							testID={'password-input'}
							secureTextEntry
							value={value}
							onChangeText={(text: string) => onChange(text)}
							errorText={errors.password?.message}
						/>
					)}
				/>
			</View>

			<PrimaryButton title={t('signin')} onPress={handleSubmit(onSubmit)} />
		</AuthLayout>
	);
};
