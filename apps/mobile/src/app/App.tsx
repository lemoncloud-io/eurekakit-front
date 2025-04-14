import React, { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Linking, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { enableScreens } from 'react-native-screens';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import i18n from './i18n';
import { GOOGLE } from '../envs/secret.json';
import Toast, { toastConfig } from './components/Toast';
import AppNavigator from './navigation';
import { AppConsumer, AppProvider } from './provider';
import NotificationService from './services/NotificationService';
import {
    checkIfFirstLaunch,
    readPushNotification,
    redirectWebView,
    setDefaultDeviceInfo,
    setRedirectUrl,
    showToast,
    toastNotification,
} from './utils';

import type { TokenInfo } from '@lemon/types';

enableScreens();

const App = props => {
    const { t } = useTranslation();
    let isRegistered = false;
    const [isReady, setIsReady] = useState(false);

    const onRegistrationError = async (error: any) => {
        console.warn('onRegistrationError', error);
        if (isRegistered) {
            return;
        }
        await initEurekaApp();
    };

    const onTokenReceived = async (tokenInfo: TokenInfo) => {
        console.log('onTokenReceived', tokenInfo);
        const { token } = tokenInfo;
        if (!token) {
            await onRegistrationError(new Error('NO DEVICE TOKEN'));
            return;
        }
        if (isRegistered) {
            return;
        }
        await initEurekaApp(token);
    };

    const readNotification = (messageData: string) => {
        console.log('readNotification', messageData);
        try {
            const data = JSON.parse(messageData);
            if (data.notificationId) {
                readPushNotification(data.notificationId);
            }
        } catch (e) {
            console.warn(e);
        }
    };

    const onAndroidNotificationReceived = (notification: any) => {
        if (notification.userInteraction) {
            PushNotification.removeAllDeliveredNotifications();
        }

        const isForeground = notification.foreground && !notification.userInteraction;
        if (isForeground) {
            if (!notification.data?.messageType) {
                const title = notification.data.title || notification.title;
                const message = notification.data.message || notification.message;
                if (!title && !message) {
                    return;
                }
                toastNotification(title, message);
                return;
            }

            switch (notification.data?.messageType) {
                case 'notice': // 공지
                case 'my-news': // MY
                case 'event': // 예약
                case 'payment': // 결제
                case 'navigation':
                case 'NAVIGATION':
                    const title = notification.data.title || notification.title;
                    const message = notification.data.message || notification.message;
                    const extra = notification.data?.messageData || '{}';

                    const onPressToast = () => {
                        readNotification(extra);
                        redirectWebView(notification.data?.redirectUrl || '', extra);
                        Toast.hide();
                    };

                    toastNotification(title, message, onPressToast);
                    break;
                default:
                    console.log('TODO: add something');
                    return;
            }
            return;
        }

        if (!notification.data?.messageType) {
            const title = notification.data.title || notification.title;
            const message = notification.data.message || notification.message;
            toastNotification(title, message);
            return;
        }

        switch (notification.data?.messageType) {
            case 'notice':
            case 'my-news':
            case 'event':
            case 'payment':
            case 'navigation':
            case 'NAVIGATION':
                const { redirectUrl } = notification.data;
                const extra = notification.data?.messageData || '{}';
                readNotification(extra);
                redirectWebView(redirectUrl, extra);
                return;
            default:
                console.log('TODO: add something');
                return;
        }
    };

    const onIOSNotificationReceived = async (notification: any) => {
        const isQuit = !notification.action && !notification.data?.actionIdentifier;
        if (isQuit) {
            if (!notification.data?.messageType) {
                const title = notification.data.title || notification.title;
                const message = notification.data.message || notification.message;
                toastNotification(title, message);
                return;
            }

            switch (notification.data?.messageType) {
                case 'notice':
                case 'my-news':
                case 'event':
                case 'payment':
                case 'navigation':
                case 'NAVIGATION':
                    const { redirectUrl } = notification.data;
                    const extra = notification.data?.messageData || '{}';
                    await setRedirectUrl(redirectUrl, extra);
                    return;
                default:
                    console.log('TODO: add something');
                    return;
            }
        }

        if (!notification.data?.messageType) {
            const title = notification.data.title || notification.title;
            const message = notification.data.message || notification.message;
            toastNotification(title, message);
            return;
        }
        // NOTE: isTapOnForeground or isTapOnBackground
        // const isTapOnForeground = notification.foreground && notification.userInteraction;
        // const isTapOnBackground = !notification.foreground && notification.userInteraction;
        switch (notification.data?.messageType) {
            case 'notice':
            case 'my-news':
            case 'event':
            case 'payment':
            case 'navigation':
            case 'NAVIGATION':
                const { redirectUrl } = notification.data;
                const extra = notification.data?.messageData || '{}';
                readNotification(extra);
                redirectWebView(redirectUrl, extra);
                return;
            default:
                console.log('TODO: add something');
                return;
        }
    };

    const onNotificationReceived = (notification: any) => {
        console.log('onNotificationReceived: ', notification);
        const payload = notification.data || null;
        if (!payload) {
            return;
        }
        if (Platform.OS === 'ios') {
            onIOSNotificationReceived(notification);
        }
        if (Platform.OS === 'android') {
            onAndroidNotificationReceived(notification);
        }
    };

    const setupDynamicLinkListener = () => {
        // initial execute by url scheme or universal link
        Linking.getInitialURL()
            .then(url => {
                if (!url) {
                    return null;
                }
                return dynamicLinks().resolveLink(url);
            })
            .then(response => {
                if (!response) {
                    return;
                }
                return setRedirectUrl(response.url);
            })
            .catch(err => console.error('getInitialURL error: ', err));

        // background or quit state
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (!link) {
                    return;
                }
                if (link.url) {
                    return setRedirectUrl(link.url);
                }
            })
            .catch(err => console.error('getInitialLink error: ', err));
    };

    // dynamic link
    useEffect(() => {
        setupDynamicLinkListener();
        // foreground state
        const unsubscribeDynamicLinks = dynamicLinks().onLink(link => {
            console.info('dynamicLinks link: ', link);
            if (link.url) {
                redirectWebView(link.url);
            }
        });
        return () => unsubscribeDynamicLinks();
    }, []);

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
        const notificationService = new NotificationService(
            onTokenReceived,
            onNotificationReceived,
            onRegistrationError
        );
        notificationService.requestPermissions();
        if (Platform.OS === 'android') {
            // NOTE: for android 13
            notificationService
                .checkPushNotificationsPermission()
                .then(res => console.log('checkPushNotificationsPermission: ', res));
        }
        forceInitOniOS();
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            // EurekaPage OAuth 2.0 Client ID
            webClientId: GOOGLE.webClientId,
        });
    }, []);

    // NOTE: fix statusbar color on dark mode in iOS
    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('white');
        }
        StatusBar.setBarStyle('dark-content');
    }, []);

    const renderEurekaPage = () => {
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

    return isReady && renderEurekaPage();
};

export default App;
