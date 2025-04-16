import { Platform } from 'react-native';

import { login as kakaoLogin, logout as kakaoLogout } from '@react-native-seoul/kakao-login';

import type { LemonLoginProvider } from '../LoginService';
import type { OAuthTokenResult } from '@lemon/types';
import type { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

export class KakaoLoginClient implements LemonLoginProvider {
    public async getLemonToken(): Promise<OAuthTokenResult | null> {
        const kakaoOAuthToken: KakaoOAuthToken = await kakaoLogin();
        const token: OAuthTokenResult = KakaoLoginClient.createLemonToken(kakaoOAuthToken);
        if (!token) {
            console.log('kakao login error');
            return null;
        }
        return token;
    }

    public async logout() {
        return await kakaoLogout();
    }

    private static createLemonToken(kakaoToken: KakaoOAuthToken): OAuthTokenResult {
        const { accessToken, accessTokenExpiresAt, refreshToken } = kakaoToken;
        const accessTokenExpiredAt = (new Date(accessTokenExpiresAt).getTime() / 1000).toFixed(0);
        return {
            provider: 'kakao',
            platform: Platform.OS,
            accessToken,
            refreshToken,
            accessTokenExpiredAt,
            rawData: JSON.stringify(kakaoToken),
        };
    }
}
