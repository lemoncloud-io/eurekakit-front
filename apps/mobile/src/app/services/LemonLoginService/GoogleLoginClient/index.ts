import { Platform } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GOOGLE } from '../../../../envs/secret.json';
import { convertExpiresInToKSTString } from '../../../utils';

import type { LemonLoginProvider } from '../LoginService';
import type { OAuthTokenResult } from '@lemon/types';
import type { User } from '@react-native-google-signin/google-signin/src/types';

// EurekaKit => 웹 클라이언트 1
const GOOGLE_KEYS = {
    clientId: GOOGLE.webClientId,
    clientSecret: GOOGLE.clientSecret,
};

export interface GoogleUserInfo {
    idToken: string;
    accessToken?: string;
    serverAuthCode: string;
    scopes: string[];
    user: {
        email?: string;
        id?: string;
        name?: string;
    };
}

export interface GoogleTokenInfo {
    access_token: string;
    expires_in: string;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

GoogleSignin.configure({
    webClientId: GOOGLE.webClientId,
    iosClientId: GOOGLE.iosClientId,
    offlineAccess: true,
});

export class GoogleLoginClient implements LemonLoginProvider {
    public async getLemonToken(): Promise<OAuthTokenResult | null> {
        try {
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
            const tokenInfo = await GoogleLoginClient.getGoogleAccessToken(userInfo as GoogleUserInfo);
            return GoogleLoginClient.createLemonToken(tokenInfo, userInfo);
        } catch (err) {
            console.log('google login error: ', err);
            return null;
        }
    }

    public logout() {
        return GoogleSignin.signOut();
    }

    private static getGoogleAccessToken(userInfo: GoogleUserInfo): Promise<GoogleTokenInfo> {
        const { serverAuthCode, idToken, accessToken } = userInfo;
        return fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: GOOGLE_KEYS.clientId,
                client_secret: GOOGLE_KEYS.clientSecret,
                redirect_uri: '',
                code: serverAuthCode,
                id_token: idToken || accessToken,
            }),
        }).then(res => res.json());
    }

    private static createLemonToken(googleToken: GoogleTokenInfo, userInfo: User): OAuthTokenResult {
        const { access_token: accessToken, refresh_token: refreshToken, expires_in } = googleToken;
        const accessTokenExpiredAt = convertExpiresInToKSTString(Number(expires_in)); // TODO: check response
        return {
            provider: 'google',
            platform: Platform.OS,
            accessToken,
            refreshToken,
            accessTokenExpiredAt,
            idToken: googleToken.id_token || '',
            rawData: JSON.stringify({ ...googleToken, ...userInfo }),
        };
    }
}
