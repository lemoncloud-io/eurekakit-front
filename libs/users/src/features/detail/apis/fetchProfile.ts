import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, SOCIAL, USERS } from '../../../consts/apis';

import type { UserView } from '../../../types';

export const fetchProfile = async () => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [CONTENT_ENDPOINT, USERS, 0, SOCIAL].join('/'),
        })
        .execute<UserView>();

    return data;
};
