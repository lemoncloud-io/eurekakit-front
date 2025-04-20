import { useCallback, useEffect } from 'react';

interface KakaoOAuthToken {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}

interface OAuthTokenResult {
    provider: string;
    platform: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: string;
    rawData: string;
}

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

export const useKakaoAuth = () => {
    const KAKAO_JS_KEY: string = import.meta.env.VITE_KAKAO_JS_KEY || '';
    const REDIRECT_URI: string = import.meta.env.VITE_KAKAO_CALLBACK_URL || '';

    const loadKakaoSDK = useCallback(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.onload = () => {
            window.Kakao.init(KAKAO_JS_KEY);
        };
        document.head.appendChild(script);
    }, [KAKAO_JS_KEY]);

    useEffect(() => {
        loadKakaoSDK();
    }, [loadKakaoSDK]);

    const getKakaoAuthUrl = useCallback(() => {
        const params = new URLSearchParams({
            client_id: KAKAO_JS_KEY,
            redirect_uri: REDIRECT_URI,
            response_type: 'code',
        });
        return `${KAKAO_AUTH_URL}?${params.toString()}`;
    }, [KAKAO_JS_KEY, REDIRECT_URI]);

    const getTokenFromCode = useCallback(
        async (code: string): Promise<KakaoOAuthToken> => {
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: KAKAO_JS_KEY,
                redirect_uri: REDIRECT_URI,
                code: code,
            });

            const response = await fetch(KAKAO_TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            return response.json();
        },
        [KAKAO_JS_KEY, REDIRECT_URI]
    );

    const createLemonToken = useCallback((kakaoToken: KakaoOAuthToken): OAuthTokenResult => {
        const { access_token, expires_in, refresh_token } = kakaoToken;
        const accessTokenExpiredAt = `${Date.now() + expires_in * 1000}`;
        return {
            provider: 'kakao',
            platform: 'web',
            accessToken: access_token,
            refreshToken: refresh_token,
            accessTokenExpiredAt,
            rawData: JSON.stringify(kakaoToken),
        };
    }, []);

    return {
        getKakaoAuthUrl,
        getTokenFromCode,
        createLemonToken,
    };
};
