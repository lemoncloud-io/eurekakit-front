import { webCore } from '@lemon/web-core';

import { PET_ENDPOINT, SOCIAL, USERS } from '../../../consts/apis';

import type { UserView } from '@lemoncloud/pets-socials-api';

export const fetchProfile = async () => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [PET_ENDPOINT, USERS, 0, SOCIAL].join('/'),
        })
        .execute<UserView>();

    return data;
};
