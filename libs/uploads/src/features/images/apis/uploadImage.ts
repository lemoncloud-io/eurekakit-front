import { webCore } from '@lemon/web-core';

import { IMAGE_ENDPOINT, UPLOAD } from '../../../consts';

import type { MediaBody, MediaView } from '@lemoncloud/lemon-uploads-api';

export const uploadImage = async (body: MediaBody) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'POST', baseURL: [IMAGE_ENDPOINT, UPLOAD, 0].join('/') })
        .setBody({ ...body })
        .execute<MediaView>();

    return data;
};
