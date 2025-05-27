import React, { useEffect, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Image as ImageIcon } from 'lucide-react';

import { cn, useToast } from '@lemon/ui-kit';
import { FormField, FormItem } from '@lemon/ui-kit/components/ui/form';
import { Label } from '@lemon/ui-kit/components/ui/label';
import { List } from '@lemon/ui-kit/components/ui/list';

import { ImageThumbnail } from './ImageThumbnail';
import { useImageUploader } from '../../hooks';

import type { ContentView } from '../../types';

interface ImageUploaderProps {
    maxImageCount?: number;
}

export const ImageUploader = ({ maxImageCount = 5 }: ImageUploaderProps) => {
    const inputId = useId();
    const methods = useFormContext<ContentView>();
    const { toast } = useToast();
    const { uploadImageList, handleUploadImage, removePromise } = useImageUploader();

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
                                uploadImageList.length < maxImageCount
                                    ? undefined
                                    : () =>
                                          toast({
                                              description: '이미지 삭제 후 등록이 가능합니다.',
                                              className: 'justify-center',
                                          })
                            }
                        >
                            <ImageIcon size={24} className="text-secondary-foreground !h-7 !w-7" />
                            <span className="text-muted-foreground text-xs">
                                {uploadImageList.length}/{maxImageCount}
                            </span>
                        </Label>
                        <input
                            type="file"
                            id={inputId}
                            disabled={maxImageCount <= uploadImageList.length}
                            accept="image/jpg, image/jpeg, image/png"
                            className="hidden"
                            onChange={handleUploadImage}
                        />
                        {uploadImageList.map(imagePromise => (
                            <ImageThumbnail
                                key={imagePromise.id}
                                imagePromise={imagePromise}
                                onRemove={removePromise}
                            />
                        ))}
                    </List>
                </FormItem>
            )}
        />
    );
};
