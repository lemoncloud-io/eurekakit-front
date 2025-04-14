import { Heart, MessageSquareMore } from 'lucide-react';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';

import { formatCount, formatRelativeTime } from '../../../../utils';

import type { FeedView } from '@lemoncloud/pets-socials-api';

interface PostListBlockProps {
    post: FeedView;
}

export const PostListBlock = ({ post }: PostListBlockProps) => {
    return (
        <div className="flex gap-2">
            <div className="flex w-full flex-col gap-1">
                <p className="line-clamp-2 break-all">{post.name}</p>
                <div className="text-muted-foreground flex w-full flex-col gap-1 rounded-lg text-sm">
                    <List hotizontal seperator={<span>·</span>} className="gap-1">
                        <span className="line-clamp-1">{post.user$?.name}</span>
                        <span>{formatRelativeTime(post.createdAt ?? 0)}</span>
                    </List>
                    <div className="flex items-center gap-2">
                        <Heart size={14} />
                        <span>{formatCount(post.likeCount)}</span>
                        <MessageSquareMore size={14} />
                        <span>{formatCount(post.commentPosted - post.commentHidden)}</span>
                    </div>
                </div>
            </div>
            <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                <img src={post.image$$[0].url} className="h-full w-full" />
                <Button
                    className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full text-lg backdrop-blur-sm"
                    size={'icon'}
                >
                    <Heart
                        className={cn('!h-5 !w-5 flex-none stroke-white', post?.$activity?.isLike && 'fill-red-600')}
                    />
                </Button>
            </div>
        </div>
    );
};
