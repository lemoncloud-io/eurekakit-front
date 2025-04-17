import { useEffect, useState } from 'react';

import { cn } from '@lemon/ui-kit';

import type { PromiseStatus } from '../../types';
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface ImageProps extends ComponentPropsWithRef<'img'> {
    fallback?: ReactNode;
}

export const Image = ({ src, alt, className, fallback, ...imageProps }: ImageProps) => {
    const [imageStatus, setImageStatus] = useState<PromiseStatus>('pending');

    useEffect(() => {
        if (!src) {
            setImageStatus('rejected');
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
        return fallback;
    }

    if (imageStatus === 'pending') {
        return <div className="bg-secondary h-full w-full animate-pulse" />;
    }

    return <img className={cn('h-full w-full object-cover', className)} src={src} alt={alt} {...imageProps} />;
};
