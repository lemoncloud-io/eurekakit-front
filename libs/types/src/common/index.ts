export type Platform = 'ios' | 'android' | 'windows' | 'macos' | 'web';
export type LoginProvider = 'naver' | 'kakao' | 'google' | 'apple';
export type Env = 'local' | 'stage' | 'prod' | 'dev';
export type WebViewType = 'main' | 'modal';

// TODO: define type
export type UserProfileView = any;

export interface RegisterAppInfo extends DeviceInfo {
    domain: string;
    version: string;
    latestVersion?: string;
}

export interface VersionInfo {
    currentVersion: string;
    latestVersion: string;
    shouldUpdate: boolean;
}

export interface DeviceInfo {
    stage: Env;
    platform: Platform;
    application: string;
    deviceToken?: string;
    deviceId?: string | null;
    installId?: string;
    userAgent?: string;
}

export interface ExtendedDeviceInfo {
    // App Information
    appVersion?: string;
    buildNumber?: string;
    bundleId?: string;
    uniqueId?: string;
    // Device Information
    model?: string;
    brand?: string;
    systemName?: string;
    systemVersion?: string;
    deviceType?: string;
}

export interface TokenInfo {
    os: Platform;
    token: string;
}

export interface PhoneAuthorizeResponse {
    accountId: string;
    agreedAt: string;
    authId: string;
    expiredAt: string;
}

// Naver, Kakao, Google, Apple SDK 로그인 시 (ios, android)
export interface OAuthTokenResult extends AppleTokenResult {
    provider: string;
    platform: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiredAt?: string;
    accessTokenExpiresIn?: string;
    rawData?: string;
    idToken?: string;
}

export interface OAuthLoginFailResult {
    provider: LoginProvider;
    platform: string;
}

export interface AppleTokenResult {
    identityToken?: string;
    nonce?: string;
    user?: string;
    application?: string;
    clientId?: string;
}

export interface LcMenuAxisItemPosition {
    axisAnglePosition: number;
    htmlAnglePosition: number;
    key: number;
}

export interface MultiCategory {
    icon: string;
    index: number;
    label: string;
    route: string;
    subCategories?: MultiCategory[] | null;
    subcategoryIndex: number | null;
}

// TODO: define profile
export type UserProfile = any;

export interface LemonCredentials {
    AccessKeyId: string;
    SecretKey: string;
    Expiration: string;
    SessionToken?: string;
}

export interface LemonOAuthTokenResult {
    accountId: string;
    authId: string;
    credential: LemonCredentials;
    identityId: string;
    identityPoolId: string;
    identityToken: string;
    error?: any;
    accessToken?: string;
}

export interface RegisterDeviceResponse {
    Application: {
        application: string;
        id: string;
        name: string;
        ns: string;
        platform: string;
        stage: string;
        type: string;
        _id: string;
        createdAt: number;
        updatedAt?: number;
        deletedAt?: number;
    };
    Applications?: string;
    Device: {
        ios?: number; // 0 or 1
        android?: number;
        application: string;
        applicationId?: string;
        id?: string;
        ns: string;
        platform: string;
        stage: string;
        type: string;
        _id: string;
        createdAt: number;
        updatedAt?: number;
        deletedAt?: number;
    };
    Token: LemonOAuthTokenResult;
    deviceId: string;
}
