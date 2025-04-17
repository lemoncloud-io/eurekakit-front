import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Heart, MoreVerticalIcon } from 'lucide-react';

import { useLikeFeed } from '@lemon/feeds';
import { cn } from '@lemon/ui-kit';
import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';
import { List } from '@lemon/ui-kit/components/ui/list';

import { ImageCarouselModal } from '../../../../components';
import { formatCount, formatRelativeTime } from '../../../../utils';
import { UserNickName, UserProfile } from '../../pages';

import type { FeedView } from '@lemon/feeds';

interface PostProps {
    post: FeedView;
}

export const Post = ({ post }: PostProps) => {
    const queryClient = useQueryClient();

    const [clickedImageIdx, setClickedImageIdx] = useState<number | undefined>(undefined);

    const { mutate: changeLike } = useLikeFeed();

    const onChangeLike = (e: React.MouseEvent, id: string, like?: boolean) => {
        e.preventDefault();

        const isLike = !like;

        changeLike({ id, like: isLike }, { onSuccess: async () => await queryClient.invalidateQueries() });
    };

    const onClickImage = (e: React.MouseEvent) => {
        const imageIdx = (e.currentTarget as HTMLElement).dataset.imageIdx;

        if (!imageIdx) {
            return;
        }

        setClickedImageIdx(Number(imageIdx));
    };

    return (
        <div className="flex flex-col items-start gap-2 px-4">
            <div className="flex w-full items-center gap-2 py-2">
                <UserProfile src={post.user$.image} />
                <List
                    seperator={<span className="text-muted-foreground">·</span>}
                    horizontal
                    className="items-center gap-1"
                >
                    <UserNickName nickname={post.user$.nick} />
                    <span className="text-muted-foreground text-sm">{formatRelativeTime(post.createdAt)}</span>
                </List>
                <button className="text-muted-foreground ml-auto aspect-square">
                    <MoreVerticalIcon size={16} />
                </button>
            </div>
            <div>{post.text}</div>
            <Carousel opts={{ dragFree: true }}>
                <CarouselContent className="-ml-2 overflow-visible" containerClassName="overflow-visible">
                    {post.image$$?.map((image, idx) => (
                        <CarouselItem
                            key={image.id}
                            className="basis-[150px] pl-2"
                            onClick={onClickImage}
                            data-image-idx={idx}
                        >
                            <div className="aspect-square overflow-hidden rounded-lg">
                                <img src={image.url} className="h-full w-full object-cover" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            {post.image$$ && (
                <ImageCarouselModal
                    open={clickedImageIdx !== undefined}
                    onOpenChange={() => setClickedImageIdx(undefined)}
                    close={() => setClickedImageIdx(undefined)}
                    startIndex={clickedImageIdx}
                    images={post.image$$.map(imageView => ({ id: imageView.id, url: imageView.url }))}
                />
            )}
            <button
                className="mt-1 flex items-center gap-1 text-xs"
                onClick={e => onChangeLike(e, post.id, post.$activity?.isLike)}
            >
                <Heart size={16} className={cn(post.$activity?.isLike && 'fill-red-500 stroke-red-500')} />
                <span>{formatCount(post.likeCount)}</span>
            </button>
        </div>
    );
};
