import { webCore } from '@lemon/web-core';

import { ACTIVITY, CONTENT_ENDPOINT, FEEDS } from '../../../consts';

import type { FeedActivityBody, FeedActivityParam, FeedView } from '@lemoncloud/pets-socials-api';

export const viewFeed = async (feedId?: string) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [CONTENT_ENDPOINT, FEEDS, feedId, ACTIVITY].join('/'),
        })
        .setParams({ view: true } satisfies FeedActivityParam)
        .setBody({} satisfies FeedActivityBody)
        .execute<FeedView>();

    return data;
};
