import { webCore } from '@lemon/web-core';

import { IMAGE_ENDPOINT, UPLOAD } from '../../../consts';

import type { UploadView } from '../types';
import type { Params } from '@lemoncloud/lemon-web-core';
import type { AxiosRequestConfig } from 'axios';

export const FILE_SIZE_LIMIT = 1024 * 1024 * 10;

export const uploadImage = async (
    formDataBody: FormData,
    options?: { params?: Params; onUploadProgress?: AxiosRequestConfig }
) => {
    if (formDataBody.has('file')) {
        const file = formDataBody.get('file') as File;

        if (FILE_SIZE_LIMIT < file.size) {
            throw new Error('File size must be 10MB or less.');
        }
    }

    const extraConfig = options?.onUploadProgress ? { ...options?.onUploadProgress } : {};
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [IMAGE_ENDPOINT, UPLOAD].join('/'),
        })
        .setParams(options?.params || {})
        .setBody(formDataBody || {})
        .addHeaders({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'multipart/form-data',
        })
        .addAxiosRequestConfig(extraConfig)
        .execute<UploadView>();

    return data;
};
