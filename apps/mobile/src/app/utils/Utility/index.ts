import { Platform } from 'react-native';
import * as RNDeviceInfo from 'react-native-device-info';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import PushNotification from 'react-native-push-notification';
import RNRestart from 'react-native-restart';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import VersionCheck from 'react-native-version-check';

import { calcSignature } from '@lemoncloud/lemon-web-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { firebase as FIRInstallations } from '@react-native-firebase/installations';
import i18n from 'i18next';

import { BASE_URL, PROJECT } from '../../../envs/env.json';
import {
    DEFAULT_DEVICE_INFO,
    EUREKA_DEVICE_ID,
    EUREKA_DEVICE_INFO,
    EUREKA_DEVICE_TOKEN,
    EUREKA_LANGUAGE,
    HAS_LAUNCHED,
    REDIRECT_URL,
    REDIRECT_URL_EXTRA_DATA,
} from '../../const';

import type {
    AppMessage,
    DeviceInfo,
    DynamicLinkParams,
    ExtendedDeviceInfo,
    LemonOAuthTokenResult,
    NavigateToUrl,
    ReadPushNotification,
    ToastType,
    VersionInfo,
    WebViewType,
} from '@lemon/types';
import type { TokenSignature } from '@lemoncloud/lemon-web-core';

export const changeAppLanguage = async (language: string) => {
    await AsyncStorage.setItem(EUREKA_LANGUAGE, language);
    await i18n.changeLanguage(language);
    const message: AppMessage = {
        type: 'SuccessToChangeLanguage',
        data: { language },
    };
    sendMessageToWebView(message);
};

export const getCurrentLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem(EUREKA_LANGUAGE);
    const currentLanguage = savedLanguage || i18n.language;
    const message: AppMessage = {
        type: 'SuccessToGetCurrentLanguage',
        data: { language: currentLanguage },
    };
    sendMessageToWebView(message);
};

export const getTokenSignature = async (originToken: LemonOAuthTokenResult): Promise<TokenSignature> => {
    const payload = {
        authId: originToken.authId,
        accountId: originToken.accountId,
        identityId: originToken.identityId,
        identityToken: '',
    };
    const current = new Date().toISOString();
    const signature = calcSignature(payload, current);
    return { authId: payload.authId, current, signature, originToken };
};

export const getVersionInfo = async (): Promise<VersionInfo> => {
    const currentVersion = await VersionCheck.getCurrentVersion();
    const latestVersion = (await VersionCheck.getLatestVersion()) || '0.0.0';

    let shouldUpdate = false;
    const checkNeedUpdate = await VersionCheck.needUpdate();
    if (checkNeedUpdate && Object.prototype.hasOwnProperty.call(checkNeedUpdate, 'isNeeded')) {
        shouldUpdate = !!checkNeedUpdate.isNeeded;
    }

    return { currentVersion, latestVersion, shouldUpdate };
};

export const getEurekaPageUserAgent = async (): Promise<string> => {
    const defaultUserAgent = (await RNDeviceInfo.getUserAgent()) || '';
    const userAgentPostfix = Platform.OS === 'android' ? 'EUREKA_ANDROID' : 'EUREKA_IOS';
    return `${defaultUserAgent} ${userAgentPostfix}`;
};

export const setDefaultDeviceInfo = async (deviceToken = ''): Promise<DeviceInfo & VersionInfo> => {
    const installId = (await FIRInstallations.installations().getId()) || '';
    const savedDeviceId = (await AsyncStorage.getItem(EUREKA_DEVICE_ID)) || (uuid.v4() as string);
    const savedDeviceToken = (await AsyncStorage.getItem(EUREKA_DEVICE_TOKEN)) || '';
    const userAgent = await getEurekaPageUserAgent();

    const deviceInfo: DeviceInfo = {
        stage: __DEV__ ? 'dev' : 'prod',
        platform: Platform.OS,
        application: PROJECT,
        deviceToken: deviceToken || savedDeviceToken,
        deviceId: savedDeviceId,
        installId,
        userAgent,
    };
    const versionInfo: VersionInfo = await getVersionInfo();
    const defaultDeviceInfo: DeviceInfo & VersionInfo = deleteUndefinedProperty({
        ...versionInfo,
        ...deviceInfo,
    });

    await AsyncStorage.setItem(EUREKA_DEVICE_INFO, JSON.stringify(defaultDeviceInfo));
    return defaultDeviceInfo;
};

export const createAsyncDelay = (duration: number) => {
    return new Promise<void>(resolve => setTimeout(() => resolve(), duration));
};

export const setAppLaunched = async () => {
    return await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
};

export const checkIfFirstLaunch = async () => {
    try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
        if (!hasLaunched) {
            await setAppLaunched();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const reloadApp = () => {
    RNRestart.restart();
};

export const hapticFeedback = () => {
    const hapticOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };
    const hapticTriggerType = Platform.OS === 'android' ? 'impactMedium' : 'impactLight';
    ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
};

export const deleteUndefinedProperty = (query: any) => {
    Object.keys(query).forEach(key => (query[key] === undefined || query[key] === '') && delete query[key]);
    return query;
};

const iOSUrl = 'https://itunes.apple.com/lookup?bundleId=io.lemoncloud.eurekapage';

export const getIOSLatestVersion = (url: string = iOSUrl) => {
    return fetch(url)
        .then(res => res.json())
        .then(info => (info?.resultCount > 0 ? info.results[0].version : null));
};

export const getWebViewInfoJS = (type: WebViewType = 'main') => {
    return `
        (function(window) {
            window.EUREKA_APP_CURRENT_WEBVIEW_TYPE = '${type}';
        })(window);
    `;
};

// Get additional device info for error reporting
export const getExtendedDeviceInfo = async (): Promise<ExtendedDeviceInfo> => {
    const appVersion = (await RNDeviceInfo.getVersion()) || '';
    const buildNumber = (await RNDeviceInfo.getBuildNumber()) || '';
    const bundleId = (await RNDeviceInfo.getBundleId()) || '';
    const uniqueId = (await RNDeviceInfo.getUniqueId()) || '';
    const model = (await RNDeviceInfo.getModel()) || '';
    const brand = (await RNDeviceInfo.getBrand()) || '';
    const systemName = (await RNDeviceInfo.getSystemName()) || '';
    const systemVersion = (await RNDeviceInfo.getSystemVersion()) || '';
    const deviceType = (await RNDeviceInfo.getDeviceType()) || '';

    return {
        appVersion,
        buildNumber,
        bundleId,
        uniqueId,
        model,
        brand,
        systemName,
        systemVersion,
        deviceType,
    };
};

export const getDeviceInfoJS = async (deviceInfoStr: string | null) => {
    if (!deviceInfoStr) {
        return DEFAULT_DEVICE_INFO;
    }

    try {
        const deviceInfo: DeviceInfo & VersionInfo = JSON.parse(deviceInfoStr);
        const {
            platform,
            application,
            stage,
            currentVersion,
            latestVersion,
            shouldUpdate,
            installId,
            deviceToken,
            deviceId,
            userAgent,
        } = deviceInfo;
        const savedDeviceToken = (await AsyncStorage.getItem(EUREKA_DEVICE_TOKEN)) || '';
        const extendedDeviceInfo: ExtendedDeviceInfo = await getExtendedDeviceInfo();

        return `
            (function(window) {
                window.EUREKA_APP_PLATFORM = '${platform}';
                window.EUREKA_APP_APPLICATION = '${application}';
                window.EUREKA_APP_STAGE = '${stage === 'prod' ? 'prod' : 'dev'}';
                window.EUREKA_APP_DEVICE_TOKEN = '${savedDeviceToken || deviceToken || ''}';
                window.EUREKA_APP_DEVICE_ID = '${deviceId || ''}';
                window.EUREKA_APP_CURRENT_VERSION = '${currentVersion}';
                window.EUREKA_APP_LATEST_VERSION = '${latestVersion}';
                window.EUREKA_APP_SHOULD_UPDATE = ${shouldUpdate};
                window.EUREKA_APP_INSTALL_ID = '${installId}';
                window.EUREKA_APP_USER_AGENT = '${userAgent}';
                // App Information
                window.EUREKA_APP_VERSION = '${extendedDeviceInfo.appVersion}';
                window.EUREKA_APP_BUILD_NUMBER = '${extendedDeviceInfo.buildNumber}';
                window.EUREKA_APP_BUNDLE_ID = '${extendedDeviceInfo.bundleId}';
                window.EUREKA_APP_UNIQUE_ID = '${extendedDeviceInfo.uniqueId}';
                window.EUREKA_APP_DEVICE_MODEL = '${extendedDeviceInfo.model}';
                window.EUREKA_APP_DEVICE_BRAND = '${extendedDeviceInfo.brand}';
                window.EUREKA_APP_SYSTEM_NAME = '${extendedDeviceInfo.systemName}';
                window.EUREKA_APP_SYSTEM_VERSION = '${extendedDeviceInfo.systemVersion}';
                window.EUREKA_APP_DEVICE_TYPE = '${extendedDeviceInfo.deviceType}';
            })(window);
        `;
    } catch (e) {
        return DEFAULT_DEVICE_INFO;
    }
};

export const setDataToLocalStorageJS = (data: { [key: string]: string }): string => {
    const isNotObject = !(typeof data === 'object' && data !== null);
    if (isNotObject) {
        return '';
    }

    const hasNull = Object.values(data).some(value => !value);
    if (isEmptyObject(data) || hasNull) {
        return '';
    }

    const setLocalStorageString = Object.entries(data)
        .filter(([key, value]) => !!key && !!value)
        .map(([key, value]) => `window.localStorage.setItem('${key}', '${value}');`)
        .join('');

    return `(function(window) { ${setLocalStorageString} })(window);`;
};

export const compareVersion = (v1: string, v2: string) => {
    // 0: version strings are equal
    // 1: version v1 is greater than v2
    // -1: version v2 is greater than v1
    return v1.localeCompare(v2, undefined, { numeric: true, sensitivity: 'base' });
};

export const sendMessageToWebView = (message: AppMessage) => {
    if (!global['eurekaWebViewRef']) {
        console.log("global['eurekaWebViewRef'] not exist!. AppMessage: ", JSON.stringify(message));
        return;
    }
    const messageStr = JSON.stringify(message);
    global['eurekaWebViewRef'].postMessage(messageStr);
};

export const injectScriptToEurekaWeb = (jsCode: string) => {
    if (!global['eurekaWebViewRef']) {
        console.log("global['eurekaWebViewRef'] not exist!. injectScript: ", jsCode);
        return;
    }
    if (!jsCode) {
        return;
    }
    global['eurekaWebViewRef'].injectJavaScript(jsCode);
};

export const readPushNotification = (pushId: string) => {
    if (!pushId) {
        return;
    }
    const data: ReadPushNotification = { pushId };
    const message: AppMessage = { type: 'ReadPushNotification', data };
    sendMessageToWebView(message);
};

export const redirectWebView = (redirectUrl: string, extra: any = '') => {
    if (!redirectUrl) {
        return;
    }
    const isValidHTTPUrl = (redirectUrl: string) => {
        return /^(?:\w+:)?\/\/[^\s/$.?#].[^\s]*$/i.test(redirectUrl);
    };

    let url = redirectUrl;
    if (!isValidHTTPUrl(redirectUrl)) {
        url = `${BASE_URL}${redirectUrl}`;
    }
    const data: NavigateToUrl = { url, extra };
    const message: AppMessage = { type: 'NavigateToUrl', data };
    sendMessageToWebView(message);
};

// 1. save redirect url to storage
// 2. after loading end, get url and redirect
// NOTE: onLoadEnd() on EurekaPageWebviewScreen
export const setRedirectUrl = async (url: string, extra: any = '') => {
    if (!url) {
        return;
    }
    await AsyncStorage.setItem(REDIRECT_URL, url);
    if (extra) {
        await AsyncStorage.setItem(REDIRECT_URL_EXTRA_DATA, extra);
    }
    return;
};

export const sendLocalNotification = (notification: any, title?: string, message?: string) => {
    const notiTitle =
        title || notification.data?.title || notification.notification?.title || i18n.t('notification.title');
    const notiMessage =
        message ||
        notification.data?.message ||
        notification.notification?.body ||
        notification.data?.body ||
        i18n.t('notification.new');
    try {
        const data = JSON.stringify(notification.data || {});
        PushNotification.localNotification({
            channelId: 'io.lemoncloud.eurekapage.channel',
            vibrate: true,
            allowWhileIdle: true,
            title: notiTitle,
            message: notiMessage,
            data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const toastNotification = (
    title = i18n.t('notification.title'),
    text = i18n.t('notification.new'),
    onPress?: () => void
) => {
    showToast(title, text, 'eureka', onPress);
};

export const toastWarning = (title = i18n.t('toast.warning'), text = '', onPress?: () => void) => {
    showToast(title, text, 'warning', onPress);
};

export const showToast = (
    title = i18n.t('notification.title'),
    text = '',
    type: ToastType = 'eureka',
    onPress?: () => void
) => {
    Toast.show({
        text1: title,
        text2: text,
        type,
        onPress,
        visibilityTime: 2000,
    });
};

export const hideToast = () => {
    Toast.hide();
};

export const clearAsyncStorage = (keepItems: string[] = []) => {
    return AsyncStorage.getAllKeys()
        .then(allKeys => allKeys.filter(key => !keepItems.includes(key)))
        .then(keys => AsyncStorage.multiRemove(keys));
};

export const isEmptyObject = obj =>
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;

export const clearDeviceIdFromDeviceInfo = async () => {
    const deviceInfoStr = await AsyncStorage.getItem(EUREKA_DEVICE_INFO);
    if (!deviceInfoStr) {
        return;
    }
    const deviceInfo: DeviceInfo & VersionInfo = JSON.parse(deviceInfoStr);
    const defaultDeviceInfo: DeviceInfo & VersionInfo = deleteUndefinedProperty({ ...deviceInfo, deviceId: '' });
    await AsyncStorage.setItem(EUREKA_DEVICE_INFO, JSON.stringify(defaultDeviceInfo));
    return;
};

export const openShare = async (title: string, subject: string, dynamicLink: string) => {
    const options = { title, subject, message: dynamicLink };
    return Share.open(options);
};

export const buildShareLink = async (dynamicLinkParams: DynamicLinkParams) => {
    return await dynamicLinks().buildShortLink(dynamicLinkParams as any, 'SHORT' as any);
};

/**
 * Converts 'expires_in' seconds to an ISO 8601 formatted date string
 * @param expiresIn The number of seconds until the token expires
 * @returns An ISO 8601 formatted date string
 */
export const convertExpiresInToISOString = (expiresIn: number): string => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    return expirationDate.toISOString();
};

/**
 * Converts 'expires_in' seconds to an ISO 8601 formatted date string in Korean Standard Time (KST)
 * @param expiresIn The number of seconds until the token expires
 * @returns An ISO 8601 formatted date string in KST
 */
export const convertExpiresInToKSTString = (expiresIn: number): string => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    const kstExpirationDate = new Date(expirationDate.getTime() + 9 * 60 * 60 * 1000);
    return kstExpirationDate.toISOString().replace('Z', '+09:00');
};

export const decodeJWT = (token: string): any => {
    return token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
};
