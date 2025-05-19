import type { LemonOAuthTokenResult, LoginProvider, UserProfileView } from '../common';

/**
 * Web Message:
 * message from Web to App
 */
const WEB_MESSAGE_TYPE = {
    SetCanGoBack: 'SetCanGoBack',
    LoginWithSDK: 'LoginWithSDK',
    NavigationStateChange: 'NavigationStateChange',
    AutoSyncLocalStorage: 'AutoSyncLocalStorage',
    ReloadApp: 'ReloadApp',
    SetShowSpinner: 'SetShowSpinner',
    SyncWebStorage: 'SyncWebStorage',
    TriggerHaptic: 'TriggerHaptic',
    LogoutApp: 'LogoutApp',
    RequestSyncDeviceInfo: 'RequestSyncDeviceInfo',
    OpenImageCropPicker: 'OpenImageCropPicker',
    OpenImagePickerCamera: 'OpenImagePickerCamera',
    CleanImageCropPicker: 'CleanImageCropPicker',
    OpenLink: 'OpenLink',
    OpenModalWebView: 'OpenModalWebView',
    SetIsOpenWebModal: 'SetIsOpenWebModal',
    SaveImageByUrl: 'SaveImageByUrl',
    OpenShare: 'OpenShare',
    OpenSettings: 'OpenSettings',
    SetBaseUrl: 'SetBaseUrl',
    SetMocaUser: 'SetMocaUser',
    ForceMocaLogin: 'ForceMocaLogin',
    SetMocaSDK: 'SetMocaSDK',
    SetMocaBackgroundMode: 'SetMocaBackgroundMode',
    SetCurrentUserInfo: 'SetCurrentUserInfo',
    SetUpdatedMocaFlag: 'SetUpdatedMocaFlag',
    ChangeLanguage: 'ChangeLanguage',
    GetCurrentLanguage: 'GetCurrentLanguage',
} as const;
export type WebMessageType = (typeof WEB_MESSAGE_TYPE)[keyof typeof WEB_MESSAGE_TYPE];

export type ToastType = 'eureka' | 'warning' | 'success';

export interface DynamicLinkParams {
    link?: string;
    domainUriPrefix?: string;
    android?: {
        packageName: string;
        fallbackUrl?: string;
    };
    ios?: {
        bundleId: string;
        fallbackUrl?: string;
    };
    social?: {
        title: string;
        descriptionText?: string;
        imageUrl?: string;
    };
}

export interface ImagePickerInfo {
    options: ImagePickerOptions;
    pageInfo: ImagePickerPageInfo;
}

export interface ImagePickerOptions {
    cropping?: boolean;
    width?: number;
    height?: number;
    multiple?: boolean;
    includeBase64?: boolean;
    includeExif?: boolean;
    minFiles?: number;
    maxFiles?: number;
    useFrontCamera?: boolean;
    compressVideoPreset?: string;
    loadingLabelText?: string;
    mediaType?: string; // 'photo', 'video', or 'any'
    forceJpg?: boolean;
}

export interface ImagePickerPageInfo {
    currentPath: string;
    imageType?: string;
}

export interface SyncWebStorage {
    [key: string]: string;
}

export interface OpenSettingsData<T extends 'OpenSettings'> extends DefaultMessage<T> {
    data?: { type?: 'default' | 'root' };
}

export interface SaveImageByUrlData<T extends 'SaveImageByUrl'> extends DefaultMessage<T> {
    data: { imageUrl: string };
}

interface DefaultMessage<T extends WebMessageType> {
    type: T;
}

export interface SyncWebStorageData<T extends 'SyncWebStorage'> extends DefaultMessage<T> {
    data: SyncWebStorage;
    syncType: 'credentials' | 'default';
}

export interface SetShowSpinnerData<T extends 'SetShowSpinner'> extends DefaultMessage<T> {
    data: {
        showSpinner: boolean;
        type?: 'default' | 'white';
    };
}

export interface LogoutAppData<T extends 'LogoutApp'> extends DefaultMessage<T> {
    data: { keepStorageKeys: string[]; shouldReload: boolean };
}

export interface ImagePickerData<T extends 'OpenImageCropPicker' | 'OpenImagePickerCamera'> extends DefaultMessage<T> {
    data: ImagePickerInfo;
}

export interface SetCanGoBackData<T extends 'SetCanGoBack'> extends DefaultMessage<T> {
    data: { canGoBack: boolean };
}

export interface OpenLinkData<T extends 'OpenLink'> extends DefaultMessage<T> {
    data: { url: string; supportedUrl?: string };
}

export interface OpenModalWebViewData<T extends 'OpenModalWebView'> extends DefaultMessage<T> {
    data: { webViewUrl: string; modalTitle: string };
}

export interface SetIsOpenWebModalData<T extends 'SetIsOpenWebModal'> extends DefaultMessage<T> {
    data: { isOpenedWebModal: boolean };
}

// NOTE: SLP Plus dynamic link: https://slpplus.page.link/
/* please refer below for dynamicLinkParams
    const link = `https://slpplus.page.link/my-page`;
    const dynamicLinkParams = {
        link,
        domainUriPrefix: 'https://slpplus.page.link',
        android: {
            packageName: 'com.ssocioliving.slp',
            fallbackUrl: link,
        },
        ios: {
            bundleId: 'com.ssocioliving.slp',
            fallbackUrl: link,
        },
        social: {
            title: 'SLP Plus',
            descriptionText: '아파트 생활을 보다 더 편리하게',
            // TODO: update default image
            imageUrl: 'https://eureka.deals/assets/imgs/intro01.png',
        },
    }
*/
export interface OpenShareData<T extends 'OpenShare'> extends DefaultMessage<T> {
    data: { title: string; subject: string; dynamicLinkParams: DynamicLinkParams };
}

export interface LoginWithSDKData<T extends 'LoginWithSDK'> extends DefaultMessage<T> {
    data: {
        provider: LoginProvider;
    };
}

export interface SetBaseUrlData<T extends 'SetBaseUrl'> extends DefaultMessage<T> {
    data: {
        url: string;
    };
}

export interface MocaUserData {
    userId: number;
    siteId: number;
    token: string;
    isDev?: boolean;
}

export interface SetMocaUserData<T extends 'SetMocaUser'> extends DefaultMessage<T> {
    data: MocaUserData;
}

export interface SetMocaSDKData<T extends 'SetMocaSDK'> extends DefaultMessage<T> {
    data: {
        status: 'start' | 'stop';
    };
}

export interface SetCurrentUserInfoData<T extends 'SetCurrentUserInfo'> extends DefaultMessage<T> {
    data: {
        profile: UserProfileView;
        lemonOAuthToken: LemonOAuthTokenResult;
    };
}

export interface SetMocaBackgroundModeData<T extends 'SetMocaBackgroundMode'> extends DefaultMessage<T> {
    data: {
        backgroundEnabled: true | false;
    };
}

export interface AutoSyncLocalStorageData<T extends 'AutoSyncLocalStorage'> extends DefaultMessage<T> {
    data: {
        operation: 'set' | 'remove' | 'clear';
        key?: string;
        value?: string;
    };
}

export interface LanguageMessageData<T extends 'ChangeLanguage' | 'GetCurrentLanguage'> extends DefaultMessage<T> {
    data: {
        language?: string;
    };
}

export interface SetUpdatedMocaFlagData<T extends 'SetUpdatedMocaFlag'> extends DefaultMessage<T> {
    data: {
        updatedMocaFlag: string;
    };
}

// prettier-ignore
export type WebMessageData<T extends WebMessageType>
    = T extends 'SyncWebStorage' ? SyncWebStorageData<T>
    : T extends 'SetShowSpinner' ? SetShowSpinnerData<T>
    : T extends 'LogoutApp' ? LogoutAppData<T>
    : T extends 'OpenImageCropPicker' ? ImagePickerData<T>
    : T extends 'OpenImagePickerCamera' ? ImagePickerData<T>
    : T extends 'SetCanGoBack' ? SetCanGoBackData<T>
    : T extends 'OpenLink' ? OpenLinkData<T>
    : T extends 'OpenModalWebView' ? OpenModalWebViewData<T>
    : T extends 'SetIsOpenWebModal' ? SetIsOpenWebModalData<T>
    : T extends 'SaveImageByUrl' ? SaveImageByUrlData<T>
    : T extends 'OpenShare' ? OpenShareData<T>
    : T extends 'OpenSettings' ? OpenSettingsData<T>
    : T extends 'LoginWithSDK' ? LoginWithSDKData<T>
    : T extends 'SetBaseUrl' ? SetBaseUrlData<T>
    : T extends 'SetMocaUser' ? SetMocaUserData<T>
    : T extends 'SetMocaSDK' ? SetMocaSDKData<T>
    : T extends 'SetMocaBackgroundMode' ? SetMocaBackgroundModeData<T>
    : T extends 'SetCurrentUserInfo' ? SetCurrentUserInfoData<T>
    : T extends 'AutoSyncLocalStorage' ? AutoSyncLocalStorageData<T>
    : T extends 'SetUpdatedMocaFlag' ? SetUpdatedMocaFlagData<T>
    : T extends 'ChangeLanguage' ? LanguageMessageData<T>
    : T extends 'GetCurrentLanguage' ? LanguageMessageData<T>
    : DefaultMessage<T>;

// from WebView to ReactNative
export type WebMessage = WebMessageData<WebMessageType>;
