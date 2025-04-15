import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '../apis';

import type { MediaBody } from '@lemoncloud/lemon-uploads-api';

export const useUploadImage = () =>
    useMutation({
        mutationFn: (body: MediaBody) => uploadImage(body),
    });
