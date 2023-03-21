import {View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useStores} from '../../common/stores/RootStore';
import {useForm, Controller} from 'react-hook-form';
import {H1, Label} from '../../../theme/Typography';
import {OutlineInput} from '../../common/components/OutlineInput';
import {Screen} from '../../common/utils/Screen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {AuthLayout} from '../../common/components/AuthLayout';
import {PrimaryButton} from '../../common/components/PrimaryButton';
type Inputs = {
	email: string;
	name: string;
	password: string;
	repeat_password: string;
};
type NavigationProps = NativeStackNavigationProp<MainStackParams, Screen.START>;

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const SignupScreen = () => {
	const {navigate} = useNavigation<NavigationProps>();
	const store = useStores();
	const {t} = useTranslation('auth');
	const {
		control,
		formState: {errors},
		handleSubmit,
	} = useForm<Inputs>();
	const onSubmit = async (data: Inputs) => {
		const isSignedUp = await store.userStore.signup(data);
		if (isSignedUp) {
			navigate(Screen.SIGNIN);
		}
	};
	return (
		<AuthLayout>
			<H1>{t('join')}</H1>
			<View>
				<Label>{t('email')}</Label>
				<Controller
					control={control}
					rules={{
						pattern: {
							value: EMAIL_REGEX,
							message: 'Not a valid email',
						},
						required: {value: true, message: 'Email is required'},
					}}
					name="email"
					render={({field: {onChange, value}}) => (
						<OutlineInput
							keyboardType={'email-address'}
							value={value}
							autoCapitalize="none"
							onChangeText={(text: string) => onChange(text)}
							errorText={errors.email?.message}
						/>
					)}
				/>
			</View>
			<View>
				<Label>{t('name')}</Label>
				<Controller
					control={control}
					name="name"
					render={({field: {onChange, value}}) => (
						<OutlineInput
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
							secureTextEntry
							value={value}
							onChangeText={(text: string) => onChange(text)}
							errorText={errors.password?.message}
						/>
					)}
				/>
			</View>
			<View>
				<Label>{t('repeatPassword')}</Label>
				<Controller
					control={control}
					name="repeat_password"
					render={({field: {onChange, value}}) => (
						<OutlineInput
							secureTextEntry
							value={value}
							onChangeText={(text: string) => onChange(text)}
							errorText={errors.email?.message}
						/>
					)}
				/>
			</View>
			<PrimaryButton title={t('signup')} onPress={handleSubmit(onSubmit)} />
		</AuthLayout>
	);
};
