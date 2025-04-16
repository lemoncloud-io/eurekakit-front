import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Heart, Loader2, MoreVerticalIcon, User2Icon } from 'lucide-react';

import { useFetchFeed, useFetchInfiniteFeedCommentList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { useIsIntersecting } from '../../../hooks';
import { formatCount, formatRelativeTime } from '../../../utils';

interface UserProfileProps {
    src?: string;
}

export const UserProfile = ({ src }: UserProfileProps) => {
    const [isImageError, setIsImageError] = useState(false);

    return (
        <span className="text-background bg-foreground flex aspect-square h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full">
            {!!src && !isImageError ? <img src={src} onError={() => setIsImageError(true)} /> : <User2Icon size={16} />}
        </span>
    );
};

interface UserNickNameProps {
    nickname: string;
}

export const UserNickName = ({ nickname }: UserNickNameProps) => {
    return <span className="overflow-hidden text-ellipsis text-nowrap text-sm">{nickname}</span>;
};

export const PostDetailPage = () => {
    const { postId } = useParams();
    const { setRef, isIntersecting } = useIsIntersecting<HTMLDivElement>();

    const { data: post, isLoading } = useFetchFeed(postId);
    const {
        data: commentList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchInfiniteFeedCommentList(postId);

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage();
        }
    }, [isIntersecting, fetchNextPage]);

    return (
        <div className="h-full overflow-x-hidden">
            <header className="flex h-12 items-center px-2">
                <Button variant={'ghost'} size={'icon'}>
                    <ChevronLeft />
                </Button>
            </header>
            {!isLoading && !!post ? (
                <div className="flex h-[calc(100%-48px)] flex-col gap-3">
                    <div className="flex flex-col items-start gap-2 px-4">
                        <div className="flex w-full items-center gap-2 py-2">
                            <UserProfile src={post.user$.image} />
                            <List
                                seperator={<span className="text-muted-foreground">·</span>}
                                horizontal
                                className="items-center gap-1"
                            >
                                <UserNickName nickname={post.user$.nick} />
                                <span className="text-muted-foreground text-sm">
                                    {formatRelativeTime(post.createdAt)}
                                </span>
                            </List>
                            <button className="text-muted-foreground ml-auto aspect-square">
                                <MoreVerticalIcon size={16} />
                            </button>
                        </div>
                        <div>{post.text}</div>
                        <Carousel opts={{ dragFree: true }}>
                            <CarouselContent className="-ml-2 overflow-visible" containerClassName="overflow-visible">
                                {post.image$$?.map(image => (
                                    <CarouselItem key={image.id} className="basis-[150px] pl-2">
                                        <div className="aspect-square overflow-hidden rounded-lg">
                                            <img src={image.url} className="h-full w-full object-cover" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <button className="mt-1 flex items-center gap-1 text-xs">
                            <Heart size={16} />
                            <span>{formatCount(post.likeCount)}</span>
                        </button>
                    </div>
                    <div>
                        <div className="bg-muted flex px-4 py-1.5 text-sm">
                            <span>답글 {post.childNo ?? 0}</span>
                            <button className="text-secondary-foreground ml-auto inline-flex items-center gap-1 text-xs">
                                <span>답글 쓰기</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <List seperator={<Separator />} className="gap-3 py-3">
                            {commentList?.list.map(comment => (
                                <div className="flex flex-col items-start gap-2 px-4" key={comment.id}>
                                    <div className="flex w-full items-center gap-2 py-2">
                                        <UserProfile src={comment.user$.image} />
                                        <List
                                            seperator={<span className="text-muted-foreground">·</span>}
                                            horizontal
                                            className="items-center gap-1"
                                        >
                                            <UserNickName nickname={comment.user$.nick} />
                                            <span className="text-muted-foreground text-sm">
                                                {formatRelativeTime(comment.createdAt)}
                                            </span>
                                        </List>
                                        <button className="text-muted-foreground ml-auto aspect-square">
                                            <MoreVerticalIcon size={16} />
                                        </button>
                                    </div>
                                    <div>{comment.text}</div>
                                    <Carousel opts={{ dragFree: true }}>
                                        <CarouselContent
                                            className="-ml-2 overflow-visible"
                                            containerClassName="overflow-visible"
                                        >
                                            {comment.image$$?.map(image => (
                                                <CarouselItem key={image.id} className="basis-[150px] pl-2">
                                                    <div className="aspect-square overflow-hidden rounded-lg">
                                                        <img src={image.url} className="h-full w-full object-cover" />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                    <button className="mt-1 flex items-center gap-1 text-xs">
                                        <Heart size={16} />
                                        <span>{formatCount(comment.likeCount)}</span>
                                    </button>
                                </div>
                            ))}
                        </List>
                        {hasNextPage && (
                            <>
                                <Separator />
                                <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                                    {isFetchingNextPage && <Loader2 className="animate-spin" />}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex h-[calc(100%-48px)] items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            )}
        </div>
    );
};
