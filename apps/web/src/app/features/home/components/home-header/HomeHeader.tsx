import { useEffect, useRef, useState } from 'react';

import { Images } from '@lemon/assets';
import { cn } from '@lemon/ui-kit';
import { Input } from '@lemon/ui-kit/components/ui/input';

export const HomeHeader = () => {
    const [collapsed, setCollapsed] = useState(false);
    const prevScrollYRef = useRef<number>(0);

    useEffect(() => {
        const scrollHandler = () => {
            const currenctScrollY = window.scrollY;
            const deltaY = currenctScrollY - prevScrollYRef.current;
            prevScrollYRef.current = window.scrollY;

            setCollapsed(deltaY > 0 ? true : false);
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <div
            className={cn(
                'fixed top-0 z-50',
                'w-full rounded-b-[24px] bg-[#1F1F3C] p-4 shadow-lg',
                collapsed && 'rounded-b-none',
                'transition-all'
            )}
        >
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
                <div className={'flex overflow-hidden'}>
                    <Input className={cn('bg-background mt-4 rounded-full text-sm')} placeholder="검색" />
                </div>
            </div>
        </div>
    );
};
