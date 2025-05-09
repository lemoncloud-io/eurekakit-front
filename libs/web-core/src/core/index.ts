import { WebCoreFactory } from '@lemoncloud/lemon-web-core';

declare global {
    interface Window {
        ENV?: string;
        PROJECT?: string;
        REGION?: string;
        OAUTH_ENDPOINT?: string;
        HOST?: string;
        SOCIAL_OAUTH_ENDPOINT?: string;
        IMAGE_API_ENDPOINT?: string;
        PET_API_ENDPOINT?: string;
        KAKAO_CALLBACK_URL?: string;
    }
}

// get ENV from index.html
export const ENV = (window.ENV || import.meta.env.VITE_ENV || '').toLowerCase();
export const PROJECT = (window.PROJECT || import.meta.env.VITE_PROJECT || '').toLowerCase();
export const REGION = (window.REGION || import.meta.env.VITE_REGION || 'ap-northeast-2').toLowerCase();
export const OAUTH_ENDPOINT = (window.OAUTH_ENDPOINT || import.meta.env.VITE_OAUTH_ENDPOINT || '').toLowerCase();

export const HOST = (window.HOST || import.meta.env.VITE_HOST || '').toLowerCase();
export const SOCIAL_OAUTH_ENDPOINT = (
    window.SOCIAL_OAUTH_ENDPOINT ||
    import.meta.env.VITE_SOCIAL_OAUTH_ENDPOINT ||
    ''
).toLowerCase();
export const IMAGE_API_ENDPOINT = (
    window.IMAGE_API_ENDPOINT ||
    import.meta.env.VITE_IMAGE_API_ENDPOINT ||
    ''
).toLowerCase();
export const PET_API_ENDPOINT = (window.PET_API_ENDPOINT || import.meta.env.VITE_PET_API_ENDPOINT || '').toLowerCase();
export const KAKAO_CALLBACK_URL = (
    window.KAKAO_CALLBACK_URL ||
    import.meta.env.VITE_KAKAO_CALLBACK_URL ||
    ''
).toLowerCase();

export const webCore = WebCoreFactory.create({
    cloud: 'aws',
    project: `${PROJECT}_${ENV}`,
    oAuthEndpoint: OAUTH_ENDPOINT,
    region: REGION,
});
