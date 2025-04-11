import { useEffect, useRef, useState } from 'react';

import { RotateCcw } from 'lucide-react';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Input } from '@lemon/ui-kit/components/ui/input';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeHeader } from '../components';
import { PostGridBlock } from '../components/post-block/PostGridBlock';
import { PostListBlock } from '../components/post-block/PostListBlock';

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
            <div className="flex flex-col gap-2 p-4">
                <h3 className="font-semibold">인기글</h3>
                <div className="flex flex-col gap-3 py-1">
                    <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map(() => (
                            <PostGridBlock />
                        ))}
                    </div>
                    <Button className="w-full gap-2" variant={'secondary'}>
                        <RotateCcw />
                        인기글 새로 보기
                        <div />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <h3 className="font-semibold">전체글</h3>
                <List seperator={<Separator />} className="gap-3 py-3">
                    {Array.from({ length: 5 }).map(() => (
                        <PostListBlock />
                    ))}
                </List>
                <Button className="w-full gap-2" variant={'secondary'}>
                    더보기
                </Button>
            </div>
        </div>
    );
};
