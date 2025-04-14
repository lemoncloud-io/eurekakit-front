import { useEffect, useRef, useState } from 'react';

import { cn } from '@lemon/ui-kit';
import { Input } from '@lemon/ui-kit/components/ui/input';

import { HomeHeader } from '../components';
import { HotPostGrid } from '../components/hot-post-grid';
import { TotalPostList } from '../components/total-post-list/TotalPostList';

export const HomePage = () => {
    const [collased, setCollapsed] = useState(false);
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
        <div className="flex min-h-full flex-col">
            <HomeHeader collapsed={collased} className={cn(collased && 'rounded-b-none', 'transition-all')}>
                <Input className={cn('bg-background mt-4 rounded-full text-sm')} placeholder="검색" />
            </HomeHeader>
            <div className="h-28" />
            <HotPostGrid />
            <TotalPostList />
        </div>
    );
};
