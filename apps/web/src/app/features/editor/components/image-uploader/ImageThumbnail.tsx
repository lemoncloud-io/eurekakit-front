import { X } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { Image } from '../../../../components';

import type { TrackedPromise } from '../../../../types';
import type { ImageView } from '@lemoncloud/pets-socials-api';

interface ImageThumbnailProps {
    imagePromise: TrackedPromise<ImageView>;
    onRemove: (id: string) => void;
}

export const ImageThumbnail = ({ imagePromise, onRemove }: ImageThumbnailProps) => {
    return (
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-lg border">
            <Image
                src={imagePromise.value?.url}
                fallback={<div className="bg-secondary h-full w-full animate-pulse" />}
                className="h-full w-full object-cover"
            />
            <Button
                className="absolute right-1 top-1 h-4 w-4 rounded-full"
                size={'icon'}
                variant={'secondary'}
                onClick={() => onRemove(imagePromise.id)}
            >
                <X />
            </Button>
        </div>
    );
};
