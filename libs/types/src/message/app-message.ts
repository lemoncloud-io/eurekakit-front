/**
 * App Message:
 * message from App to Web
 */
import type { DeviceInfo, ExtendedDeviceInfo, OAuthLoginFailResult, OAuthTokenResult, VersionInfo } from '../common';
import type { SpaceSDKError, UserStatus } from '../space';
import type { ImagePickerPageInfo, SyncWebStorage } from './web-message';

const APP_MESSAGE_TYPE = {
    NavigateToUrl: 'NavigateToUrl',
    ReadPushNotification: 'ReadPushNotification',
    SuccessToSyncDeviceInfo: 'SuccessToSyncDeviceInfo',
    SuccessToSyncWebStorage: 'SuccessToSyncWebStorage',
    SuccessToGetImages: 'SuccessToGetImages',
    FailToGetImages: 'FailToGetImages',
    DismissWebModal: 'DismissWebModal',
    SuccessToSaveImage: 'SuccessToSaveImage',
    FailToSaveImage: 'FailToSaveImage',
    GoBack: 'GoBack',
    SuccessToGetVerifyNativeToken: 'SuccessToGetVerifyNativeToken',
    FailToGetVerifyNativeToken: 'FailToGetVerifyNativeToken',
    MocaSDKLog: 'MocaSDKLog',
    MocaErrorLog: 'MocaErrorLog',
    MocaUserStatusChangedLog: 'MocaUserStatusChangedLog',
    SuccessToChangeLanguage: 'SuccessToChangeLanguage',
    SuccessToGetCurrentLanguage: 'SuccessToGetCurrentLanguage',
    UpdateMocaRole: 'UpdateMocaRole',
} as const;
export type AppMessageType = (typeof APP_MESSAGE_TYPE)[keyof typeof APP_MESSAGE_TYPE];

interface DefaultMessage<T extends AppMessageType> {
    type: T;
}

export interface AppImageInfo {
    localIdentifier?: string;
    creationDate?: string;
    cropRect?: {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    data?: string; // base64 data
    filename?: string;
    width: number;
    height: number;
    mime: string;
    size: number;
}

export interface SuccessOrFailToGetImages {
    images: AppImageInfo[];
    pageInfo: ImagePickerPageInfo;
}

export interface ReadPushNotification {
    pushId: string;
}

export interface NavigateToUrl {
    url: string;
    extra?: any;
}

export interface UpdateMocaRoleFlag {
    messageData: string;
}

export interface NavigateToUrlData<T extends 'NavigateToUrl'> extends DefaultMessage<T> {
    data: NavigateToUrl;
}

export interface ReadPushNotificationData<T extends 'ReadPushNotification'> extends DefaultMessage<T> {
    data: ReadPushNotification;
}

export interface SuccessToSyncDeviceInfoData<T extends 'SuccessToSyncDeviceInfo'> extends DefaultMessage<T> {
    data: DeviceInfo & VersionInfo & ExtendedDeviceInfo;
}

export interface SuccessToSyncWebStorageData<T extends 'SuccessToSyncWebStorage'> extends DefaultMessage<T> {
    data: SyncWebStorage;
}

export interface SuccessOrFailToGetImagesData<T extends 'SuccessToGetImages' | 'FailToGetImages'>
    extends DefaultMessage<T> {
    data: SuccessOrFailToGetImages;
}

export interface SuccessOrFailToSaveImageUrlData<T extends 'SuccessToSaveImage' | 'FailToSaveImage'>
    extends DefaultMessage<T> {
    data: { imageUrl: string };
}

export interface NullData<T extends 'DismissWebModal' | 'GoBack'> extends DefaultMessage<T> {
    data: null;
}

export interface SuccessToGetVerifyNativeTokenData<T extends 'SuccessToGetVerifyNativeToken'>
    extends DefaultMessage<T> {
    data: OAuthTokenResult;
}

export interface FailToGetVerifyNativeTokenData<T extends 'FailToGetVerifyNativeToken'> extends DefaultMessage<T> {
    data: OAuthLoginFailResult;
}

export interface MocaSDKLogData<T extends 'MocaSDKLog'> extends DefaultMessage<T> {
    data: {
        logType: string;
        msg?: string;
    };
}

export interface MocaErrorLogData<T extends 'MocaErrorLog'> extends DefaultMessage<T> {
    data: {
        errorCode: SpaceSDKError | string;
        msg?: string;
    };
}

export interface MocaUserStatusChangedLogData<T extends 'MocaUserStatusChangedLog'> extends DefaultMessage<T> {
    data: {
        msg?: string;
        status: UserStatus | string;
        userID?: number;
    };
}

export interface AppLanguageMessageData<T extends 'SuccessToChangeLanguage' | 'SuccessToGetCurrentLanguage'>
    extends DefaultMessage<T> {
    data: {
        language?: string;
    };
}

export interface UpdateMocaRoleData<T extends 'UpdateMocaRole'> extends DefaultMessage<T> {
    data: UpdateMocaRoleFlag;
}

// prettier-ignore
export type AppMessageData<T extends AppMessageType>
    = T extends 'NavigateToUrl' ? NavigateToUrlData<T>
    : T extends 'ReadPushNotification' ? ReadPushNotificationData<T>
    : T extends 'SuccessToSyncDeviceInfo' ? SuccessToSyncDeviceInfoData<T>
    : T extends 'SuccessToSyncWebStorage' ? SuccessToSyncWebStorageData<T>
    : T extends 'SuccessToGetImages' ? SuccessOrFailToGetImagesData<T>
    : T extends 'FailToGetImages' ? SuccessOrFailToGetImagesData<T>
    : T extends 'SuccessToSaveImage' ? SuccessOrFailToSaveImageUrlData<T>
    : T extends 'FailToSaveImage' ? SuccessOrFailToSaveImageUrlData<T>
    : T extends 'DismissWebModal' ? NullData<T>
    : T extends 'GoBack' ? NullData<T>
    : T extends 'SuccessToGetVerifyNativeToken' ? SuccessToGetVerifyNativeTokenData<T>
    : T extends 'FailToGetVerifyNativeToken' ? FailToGetVerifyNativeTokenData<T>
    : T extends 'MocaErrorLog' ? MocaErrorLogData<T>
    : T extends 'MocaSDKLog' ? MocaSDKLogData<T>
    : T extends 'MocaUserStatusChangedLog' ? MocaUserStatusChangedLogData<T>
    : T extends 'SuccessToChangeLanguage' ? AppLanguageMessageData<T>
    : T extends 'SuccessToGetCurrentLanguage' ? AppLanguageMessageData<T>
    : T extends 'UpdateMocaRole' ? UpdateMocaRoleData<T>
    : DefaultMessage<T>;

// from ReactNative to WebView
export type AppMessage = AppMessageData<AppMessageType>;
