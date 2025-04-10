import { webCore } from '@lemon/web-core';

import { USER_API, USER_ENDPOINT } from '../../../consts/apis';

import type { UserView } from '@lemoncloud/codes-backend-api';

export const fetchUser = async (id?: string) => {
    if (!id) {
        throw new Error('fetchUser = @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [USER_ENDPOINT, USER_API, id].join('/') })
        .execute<UserView>();

    return data;
};
