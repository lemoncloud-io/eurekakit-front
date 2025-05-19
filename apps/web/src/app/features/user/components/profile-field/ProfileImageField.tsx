import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Camera } from 'lucide-react';

import { useToast } from '@lemon/ui-kit';
import { FormField } from '@lemon/ui-kit/components/ui/form';
import { Label } from '@lemon/ui-kit/components/ui/label';
import { useUploadImage } from '@lemon/uploads';

import { Image } from '../../../../components';

import type { UserBody } from '@lemoncloud/pets-socials-api';

export const ProfileImageField = () => {
    const methods = useFormContext<UserBody>();
    const { toast } = useToast();
    const inputId = useId();

    const { mutateAsync: uploadImage } = useUploadImage();

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (e.target.files) {
            formData.append('file', e.target.files[0]);

            toast({ description: '이미지를 업로드 중입니다.', className: 'flex justify-center items-center' });
            const imagePromise = uploadImage(formData);

            imagePromise
                .then(data => {
                    const imageUrl = data.list[0].url;
                    methods.setValue('image', imageUrl, { shouldDirty: true });
                    toast({
                        description: '프로필 사진이 변경되었습니다.',
                        className: 'flex justify-center items-center',
                    });
                })
                .catch(() => {
                    toast({
                        description: '이미지를 업로드 할 수 없습니다.',
                        className: 'flex justufy-center items-center',
                    });
                });
        }

        e.target.value = '';
    };

    return (
        <FormField
            control={methods.control}
            name="image"
            render={({ field: { value } }) => (
                <Label
                    htmlFor={inputId}
                    className="bg-muted text-muted-foreground inline-block h-16 w-16 overflow-hidden rounded-full"
                >
                    <Image
                        src={value}
                        fallback={
                            <div className="bg-muted flex h-full w-full items-center justify-center">
                                <Camera />
                            </div>
                        }
                    />
                    <input
                        type="file"
                        id={inputId}
                        accept="image/jpg, image/jpeg, image/png"
                        className="hidden"
                        onChange={handleUploadImage}
                    />
                </Label>
            )}
        />
    );
};
