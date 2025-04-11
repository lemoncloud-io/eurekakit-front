import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Heart, MessageSquareMore, RotateCcw, User2Icon } from 'lucide-react';

import { Images } from '@lemon/assets';
import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Input } from '@lemon/ui-kit/components/ui/input';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

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
                    collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
                    'transition-all duration-200'
                )}
            >
                <div className={'flex overflow-hidden'}>{children}</div>
            </div>
        </div>
    );
};

export const NoPost = () => {
    return (
        <div className="text-muted-foreground flex w-full flex-col items-center justify-center py-10 text-sm">
            <span>등록된 게시글이 없습니다.</span>
            <span>조금만 기다려 주세요!</span>
        </div>
    );
};

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
                            <div className="flex w-full flex-col gap-2">
                                <div className="relative z-0 flex aspect-square w-full items-end">
                                    <img
                                        src={
                                            'https://media.istockphoto.com/id/2172310466/ko/%EC%82%AC%EC%A7%84/%EC%B9%B4%ED%8E%98%ED%85%8C%EB%A6%AC%EC%95%84%EC%97%90%EC%84%9C-%EA%B1%B4%EA%B0%95%ED%95%9C-%EC%A0%90%EC%8B%AC%EC%9D%84-%EB%A8%B9%EB%8A%94-%EC%8B%9D%ED%83%81%EC%97%90-%EC%95%89%EC%9D%80-%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%98-%ED%8F%89%EB%A9%B4%EB%8F%84.jpg?s=1024x1024&w=is&k=20&c=81Dq0bQOs3yNt4GexgNgNZAMHzU8emK9DmL-nSWrYjQ='
                                        }
                                        className="absolute -z-10 h-full w-full rounded-lg object-cover"
                                    />
                                    <div className="bg-foreground/40 text-background flex w-full items-center gap-2 rounded-lg p-2 backdrop-blur-sm">
                                        <div className="text-background bg-foreground flex aspect-square h-8 w-8 items-center justify-center rounded-full">
                                            <User2Icon size={16} />
                                        </div>
                                        <div className="flex flex-col text-xs">
                                            <span className="line-clamp-1">닉네임 최대 10글자</span>
                                            <span>1초</span>
                                        </div>
                                        <div className="ml-auto flex gap-2">
                                            <Heart size={16} />
                                            <MessageSquareMore size={16} />
                                        </div>
                                    </div>
                                </div>
                                <p className="line-clamp-2 w-full break-all">
                                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                                </p>
                            </div>
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
                        <div className="flex gap-2">
                            <div className="flex w-full flex-col gap-1">
                                <p className="line-clamp-2 break-all">
                                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                                </p>
                                <div className="text-muted-foreground flex w-full flex-col gap-2 rounded-lg text-sm">
                                    <List hotizontal seperator={<span>·</span>} className="gap-1">
                                        <span className="line-clamp-1">닉네임 최대 10글자</span>

                                        <span>1초</span>
                                    </List>
                                    <div className="flex gap-2">
                                        <Heart size={14} />
                                        <MessageSquareMore size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                                <img
                                    src={
                                        'https://media.istockphoto.com/id/2172310466/ko/%EC%82%AC%EC%A7%84/%EC%B9%B4%ED%8E%98%ED%85%8C%EB%A6%AC%EC%95%84%EC%97%90%EC%84%9C-%EA%B1%B4%EA%B0%95%ED%95%9C-%EC%A0%90%EC%8B%AC%EC%9D%84-%EB%A8%B9%EB%8A%94-%EC%8B%9D%ED%83%81%EC%97%90-%EC%95%89%EC%9D%80-%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%98-%ED%8F%89%EB%A9%B4%EB%8F%84.jpg?s=1024x1024&w=is&k=20&c=81Dq0bQOs3yNt4GexgNgNZAMHzU8emK9DmL-nSWrYjQ='
                                    }
                                    className="h-full w-full"
                                />
                                <Button
                                    className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full text-lg backdrop-blur-sm"
                                    size={'icon'}
                                >
                                    <Heart className={cn('!h-5 !w-5 flex-none stroke-white', 'fill-red-600')} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </List>
                <Button className="w-full gap-2" variant={'secondary'}>
                    더보기
                </Button>
                <NoPost />
            </div>
        </div>
    );
};
