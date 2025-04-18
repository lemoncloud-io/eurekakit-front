import { useEffect, useState } from 'react';

import { ImageOff } from 'lucide-react';

import { cn } from '@lemon/ui-kit';

import type { PromiseStatus } from '../../types';
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface ImageProps extends ComponentPropsWithRef<'img'> {
    noSrcPending?: boolean;
    errorFallback?: ReactNode;
    loadingFallback?: ReactNode;
}

export const Image = ({
    src,
    alt,
    className,
    errorFallback,
    loadingFallback,
    noSrcPending,
    ...imageProps
}: ImageProps) => {
    const [imageStatus, setImageStatus] = useState<PromiseStatus>('pending');

    useEffect(() => {
        if (!src) {
            setImageStatus(noSrcPending ? 'pending' : 'rejected');
            return;
        }

        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            setImageStatus('fulfilled');
        };

        img.onerror = () => {
            setImageStatus('rejected');
        };
    }, [src]);

    if (imageStatus === 'rejected') {
        return errorFallback ?? <ImageOff />;
    }

    if (imageStatus === 'pending') {
        return loadingFallback ?? <div className="bg-secondary h-full w-full animate-pulse" />;
    }

    return <img className={cn('h-full w-full object-cover', className)} src={src} alt={alt} {...imageProps} />;
};
