import { cn } from '@lemon/ui-kit';

import type { ComponentPropsWithoutRef } from 'react';

interface UserNickNameProps extends ComponentPropsWithoutRef<'span'> {
    nickname: string;
}

export const NickName = ({ nickname, className, ...props }: UserNickNameProps) => {
    return (
        <span className={cn('overflow-hidden text-ellipsis text-nowrap text-sm', className)} {...props}>
            {nickname}
        </span>
    );
};
