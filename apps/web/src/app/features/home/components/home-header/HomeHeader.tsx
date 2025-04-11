import { type PropsWithChildren } from 'react';

import { Images } from '@lemon/assets';
import { cn } from '@lemon/ui-kit';

import type { ClassNameValue } from 'tailwind-merge';

interface HomeHeaderProps extends PropsWithChildren {
    className?: ClassNameValue;
    collapsed?: boolean;
}

export const HomeHeader = ({ children, collapsed, className }: HomeHeaderProps) => {
    return (
        <div className={cn('fixed top-0 z-50', 'w-full rounded-b-[24px] bg-[#1F1F3C] p-4 shadow-lg', className)}>
            <div>
                <img src={Images.eurekaCodesLogo} alt="Eureka Codes Logo" />
            </div>
            <div
                className={cn(
                    'grid overflow-hidden',
                    collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
                    'ease transition-all duration-200'
                )}
            >
                <div className={'flex overflow-hidden'}>{children}</div>
            </div>
        </div>
    );
};
