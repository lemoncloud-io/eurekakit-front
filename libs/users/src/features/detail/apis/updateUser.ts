import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, USERS } from '../../../consts';

import type { UserBody, UserView } from '@lemoncloud/pets-socials-api';

export const updateUser = async (id?: string, body?: UserBody) => {
    if (!id) {
        throw new Error('updateUser - @id is required');
    }

    if (!body) {
        throw new Error('updateUser - @body is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [CONTENT_ENDPOINT, USERS, id].join('/') })
        .setBody({ ...body })
        .execute<UserView>();

    return data;
};
