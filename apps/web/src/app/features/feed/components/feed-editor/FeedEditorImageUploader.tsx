import { useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Image as ImageIcon, X } from 'lucide-react';

import { cn, useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { FormField, FormItem } from '@lemon/ui-kit/components/ui/form';
import { Label } from '@lemon/ui-kit/components/ui/label';
import { List } from '@lemon/ui-kit/components/ui/list';
import { useUploadImage } from '@lemon/uploads';

import { Image } from '../../../../components';

import type { TrackedPromise } from '../../../../types';
import type { UploadView } from '@lemon/uploads';
import type { FeedBody, ImageView } from '@lemoncloud/pets-socials-api';

export const FeedEditorImageUploader = () => {
    const inputId = useId();
    const methods = useFormContext<FeedBody>();
    const { toast } = useToast();

    const [uploadImageList, setUploadImageList] = useState<TrackedPromise<ImageView>[]>(() => getInitialImageList());

    const { mutateAsync: uploadImages } = useUploadImage();

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

    useEffect(() => {
        const feedImageList = uploadImageList
            .filter(imagePromise => imagePromise.status === 'fulfilled')
            .map(imagePromise => imagePromise.value)
            .flat()
            .filter(image => image !== undefined);

        if (!feedImageList) {
            return;
        }

        methods.setValue('image$$', feedImageList, { shouldDirty: true });
    }, [uploadImageList]);

    return (
        <FormField
            control={methods.control}
            name="image$$"
            render={() => (
                <FormItem>
                    <List horizontal className="gap-2 overflow-x-auto pb-2 [&>*]:flex-none">
                        <Label
                            htmlFor={inputId}
                            className={cn(
                                'flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed'
                            )}
                            onClick={
                                uploadImageList.length < 5
                                    ? undefined
                                    : () =>
                                          toast({
                                              description: '이미지 삭제 후 등록이 가능합니다.',
                                              className: 'justify-center',
                                          })
                            }
                        >
                            <ImageIcon size={24} className="text-secondary-foreground !h-7 !w-7" />
                            <span className="text-muted-foreground text-xs">{uploadImageList.length}/5</span>
                        </Label>
                        <input
                            type="file"
                            id={inputId}
                            disabled={5 <= uploadImageList.length}
                            accept="image/jpg, image/jpeg, image/png"
                            className="hidden"
                            onChange={handleUploadImage}
                        />
                        {uploadImageList.map(imagePromise => (
                            <div
                                className="relative h-[72px] w-[72px] overflow-hidden rounded-lg border"
                                key={imagePromise.id}
                            >
                                <Image
                                    src={imagePromise.value?.url}
                                    fallback={<div className="bg-secondary h-full w-full animate-pulse" />}
                                    className="h-full w-full object-cover"
                                />
                                <Button
                                    className="absolute right-1 top-1 h-4 w-4 rounded-full"
                                    size={'icon'}
                                    variant={'secondary'}
                                    onClick={() => removePromise(imagePromise.id)}
                                >
                                    <X />
                                </Button>
                            </div>
                        ))}
                    </List>
                </FormItem>
            )}
        />
    );

    function getInitialImageList() {
        return (
            methods
                .getValues('image$$')
                ?.map(image => ({ status: 'fulfilled', value: image, id: image.id }) as TrackedPromise<ImageView>) ?? []
        );
    }

    function updateFulfilledPromise(promiseId: string, data: UploadView) {
        setUploadImageList(prev =>
            prev.map(promise =>
                promise.id === promiseId
                    ? { ...promise, status: 'fulfilled', value: data.list[0] as ImageView }
                    : promise
            )
        );
    }

    function removePromise(promiseId: string) {
        setUploadImageList(prev => prev.filter(promise => promise.id !== promiseId));
    }
};
