import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    AppState,
    BackHandler,
    Linking,
    NativeModules,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNRestart from 'react-native-restart';
import SendIntentAndroid from 'react-native-send-intent';
import uuid from 'react-native-uuid';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/core';
import RNFetchBlob from 'rn-fetch-blob';

import { BASE_URL } from '../../../envs/env.json';
import { OverlaySpinner, WebViewError } from '../../components';
import {
    EUREKA_BASE_URL,
    EUREKA_DEVICE_INFO,
    EUREKA_DEVICE_TOKEN,
    EUREKA_LANGUAGE,
    EUREKA_OAUTH_TOKEN,
    HAS_LAUNCHED,
    REDIRECT_URL,
    REDIRECT_URL_EXTRA_DATA,
    USER_PROFILE,
    historyStateWrapperJS,
} from '../../const';
import i18n from '../../i18n';
import { getLemonOAuthToken } from '../../services';
import { AppColors } from '../../theme';
import {
    changeAppLanguage,
    clearAsyncStorage,
    clearDeviceIdFromDeviceInfo,
    createAsyncDelay,
    getCurrentLanguage,
    getDeviceInfoJS,
    getEurekaUserAgent,
    getExtendedDeviceInfo,
    getWebViewInfoJS,
    hapticFeedback,
    injectScriptToEurekaWeb,
    openShare,
    redirectWebView,
    sendMessageToWebView,
    showToast,
} from '../../utils';

import type {
    AppImageInfo,
    AppMessage,
    AutoSyncLocalStorageData,
    DeviceInfo,
    ExtendedDeviceInfo,
    ImagePickerInfo,
    LemonOAuthTokenResult,
    LoginProvider,
    SyncWebStorage,
    UserProfileView,
    VersionInfo,
    WebMessage,
} from '@lemon/types';
import type { AppStateStatus } from 'react-native';
import type { Options } from 'react-native-image-crop-picker';
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

export const EurekaWebViewScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const appState = useRef(AppState.currentState);
    const backgroundTimestamp = useRef<number | null>(null);

    // for webview loading
    const [baseURL, setBaseURL] = useState(BASE_URL);
    const [showLoadingBar, setShowLoadingBar] = useState(false);

    const [showSpinner, setShowSpinner] = useState(false);
    const [spinnerType, setSpinnerType] = useState<'white' | 'default'>('default');
    const [canGoBack, setCanGoBack] = useState(false);
    const [isOpenedWebModal, setIsOpenedWebModal] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const [userAgent, setUserAgent] = useState('');
    const [deviceInfoJS, setDeviceInfoJS] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const onAndroidBackPress = (): boolean => {
        if (isOpenedWebModal) {
            const message: AppMessage = { type: 'DismissWebModal', data: null };
            sendMessageToWebView(message);
            return true;
        }

        if (canGoBack) {
            const message: AppMessage = { type: 'GoBack', data: null };
            sendMessageToWebView(message);
            return true;
        }

        Alert.alert('', '앱을 종료하시겠습니까?', [
            { text: '취소', onPress: () => null, style: 'cancel' },
            { text: '확인', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        appState.current = nextAppState;

        if (appState.current === 'background') {
            backgroundTimestamp.current = new Date().getTime();
            return;
        }

        if (appState.current === 'active') {
            if (typeof backgroundTimestamp.current !== 'number') {
                return;
            }
            const activeTimestamp = new Date().getTime();
            const TEN_MINUTES = 10 * 60 * 1000;
            const isOverTenMinutes = activeTimestamp - backgroundTimestamp.current > TEN_MINUTES;
            if (isOverTenMinutes) {
                backgroundTimestamp.current = null;
                reloadApp();
                return;
            }
            backgroundTimestamp.current = null;
        }
    };

    useEffect((): (() => void) => {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    }, [onAndroidBackPress]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, [handleAppStateChange]);

    // set DEVICE INFO
    useEffect(() => {
        getEurekaUserAgent()
            .then(userAgent => setUserAgent(userAgent))
            .then(() => AsyncStorage.getItem(EUREKA_BASE_URL))
            .then(url => setBaseURL(url || BASE_URL))
            .then(() => AsyncStorage.getItem(EUREKA_DEVICE_INFO))
            .then(deviceData => getDeviceInfoJS(deviceData))
            .then((deviceScript: string) => deviceScript + getWebViewInfoJS('main'))
            .then((script: string) => setDeviceInfoJS(script));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            // Initialize language
            AsyncStorage.getItem(EUREKA_LANGUAGE)
                .then(savedLanguage => {
                    if (savedLanguage) {
                        return i18n.changeLanguage(savedLanguage);
                    }
                })
                .then(() => getCurrentLanguage());
        }
    }, [isLoaded]);

    const handleOnMessage = async (event: { nativeEvent: any }) => {
        try {
            const message: WebMessage = JSON.parse(event.nativeEvent.data);
            if (message.type === 'NavigationStateChange') {
                setCurrentUrl(event.nativeEvent.url);
                return;
            }
            if (message.type === 'AutoSyncLocalStorage') {
                await handleAutoSyncStorage(message);
                return;
            }
            checkMessageType(message);
        } catch (e) {
            return;
        }
    };

    const handleAutoSyncStorage = async (message: AutoSyncLocalStorageData<'AutoSyncLocalStorage'>) => {
        const { key, value, operation } = message.data;
        switch (operation) {
            case 'set':
                if (!value) {
                    return;
                }
                if (typeof value === 'object') {
                    await AsyncStorage.setItem(key, JSON.stringify(value));
                    return;
                }
                await AsyncStorage.setItem(key, String(value));
                return;
            case 'remove':
                await AsyncStorage.removeItem(key);
                return;
            case 'clear':
                await AsyncStorage.clear();
                return;
        }
    };

    const openWebViewAsModal = (title = 'EurekaKit', url: string) => {
        if (!url) {
            return;
        }
        navigation.navigate('ModalWebView', { title, url });
        return;
    };

    const openUrl = (url: string, supportedUrl = '') => {
        Linking.canOpenURL(url)
            .then(canOpen => {
                if (canOpen) {
                    return Linking.openURL(url);
                }
                const hasSupportedUrl = !!supportedUrl;
                if (hasSupportedUrl) {
                    return Linking.openURL(supportedUrl);
                }
                // NOTE: do nothing
                return;
            })
            .catch(err => console.error('An error occurred', err));
    };

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const saveImageToDevice = async (imageUrl: string) => {
        if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
            const message: AppMessage = { type: 'FailToSaveImage', data: { imageUrl } };
            sendMessageToWebView(message);
            return;
        }

        if (Platform.OS === 'android') {
            const fileName = uuid.v4();
            const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName;
            const result = await RNFetchBlob.config({
                fileCache: true,
                path,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path,
                },
            })
                .fetch('GET', imageUrl)
                .catch(err => {
                    console.log(err);
                });
            const message: AppMessage = { type: 'SuccessToSaveImage', data: { imageUrl } };
            sendMessageToWebView(message);
            return;
        }
        await CameraRoll.save(imageUrl);
        const message: AppMessage = { type: 'SuccessToSaveImage', data: { imageUrl } };
        sendMessageToWebView(message);
    };

    const reloadApp = () => {
        setShowLoadingBar(false);
        RNRestart.restart();
    };

    const openSettings = () => {
        Linking.openSettings();
    };

    const openRootSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root');
            return;
        }
        if (NativeModules.OpenSettingsModule) {
            NativeModules.OpenSettingsModule.openSettings();
            return;
        }
        openSettings();
    };

    const saveCurrentUserInfo = async (profile: UserProfileView, lemonOAuthToken: LemonOAuthTokenResult) => {
        await AsyncStorage.setItem(USER_PROFILE, JSON.stringify(profile));
        await AsyncStorage.setItem(EUREKA_OAUTH_TOKEN, JSON.stringify(lemonOAuthToken));
    };

    const checkMessageType = (message: WebMessage) => {
        switch (message.type) {
            case 'LoginWithSDK':
                const { provider } = message.data;
                loginWithProvider(provider);
                break;
            case 'SetCurrentUserInfo':
                const { profile, lemonOAuthToken } = message.data;
                saveCurrentUserInfo(profile, lemonOAuthToken);
                break;
            case 'OpenModalWebView':
                const { modalTitle, webViewUrl } = message.data;
                openWebViewAsModal(modalTitle, webViewUrl);
                return;
            case 'SaveImageByUrl':
                const { imageUrl } = message.data;
                saveImageToDevice(imageUrl);
                return;
            case 'OpenSettings':
                if (message.data?.type === 'root') {
                    openRootSettings();
                    return;
                }
                openSettings();
                return;
            case 'OpenLink':
                const { url, supportedUrl } = message.data;
                openUrl(url, supportedUrl);
                return;
            case 'OpenShare':
                const { title, subject, dynamicLinkParams } = message.data;
                setShowSpinner(true);
                buildShareLink(dynamicLinkParams).then(dynamicLink => {
                    setShowSpinner(false);
                    openShare(title, subject, dynamicLink);
                });
                break;
            case 'SetIsOpenWebModal':
                const { isOpenedWebModal } = message.data;
                setIsOpenedWebModal(isOpenedWebModal);
                return;
            case 'SetCanGoBack':
                const { canGoBack } = message.data;
                setCanGoBack(canGoBack);
                return;
            case 'SyncWebStorage':
                const storageData: SyncWebStorage = message.data;
                saveToAsyncStorage(storageData).then(() => {
                    const message: AppMessage = {
                        type: 'SuccessToSyncWebStorage',
                        data: storageData,
                    };
                    sendMessageToWebView(message);
                });
                return;
            case 'LogoutApp':
                const { keepStorageKeys, shouldReload } = message.data;
                const keepItems = [...keepStorageKeys, EUREKA_DEVICE_INFO, EUREKA_DEVICE_TOKEN, HAS_LAUNCHED];
                // NOTE: android의 경우, reloadApp() 이후 cache가 남아있는 이슈가 있음
                clearAsyncStorage(keepItems)
                    .then(() => clearDeviceIdFromDeviceInfo())
                    .then(() => (shouldReload ? reloadApp() : new Promise(resolve => resolve(true))));
                return;
            case 'ReloadApp':
                reloadApp();
                return;
            case 'TriggerHaptic':
                hapticFeedback();
                return;
            case 'SetShowSpinner':
                const { showSpinner, type } = message.data;
                setShowSpinner(showSpinner || false);
                const newType = message.data.type || 'default';
                const isSameSpinner = spinnerType === newType;
                if (isSameSpinner) {
                    return;
                }
                setSpinnerType(newType);
                return;
            case 'RequestSyncDeviceInfo':
                setDeviceInfoToWeb().then(deviceInfoStr => {
                    if (!deviceInfoStr) {
                        return;
                    }
                    const deviceInfo: DeviceInfo & VersionInfo & ExtendedDeviceInfo = JSON.parse(deviceInfoStr);
                    const message: AppMessage = {
                        type: 'SuccessToSyncDeviceInfo',
                        data: deviceInfo,
                    };
                    sendMessageToWebView(message);
                });
                return;
            case 'OpenImageCropPicker':
                openImageCropPicker(message.data as ImagePickerInfo).then(() => ImagePicker.clean());
                return;
            case 'OpenImagePickerCamera':
                openImagePickerCamera(message.data as ImagePickerInfo).then(() => ImagePicker.clean());
                return;
            case 'CleanImageCropPicker':
                ImagePicker.clean();
                return;
            case 'SetBaseUrl':
                const baseUrl = message.data.url;
                if (!baseUrl) {
                    return;
                }
                AsyncStorage.setItem(EUREKA_BASE_URL, baseUrl).then(() => reloadApp());
                return;
            case 'ChangeLanguage':
                const { language } = message.data;
                if (!language) {
                    return;
                }
                changeAppLanguage(language);
                return;
            case 'GetCurrentLanguage':
                getCurrentLanguage();
                return;
            default:
                return;
        }
    };

    const updateDeviceInfo = async (rawDeviceInfo: string): Promise<string> => {
        try {
            const baseDeviceInfo: DeviceInfo & VersionInfo = JSON.parse(rawDeviceInfo);
            const extendedDeviceInfo: ExtendedDeviceInfo = await getExtendedDeviceInfo();
            const mergedDeviceInfo: DeviceInfo & VersionInfo & ExtendedDeviceInfo = {
                ...baseDeviceInfo,
                ...extendedDeviceInfo,
            };
            const serializedDeviceInfo = JSON.stringify(mergedDeviceInfo);
            await AsyncStorage.setItem(EUREKA_DEVICE_INFO, serializedDeviceInfo);

            return serializedDeviceInfo;
        } catch (error) {
            console.error('Failed to update device info:', error);
            throw error;
        }
    };

    const setDeviceInfoToWeb = async (): Promise<string> => {
        try {
            const storedDeviceInfo = await AsyncStorage.getItem(EUREKA_DEVICE_INFO);
            const deviceInfoScript = await getDeviceInfoJS(storedDeviceInfo);
            injectScriptToEurekaWeb(deviceInfoScript);

            return await updateDeviceInfo(storedDeviceInfo);
        } catch (error) {
            console.error('Failed to set device info to web:', error);
            return '';
        }
    };

    const openImageCropPicker = async (pickerInfo: ImagePickerInfo) => {
        const pickerOptions: any = {
            includeBase64: true,
            cropperCircleOverlay: true,
            cropperChooseText: '저장',
            cropperCancelText: '취소',
            ...(pickerInfo.options as Options),
        };
        return ImagePicker.openPicker(pickerOptions).then((imageInfo: unknown) =>
            sendCropImagesToWebView(pickerInfo, imageInfo)
        );
    };

    const openImagePickerCamera = async (pickerInfo: ImagePickerInfo) => {
        const cameraOptions = {
            includeBase64: true,
            ...(pickerInfo.options as Options),
        };
        return ImagePicker.openCamera(cameraOptions).then((imageInfo: unknown) =>
            sendCropImagesToWebView(pickerInfo, imageInfo)
        );
    };

    const sendCropImagesToWebView = async (pickerInfo: ImagePickerInfo, imageInfo: unknown) => {
        const { options, pageInfo } = pickerInfo;
        let images: AppImageInfo[] = [imageInfo as AppImageInfo];
        if (options.multiple) {
            images = imageInfo as AppImageInfo[];
        }
        const message: AppMessage = {
            type: 'SuccessToGetImages',
            data: {
                images,
                pageInfo,
            },
        };
        return sendMessageToWebView(message);
    };

    const saveToAsyncStorage = async (data: SyncWebStorage) => {
        if (!data) {
            return;
        }
        const saveDatas = Object.entries(data)
            .filter(([_, value]) => !!value)
            .map(async ([key, value]) => {
                if (typeof value === 'object') {
                    return await AsyncStorage.setItem(key, JSON.stringify(value));
                }
                return await AsyncStorage.setItem(key, String(value));
            });
        await Promise.all(saveDatas);

        return data;
    };

    const onLoadEnd = () => {
        if (isLoaded) {
            setShowLoadingBar(false);
            return;
        }

        createAsyncDelay(200)
            .then(() => setShowLoadingBar(false))
            .then(() => AsyncStorage.getItem(REDIRECT_URL))
            .then(url => {
                if (url) {
                    return createAsyncDelay(200)
                        .then(() => AsyncStorage.getItem(REDIRECT_URL_EXTRA_DATA))
                        .then(extra => redirectWebView(url, extra));
                }
                return '';
            })
            .then(() => AsyncStorage.removeItem(REDIRECT_URL))
            .then(() => AsyncStorage.removeItem(REDIRECT_URL_EXTRA_DATA))
            .then(() => setIsLoaded(true));
    };

    const onShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
        // 'http://localhost*', 'https://*', 'sms:*', , 'tel:*', 'mailto:*', 'itms-apps:*', 'market:*', 'intent:*'
        if (
            event.url.startsWith('http://') ||
            event.url.startsWith('https://') ||
            event.url.startsWith('about:blank')
        ) {
            return true;
        }
        if (Platform.OS === 'android') {
            SendIntentAndroid.openAppWithUri(event.url)
                .then(isOpened => {
                    if (!isOpened) {
                        showToast(t('app.name'), t('app.error.launch'));
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        Linking.openURL(event.url).catch(err => {
            // NOTE: open toast?
        });
        return false;
    };

    const loginWithProvider = async (provider: LoginProvider) => {
        setShowSpinner(true);
        const lemonOAuthToken = await getLemonOAuthToken(provider);
        if (!lemonOAuthToken) {
            setShowSpinner(false);
            sendMessageToWebView({ type: 'FailToGetVerifyNativeToken', data: { provider, platform: Platform.OS } });
            return;
        }
        sendMessageToWebView({ type: 'SuccessToGetVerifyNativeToken', data: lemonOAuthToken });
    };

    return (
        <>
            {!!deviceInfoJS && (
                <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
                    {showSpinner && <OverlaySpinner type={spinnerType} />}
                    <WebView
                        injectedJavaScriptBeforeContentLoaded={historyStateWrapperJS + deviceInfoJS}
                        userAgent={userAgent}
                        ref={ref => (global['eurekaWebViewRef'] = ref)}
                        originWhitelist={['*']}
                        source={{ uri: baseURL }}
                        javaScriptEnabled={true}
                        scrollEnabled={true}
                        contentMode={'mobile'}
                        // NOTE: fix flickering issue on ionic with back swipe
                        // allowsBackForwardNavigationGestures
                        scalesPageToFit={true}
                        ignoreSslError={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback={true}
                        allowFileAccess={true}
                        mediaPlaybackRequiresUserAction={false}
                        onLoadStart={() => setShowLoadingBar(true)}
                        onLoadEnd={onLoadEnd}
                        onShouldStartLoadWithRequest={event => onShouldStartLoadWithRequest(event)}
                        renderError={() => <WebViewError />}
                        onMessage={handleOnMessage}
                    />
                </SafeAreaView>
            )}
        </>
    );
};
