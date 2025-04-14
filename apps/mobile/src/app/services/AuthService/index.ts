import { WebCoreFactory } from '@lemoncloud/lemon-web-core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ENV, OAUTH_ENDPOINT, PROJECT } from '../../../envs/env.json';

import type { WebCoreConfig } from '@lemoncloud/lemon-web-core';

export const webCore = WebCoreFactory.create({
    cloud: 'aws',
    project: `${PROJECT.toLocaleLowerCase()}_${ENV}`,
    oAuthEndpoint: OAUTH_ENDPOINT,
    region: 'ap-northeast-2',
    storage: AsyncStorage,
} as WebCoreConfig<'aws'>);

export class AuthService {
    async getSavedTokenData() {
        await webCore.init();
        const token = await webCore.getSavedToken();
        return this.deleteUndefinedProperty(token);
    }

    private deleteUndefinedProperty(query: any) {
        Object.keys(query).forEach(
            key => (query[key] === undefined || query[key] === '' || query[key] === null) && delete query[key]
        );
        return query;
    }
}

const authService = new AuthService();
export default authService;
