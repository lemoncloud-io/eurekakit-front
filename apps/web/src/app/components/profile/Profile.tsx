import { useState } from 'react';

import { User2Icon } from 'lucide-react';

import { cn } from '@lemon/ui-kit';

import type { ComponentPropsWithoutRef } from 'react';

interface ProfileProps extends ComponentPropsWithoutRef<'span'> {
    src?: string;
}

export const Profile = ({ src, className, ...props }: ProfileProps) => {
    const [isImageError, setIsImageError] = useState(false);

    return (
        <span
            className={cn(
                'text-background bg-foreground flex aspect-square h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full',
                className
            )}
            {...props}
        >
            {!!src && !isImageError ? (
                <img src={src} onError={() => setIsImageError(true)} className="h-full w-full object-cover" />
            ) : (
                <User2Icon size={16} />
            )}
        </span>
    );
};
