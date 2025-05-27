import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useToast } from '@lemon/ui-kit';
import { useUploadImage } from '@lemon/uploads';

import type { ContentView } from '../../types';
import type { TrackedPromise } from '@lemon/shared';
import type { UploadView } from '@lemon/uploads';
import type { ImageView } from '@lemoncloud/pets-socials-api';

export interface UseImageUploaderReturn {
    uploadImageList: TrackedPromise<ImageView>[];
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removePromise: (promiseId: string) => void;
}

export const useImageUploader = (): UseImageUploaderReturn => {
    const methods = useFormContext<ContentView>();
    const { toast } = useToast();

    const getInitialImageList = () => {
        return (
            methods
                .getValues('image$$')
                ?.map(image => ({ status: 'fulfilled', value: image, id: image.id }) as TrackedPromise<ImageView>) ?? []
        );
    };

    const [uploadImageList, setUploadImageList] = useState(getInitialImageList);
    const { mutateAsync: uploadImages } = useUploadImage();

    const updateFulfilledPromise = (promiseId: string, data: UploadView) => {
        setUploadImageList(prev =>
            prev.map(promise =>
                promise.id === promiseId
                    ? { ...promise, status: 'fulfilled', value: data.list[0] as ImageView }
                    : promise
            )
        );
    };

    const removePromise = (promiseId: string) => {
        setUploadImageList(prev => prev.filter(promise => promise.id !== promiseId));
    };

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (e.target.files) {
            formData.append('file', e.target.files[0]);

            const promiseId = `${Date.now()}-${Math.random()}`;
            const imagePromise = uploadImages(formData);

            setUploadImageList(prev => [...prev, { id: promiseId, status: 'pending' }]);

            imagePromise
                .then(data => updateFulfilledPromise(promiseId, data))
                .catch(() => {
                    removePromise(promiseId);
                    toast({
                        description: '이미지를 업로드 할 수 없습니다.',
                        className: 'flex justufy-center items-center',
                    });
                });
        }

        e.target.value = '';
    };

    return {
        uploadImageList,
        handleUploadImage,
        removePromise,
    };
};
