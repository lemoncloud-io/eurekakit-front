import { useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Image, Loader2, X } from 'lucide-react';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import { FormField, FormItem } from '@lemon/ui-kit/components/ui/form';
import { Label } from '@lemon/ui-kit/components/ui/label';
import List from '@lemon/ui-kit/components/ui/list';
import { useUploadImage } from '@lemon/uploads';

import type { UploadView } from '@lemon/uploads';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

type TrackedPromise<T> =
    | {
          id: string;
          status: 'pending';
      }
    | {
          id: string;
          status: 'fulfilled';
          value: T;
      }
    | {
          id: string;
          status: 'rejected';
          error: any;
      };

export const PostEditorImageUploader = () => {
    const inputId = useId();
    const methods = useFormContext<FeedBody>();

    const [uploadImageList, setUploadImageList] = useState<TrackedPromise<UploadView>[]>([]);

    const { mutateAsync: uploadImages } = useUploadImage();

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (e.target.files) {
            formData.append('file', e.target.files[0]);

            const promiseId = `${Date.now()}-${Math.random()}`;
            const imagePromise = uploadImages(formData);

            setUploadImageList(prev => [...prev, { id: promiseId, status: 'pending' }]);

            imagePromise
                .then(data =>
                    setUploadImageList(prev =>
                        prev.map(promise =>
                            promise.id === promiseId ? { ...promise, status: 'fulfilled', value: data } : promise
                        )
                    )
                )
                .catch(() => setUploadImageList(prev => prev.filter(promise => promise.id !== promiseId)));
        }

        e.target.value = '';
    };

    useEffect(() => {
        const postImageList = uploadImageList
            .filter(imagePromise => imagePromise.status === 'fulfilled')
            .map(imagePromise => imagePromise.value.list)
            .flat();

        if (!postImageList) {
            return;
        }

        methods.setValue('images', postImageList);
    }, [uploadImageList]);

    return (
        <FormField
            control={methods.control}
            name="images"
            render={() => (
                <FormItem>
                    <List horizontal className="gap-2 overflow-x-auto [&>*]:flex-none">
                        <Label
                            htmlFor={inputId}
                            className={cn(
                                'flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed'
                            )}
                        >
                            <Image size={24} className="text-secondary-foreground !h-7 !w-7" />
                            <span className="text-muted-foreground text-xs">{uploadImageList.length}/5</span>
                        </Label>
                        <input
                            type="file"
                            id={inputId}
                            accept="image/jpg, image/jpeg, image/png"
                            className="hidden"
                            onChange={handleUploadImage}
                        />
                        {uploadImageList.map(imagePromise => (
                            <Condition
                                condition={imagePromise.status === 'fulfilled'}
                                fallback={
                                    <div
                                        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-lg border"
                                        key={imagePromise.id}
                                    >
                                        <Button
                                            className="absolute right-1 top-1 h-4 w-4 rounded-full"
                                            size={'icon'}
                                            variant={'secondary'}
                                            onClick={() =>
                                                setUploadImageList(prev =>
                                                    prev.filter(promise => promise.id !== imagePromise.id)
                                                )
                                            }
                                        >
                                            <X />
                                        </Button>
                                        <Loader2 className="animate-spin" />
                                    </div>
                                }
                                key={imagePromise.id}
                            >
                                <div className="relative h-[72px] w-[72px] rounded-lg border">
                                    <Button
                                        className="absolute right-1 top-1 h-4 w-4 rounded-full"
                                        size={'icon'}
                                        variant={'secondary'}
                                        onClick={() =>
                                            setUploadImageList(prev =>
                                                prev.filter(promise => promise.id !== imagePromise.id)
                                            )
                                        }
                                    >
                                        <X />
                                    </Button>
                                    <img
                                        src={
                                            (imagePromise as TrackedPromise<UploadView> & { status: 'fulfilled' }).value
                                                .list[0].url
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </Condition>
                        ))}
                    </List>
                </FormItem>
            )}
        />
    );
};
