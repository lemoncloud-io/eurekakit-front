import React, { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import Toast, { toastConfig } from './components/Toast';
import i18n from './i18n';
import AppNavigator from './navigation';
import { AppConsumer, AppProvider } from './provider';
import { checkIfFirstLaunch, setDefaultDeviceInfo, showToast } from './utils';

enableScreens();

const App = props => {
    const { t } = useTranslation();
    let isRegistered = false;
    const [isReady, setIsReady] = useState(false);

    const initEurekaApp = async (token = '') => {
        isRegistered = true;
        await setDefaultDeviceInfo(token);
        setIsReady(true);
        // check first launch
        const isFirstLaunch = await checkIfFirstLaunch();
        if (isFirstLaunch) {
            showToast(t('app.name'), t('notification.firstLaunch'));
        }
    };

    const forceInitOniOS = () => {
        // NOTE: app 처음 인스톨 후 실행시 알림 문제
        if (Platform.OS !== 'ios') {
            return;
        }
        setTimeout(async () => {
            if (isRegistered) {
                return;
            }
            await initEurekaApp();
        }, 500);
    };

    useEffect(() => {
        forceInitOniOS();
    }, []);

    // NOTE: fix statusbar color on dark mode in iOS
    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('white');
        }
        StatusBar.setBarStyle('dark-content');
    }, []);

    const renderEureka = () => {
        return (
            <I18nextProvider i18n={i18n}>
                <GestureHandlerRootView>
                    <AppProvider {...props}>
                        <AppConsumer>
                            {globalFunctions => {
                                global['props'] = { ...globalFunctions };
                                return (
                                    <>
                                        <AppNavigator {...globalFunctions} />
                                        <Toast config={toastConfig} position={'top'} />
                                    </>
                                );
                            }}
                        </AppConsumer>
                    </AppProvider>
                </GestureHandlerRootView>
            </I18nextProvider>
        );
    };

    return isReady && renderEureka();
};

export default App;
