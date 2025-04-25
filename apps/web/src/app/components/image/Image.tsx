import { useEffect, useState } from 'react';

import { FileWarning, ImageOff } from 'lucide-react';

import { cn } from '@lemon/ui-kit';

import type { PromiseStatus } from '../../types';
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface ImageProps extends ComponentPropsWithRef<'img'> {
    noSrcPending?: boolean;
    errorFallback?: ReactNode;
    loadingFallback?: ReactNode;
    fallback?: ReactNode;
}

export const Image = ({ src, alt, className, errorFallback, fallback, loadingFallback, ...imageProps }: ImageProps) => {
    const [imageStatus, setImageStatus] = useState<PromiseStatus>('pending');

    useEffect(() => {
        if (!src) {
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

    if (!src) {
        return (
            fallback ?? (
                <div className="flex h-full w-full items-center justify-center">
                    <ImageOff />
                </div>
            )
        );
    }

    if (imageStatus === 'rejected') {
        return (
            errorFallback ?? (
                <div className="flex h-full w-full items-center justify-center">
                    <FileWarning />
                </div>
            )
        );
    }

    if (imageStatus === 'pending') {
        return loadingFallback ?? <div className="bg-secondary h-full w-full animate-pulse" />;
    }

    return <img className={cn('h-full w-full object-cover', className)} src={src} alt={alt} {...imageProps} />;
};
