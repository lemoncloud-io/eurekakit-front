import { useEffect, useRef, useState } from 'react';

import { Cog } from 'lucide-react';

import { Images } from '@lemon/assets';
import { useOverlay } from '@lemon/overlay';
import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Input } from '@lemon/ui-kit/components/ui/input';

import { DevModeSettingModal } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { isDev } from '../../../../utils';

import type { ClassNameValue } from 'tailwind-merge';

interface HomeHeaderProps {
    className?: ClassNameValue;
}

export const HomeHeader = ({ className }: HomeHeaderProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const prevScrollYRef = useRef<number>(0);
    const overlay = useOverlay();
    const navigate = useNavigate();

    useEffect(() => {
        const scrollHandler = () => {
            const currenctScrollY = Math.max(window.scrollY, 0);
            const deltaY = currenctScrollY - prevScrollYRef.current;
            prevScrollYRef.current = currenctScrollY;

            setCollapsed(deltaY > 0 ? true : false);
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 z-50',
                'w-full rounded-b-[24px] bg-[#1F1F3C] p-4 shadow-lg',
                collapsed && 'rounded-b-none',
                'transition-all',
                className
            )}
        >
            <div className="text-primary-foreground flex items-center">
                <img src={Images.eurekaCodesLogo} alt="Eureka Codes Logo" className="flex-none" />
                {isDev() && (
                    <Button
                        className="ml-auto"
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() =>
                            overlay
                                .validate(() => isDev())
                                ?.open(overlayProps => <DevModeSettingModal {...overlayProps} />)
                        }
                    >
                        <Cog />
                    </Button>
                )}
            </div>
            <div
                className={cn(
                    'grid overflow-hidden',
                    collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
                    'ease transition-all duration-200'
                )}
            >
                <div className={'flex overflow-hidden'} onClick={() => navigate('/search')}>
                    <Input className={cn('bg-background mt-4 rounded-full text-sm')} placeholder="검색" />
                </div>
            </div>
        </header>
    );
};
