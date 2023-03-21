import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MainStackParams} from '../../../App';
import {H1} from '../../../theme/Typography';
import {AuthLayout} from '../../common/components/AuthLayout';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {LogoDetail} from '../../common/components/SvgIcons/LogoDetail';
import {Screen} from '../../common/utils/Screen';

type NavigationProps = NativeStackNavigationProp<MainStackParams, Screen.START>;

export const StartScreen = () => {
	const {navigate} = useNavigation<NavigationProps>();
	const {t} = useTranslation('start');

	return (
		<AuthLayout>
			<LogoDetail width={250} height={250} />
			<H1>{t('title')}</H1>
			<PrimaryButton title={t('signin')} onPress={() => navigate(Screen.SIGNIN)} />
			<PrimaryButton title={t('signup')} onPress={() => navigate(Screen.SIGNUP)} />
		</AuthLayout>
	);
};
