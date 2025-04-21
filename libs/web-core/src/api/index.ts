
import { OAUTH_ENDPOINT, webCore } from '../core';

import type { Params } from '@lemon/shared';
import type { VerifyNativeTokenBody } from '@lemoncloud/codes-backend-api/dist/modules/auth/oauth2/oauth2-types';
import type { LemonOAuthToken } from '@lemoncloud/lemon-web-core';

export const createCredentialsByProvider = async (provider = 'google', code: string) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: `${OAUTH_ENDPOINT}/oauth/${provider}/token`,
        })
        .setBody({ code })
        .execute<{ Token: LemonOAuthToken }>();

    return await webCore.buildCredentialsByToken(data.Token);
};

export const verifyNativeToken = async (tokenBody: VerifyNativeTokenBody, params: Params = {}, token = 1) => {
    if (!tokenBody || !tokenBody.provider) {
        throw new Error('verifyNativeToken: @tokenBody is required');
    }
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: `${OAUTH_ENDPOINT}/oauth/0/verify-native-token`,
        })
        .setParams({ ...params, token })
        .setBody({ ...tokenBody })
        .execute<any>();

    return { ...data };
};
