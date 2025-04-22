import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image as ImageIcon, X } from 'lucide-react';

import { Loader } from '@lemon/shared';
import { cn, toast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { FormField, FormItem } from '@lemon/ui-kit/components/ui/form';
import { Label } from '@lemon/ui-kit/components/ui/label';
import { List } from '@lemon/ui-kit/components/ui/list';
import { useUploadImage } from '@lemon/uploads';

import type { TrackedPromise } from '@lemon/shared';
import type { FeedBody, ImageView } from '@lemoncloud/pets-socials-api';
import type { useForm } from 'react-hook-form';

export const ImageUploader = ({ methods }: { methods: ReturnType<typeof useForm<FeedBody>> }) => {
    const inputId = useId();
    const { t } = useTranslation();

    // 초기 이미지 데이터에서 시작
    const [uploadImageList, setUploadImageList] = useState<TrackedPromise<ImageView>[]>(() => {
        const initialImages = methods.getValues('image$$') || [];
        return initialImages.map(image => ({
            status: 'fulfilled' as const,
            value: image,
            id: image.id,
        }));
    });

    const { mutateAsync: uploadImages } = useUploadImage();

    // 폼 값 변경 감지 및 업데이트
    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            // 외부에서 image$$ 필드가 변경된 경우 (ex: 초기 데이터 로드)
            if (name === 'image$$' || name === undefined) {
                const formImages = methods.getValues('image$$') || [];

                // 폼 이미지가 있고 uploadImageList가 비어있는 경우 초기화
                if (formImages.length > 0 && uploadImageList.length === 0) {
                    const trackedImages = formImages.map(image => ({
                        status: 'fulfilled' as const,
                        value: image,
                        id: image.id,
                    }));
                    setUploadImageList(trackedImages);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [methods, uploadImageList.length]);

    // 이미지 목록이 변경될 때 폼 값 업데이트
    useEffect(() => {
        const postImageList = uploadImageList
            .filter(imagePromise => imagePromise.status === 'fulfilled')
            .map(imagePromise => imagePromise.value)
            .filter(Boolean);

        methods.setValue('image$$', postImageList, { shouldDirty: true });
    }, [uploadImageList, methods]);

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (e.target.files) {
            formData.append('file', e.target.files[0]);

            const promiseId = `${Date.now()}-${Math.random()}`;
            const imagePromise = uploadImages(formData);

            setUploadImageList(prev => [...prev, { id: promiseId, status: 'pending' }]);

            imagePromise
                .then(data => {
                    setUploadImageList(prev =>
                        prev.map(promise =>
                            promise.id === promiseId
                                ? { ...promise, status: 'fulfilled', value: data.list[0] as ImageView }
                                : promise
                        )
                    );
                })
                .catch(() => {
                    setUploadImageList(prev => prev.filter(promise => promise.id !== promiseId));
                    toast({
                        description: t('feeds.toast.imageUploadFailed', '이미지를 업로드 할 수 없습니다.'),
                        className: 'flex justify-center items-center',
                    });
                });
        }

        e.target.value = '';
    };

    const removeImage = (promiseId: string) => {
        setUploadImageList(prev => prev.filter(promise => promise.id !== promiseId));
    };

    const MAX_IMAGES = 5;

    return (
        <FormField
            control={methods.control}
            name="image$$"
            render={() => (
                <FormItem className="space-y-3">
                    <Label className="text-sm font-medium">{t('feeds.form.images', '이미지')}</Label>
                    <List horizontal className="flex gap-2 overflow-x-auto pb-2 [&>*]:flex-none">
                        <Label
                            htmlFor={inputId}
                            className={cn(
                                'flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed',
                                uploadImageList.length >= MAX_IMAGES && 'cursor-not-allowed opacity-50'
                            )}
                            onClick={
                                uploadImageList.length < MAX_IMAGES
                                    ? undefined
                                    : e => {
                                          e.preventDefault();
                                          toast({
                                              description: t(
                                                  'feeds.form.maxImagesReached',
                                                  '이미지는 최대 5개까지 등록 가능합니다.'
                                              ),
                                              className: 'justify-center',
                                          });
                                      }
                            }
                        >
                            <ImageIcon size={24} className="text-secondary-foreground h-7 w-7" />
                            <span className="text-muted-foreground text-xs">
                                {uploadImageList.length}/{MAX_IMAGES}
                            </span>
                        </Label>
                        <input
                            type="file"
                            id={inputId}
                            disabled={uploadImageList.length >= MAX_IMAGES}
                            accept="image/jpg, image/jpeg, image/png"
                            className="hidden"
                            onChange={handleUploadImage}
                        />
                        {uploadImageList.map(imagePromise => (
                            <div
                                className="relative h-[72px] w-[72px] overflow-hidden rounded-lg border"
                                key={imagePromise.id}
                            >
                                {imagePromise.status === 'pending' ? (
                                    <div className="bg-muted/20 flex h-full w-full items-center justify-center">
                                        <Loader size="sm" />
                                    </div>
                                ) : (
                                    <img src={imagePromise.value?.url} className="h-full w-full object-cover" alt="" />
                                )}
                                <Button
                                    className="absolute right-1 top-1 h-4 w-4 rounded-full"
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => removeImage(imagePromise.id)}
                                    disabled={imagePromise.status === 'pending'}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </List>
                    <p className="text-muted-foreground text-xs">
                        {t('feeds.form.imageHelp', '지원 형식: JPG, JPEG, PNG (최대 5MB)')}
                    </p>
                </FormItem>
            )}
        />
    );
};
