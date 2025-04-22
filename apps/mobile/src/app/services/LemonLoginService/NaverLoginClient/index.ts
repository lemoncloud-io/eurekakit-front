import { Platform } from 'react-native';

import NaverLogin from '@react-native-seoul/naver-login';

import { NAVER } from '../../../../envs/secret.json';

import type { LemonLoginProvider } from '../LoginService';
import type { OAuthTokenResult } from '@lemon/types';
import type { NaverLoginInitParams, NaverLoginResponse } from '@react-native-seoul/naver-login';

const NAVER_PARAMS: NaverLoginInitParams = {
    appName: 'EurekaKit',
    consumerKey: NAVER.consumerKey,
    consumerSecret: NAVER.consumerSecret,
    serviceUrlSchemeIOS: NAVER.serviceUrlSchemeIOS,
    disableNaverAppAuthIOS: true,
};

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresAtUnixSecondString: string;
    tokenType: string;
}

export class NaverLoginClient implements LemonLoginProvider {
    getLemonToken = async (): Promise<OAuthTokenResult | null> => {
        await NaverLogin.logout();
        const { failureResponse, successResponse } = await this.naverLogin();
        if (failureResponse) {
            console.error('Naver login error: ', failureResponse.message);
            return null;
        }
        return NaverLoginClient.createLemonToken(successResponse as TokenResponse);
    };

    logout = async () => {
        return await NaverLogin.logout();
    };

    private naverLogin = async (): Promise<NaverLoginResponse> => {
        NaverLogin.initialize(NAVER_PARAMS);
        return await NaverLogin.login();
    };

    private static createLemonToken(naverToken: TokenResponse): OAuthTokenResult {
        const { accessToken, refreshToken, tokenType, expiresAtUnixSecondString: accessTokenExpiredAt } = naverToken;
        return {
            provider: 'naver',
            platform: Platform.OS,
            accessToken,
            refreshToken,
            accessTokenExpiredAt,
            rawData: JSON.stringify(naverToken),
        };
    }
}
