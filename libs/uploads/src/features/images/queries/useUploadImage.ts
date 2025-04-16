import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '../apis';

export const useUploadImage = () =>
    useMutation({
        mutationFn: (body: FormData) => uploadImage(body),
    });
