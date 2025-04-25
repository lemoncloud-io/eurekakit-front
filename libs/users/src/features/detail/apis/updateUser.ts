import { webCore } from '@lemon/web-core';

import { USERS, USER_ENDPOINT } from '../../../consts/apis';

import type { ListResult } from '@lemon/shared';
import type { UserBody, UserView } from '@lemoncloud/codes-backend-api';

export const updateUser = async (id?: string, body?: UserBody) => {
    if (!id) {
        throw new Error('updateUser - @id is required');
    }

    if (!body) {
        throw new Error('updateUser - @body is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [USER_ENDPOINT, USERS, id].join('/') })
        .setBody({ ...body })
        .execute<ListResult<UserView>>();

    return data;
};
