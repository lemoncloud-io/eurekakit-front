import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEED, USERS } from '../../../consts';

import type { MediaBody, MediaView } from '@lemoncloud/lemon-uploads-api';

export const createFeed = async (body: MediaBody) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [BACKEND_API, USERS, 0, FEED].join('/'),
        })
        .setBody({ ...body })
        .execute<MediaView>();

    return data;
};
