import { webCore } from '@lemon/web-core';

import { ACTIVITY, FEEDS, PET_ENDPOINT } from '../../../consts';

import type { FeedActivityBody, FeedActivityParam, FeedView } from '@lemoncloud/pets-socials-api';

export const viewFeed = async (feedId?: string) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [PET_ENDPOINT, FEEDS, feedId, ACTIVITY].join('/'),
        })
        .setParams({ view: true } satisfies FeedActivityParam)
        .setBody({} satisfies FeedActivityBody)
        .execute<FeedView>();

    return data;
};
