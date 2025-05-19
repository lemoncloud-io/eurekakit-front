import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

import appleAuth from '@invertase/react-native-apple-authentication';

import { PROJECT } from '../../../../envs/env.json';

import type { LemonLoginProvider } from '../../';
import type { AppleRequestResponse } from '@invertase/react-native-apple-authentication';
import type { OAuthTokenResult } from '@lemon/types';

export class AppleLoginClient implements LemonLoginProvider {
    public getLemonToken(): Promise<OAuthTokenResult | null> {
        let appleResponse: AppleRequestResponse;

        return appleAuth
            .performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            })
            .then((appleAuthRequestResponse: AppleRequestResponse) => {
                // get current authentication state for user
                appleResponse = appleAuthRequestResponse;
                const { user } = appleResponse;
                return appleAuth.getCredentialStateForUser(user);
            })
            .then(credentialState => {
                if (credentialState === appleAuth.State.AUTHORIZED) {
                    return AppleLoginClient.createLemonToken(appleResponse);
                }
                return null;
            })
            .catch(error => {
                if (error.code === appleAuth.Error.CANCELED) {
                    console.warn('User canceled Apple Sign in.');
                } else {
                    console.error(error);
                }
                return null;
            });
    }

    public logout() {
        return appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGOUT,
        });
    }

    private static createLemonToken(appleToken: AppleRequestResponse): OAuthTokenResult {
        const { identityToken, nonce } = appleToken;
        const clientId = getBundleId();
        const application = PROJECT.toLocaleLowerCase();
        return {
            provider: 'apple-id',
            platform: Platform.OS,
            identityToken: identityToken ? identityToken : '',
            nonce,
            clientId,
            application,
            rawData: JSON.stringify(appleToken),
        };
    }
}
