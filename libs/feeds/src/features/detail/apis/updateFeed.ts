import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const updateFeed = async (id?: string, body?: FeedBody) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [BACKEND_API, FEEDS, id].join('/') })
        .setBody({ ...body })
        .execute<FeedView>();

    return data;
};
