import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';

import SvgIcons from 'assets/svgs';

import { GlobalVariables, IToken } from 'constants/global-variables';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';
import { resetStack, setRoot } from 'navigation/utils';

import { getThemeColor } from 'utils/getThemeColor';
import Storages, { KeyStorage } from 'utils/storages';

import 'i18n';
import { useFetchProvinces } from 'states/provinces/hooks';

const LaunchScreen = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const styles = myStyles(theme);

    const initLocale = React.useCallback(() => {
        const currentLocale = 'en'; // Todo
        i18n.changeLanguage(currentLocale);
    }, [i18n]);

    React.useEffect(() => {
        initLocale();
    }, [initLocale]);

    useEffect(() => {
        SplashScreen.hide();
        Orientation.lockToPortrait();
        onNavigator();
    }, []);

    const onNavigator = async () => {
        const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

        let screenName: keyof RootNavigatorParamList = 'Login';
        if (tokenInfo?.accessToken) {
            GlobalVariables.tokenInfo = {
                ...tokenInfo,
            };
            screenName = 'Main';
        }

        setTimeout(() => {
            resetStack(screenName);
        }, 200);
    };

    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <SvgIcons.IcLogoLaunch />
            </View>
        </View>
    );
};

export default LaunchScreen;

const myStyles = (theme: string) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: getThemeColor().Color_Secondary_Green,
        },
        img: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
