import { AppleLoginClient, GoogleLoginClient, KakaoLoginClient, NaverLoginClient } from '../';

import type { LoginProvider, OAuthTokenResult } from '@lemon/types';

export interface LemonLoginProvider {
    getLemonToken(): Promise<OAuthTokenResult | null>;
    logout(): any;
}

export class LoginService {
    private provider: LemonLoginProvider;

    constructor(provider: LemonLoginProvider) {
        this.provider = provider;
    }

    public setLoginProvider(provider: LemonLoginProvider) {
        this.provider = provider;
    }

    public getLemonOAuthToken(): Promise<OAuthTokenResult | null> {
        return this.provider.getLemonToken().catch(err => {
            console.log(`Failed to get lemon oauth token: ${err.message || err.errCode || 'unknown'}`);
            return null;
        });
    }
}

export const getLemonOAuthToken = async (type: LoginProvider): Promise<OAuthTokenResult | null> => {
    const lemonLoginService = new LoginService(new GoogleLoginClient());

    switch (type) {
        case 'apple':
            lemonLoginService.setLoginProvider(new AppleLoginClient());
            break;
        case 'google':
            lemonLoginService.setLoginProvider(new GoogleLoginClient());
            break;
        case 'naver':
            lemonLoginService.setLoginProvider(new NaverLoginClient());
            break;
        case 'kakao':
            lemonLoginService.setLoginProvider(new KakaoLoginClient());
            break;
        default:
            throw new Error('Invalid Login Provider');
    }
    return await lemonLoginService.getLemonOAuthToken();
};
