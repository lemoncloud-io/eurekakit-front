import { useCallback, useMemo } from 'react';

import type { DeviceInfo, ExtendedDeviceInfo, SupportVersionMap, VersionInfo, WebViewType } from '@lemon/types';

const EUREKA_ANDROID_AGENT = 'EUREKA_ANDROID';
const EUREKA_IOS_AGENT = 'EUREKA_IOS';

export const useAppChecker = () => {
    const syncDeviceAndVersionInfo = useCallback(() => {
        const platform = (window['EUREKA_APP_PLATFORM'] as DeviceInfo['platform']) || 'android';
        const application = window['EUREKA_APP_APPLICATION'];
        const stage = window['EUREKA_APP_STAGE'];
        const deviceToken = window['EUREKA_APP_DEVICE_TOKEN'];
        const deviceId = window['EUREKA_APP_DEVICE_ID'];
        const installId = window['EUREKA_APP_INSTALL_ID'];
        const currentVersion = window['EUREKA_APP_CURRENT_VERSION'] || '0.0.0';
        const latestVersion = window['EUREKA_APP_LATEST_VERSION'] || '0.0.0';
        const shouldUpdate = window['EUREKA_APP_SHOULD_UPDATE'] || false;
        const userAgent = window['EUREKA_APP_USER_AGENT'] || window.navigator.userAgent;
        const webViewType = window['EUREKA_APP_CURRENT_WEBVIEW_TYPE'] as WebViewType;

        const deviceInfo: DeviceInfo = {
            stage,
            application,
            deviceId,
            deviceToken,
            platform,
            userAgent,
            installId,
        };

        const versionInfo: VersionInfo = {
            currentVersion,
            latestVersion,
            shouldUpdate,
        };

        const extendedInfo: ExtendedDeviceInfo = {
            appVersion: window['EUREKA_APP_VERSION'] || '',
            buildNumber: window['EUREKA_APP_BUILD_NUMBER'] || '',
            bundleId: window['EUREKA_APP_BUNDLE_ID'] || '',
            uniqueId: window['EUREKA_APP_UNIQUE_ID'] || '',
            model: window['EUREKA_APP_DEVICE_MODEL'] || '',
            brand: window['EUREKA_APP_DEVICE_BRAND'] || '',
            systemName: window['EUREKA_APP_SYSTEM_NAME'] || '',
            systemVersion: window['EUREKA_APP_SYSTEM_VERSION'] || '',
            deviceType: window['EUREKA_APP_DEVICE_TYPE'] || '',
        };

        return {
            deviceInfo,
            versionInfo,
            extendedInfo,
            webViewType,
        };
    }, []);

    const info = useMemo(() => syncDeviceAndVersionInfo(), [syncDeviceAndVersionInfo]);

    const compareVersion = (v1: string, v2: string) => {
        return v1.localeCompare(v2, undefined, { numeric: true, sensitivity: 'base' });
    };

    const isFeatureAvailable = (supportVersionMap: SupportVersionMap) => {
        const version = info.versionInfo.currentVersion?.split(' ')[0] || '';
        const supportVersion = supportVersionMap[info.deviceInfo.platform] || '';

        if (!supportVersion || !version || !info.versionInfo.currentVersion) {
            return false;
        }

        return compareVersion(version, supportVersion) >= 0;
    };

    const isEurekaAndroidApp = info.deviceInfo.userAgent?.includes(EUREKA_ANDROID_AGENT) || false;
    const isEurekaIosApp = info.deviceInfo.userAgent?.includes(EUREKA_IOS_AGENT) || false;
    const isOnMobileApp = isEurekaAndroidApp || isEurekaIosApp;

    const isOnMainView = isOnMobileApp && info.webViewType === 'main';
    const isOnModalView = isOnMobileApp && info.webViewType === 'modal';

    return {
        deviceInfo: info.deviceInfo,
        versionInfo: info.versionInfo,
        extendedDeviceInfo: info.extendedInfo,
        webViewType: info.webViewType,
        isOnMobileApp,
        isEurekaAndroidApp,
        isEurekaIosApp,
        isOnMainView,
        isOnModalView,
        isFeatureAvailable,
    };
};
