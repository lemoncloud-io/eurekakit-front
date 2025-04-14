import { Heart, MessageSquareMore } from 'lucide-react';

import { type FeedView } from '@lemon/feeds';
import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import { List } from '@lemon/ui-kit/components/ui/list';

import { formatCount, formatRelativeTime } from '../../../../utils';

interface PostListBlockProps {
    post: FeedView;
    onClickLike?: (like?: boolean) => void;
}

export const PostListBlock = ({ post, onClickLike }: PostListBlockProps) => {
    return (
        <div className="flex gap-2">
            <div className="flex w-full flex-col justify-between gap-1">
                <div className="flex flex-col gap-1">
                    <p className="line-clamp-2 break-all">{post.name}</p>
                    <List horizontal seperator={<span>·</span>} className="text-muted-foreground gap-1 text-sm">
                        <span className="line-clamp-1">{post.user$.nick}</span>
                        <span>{formatRelativeTime(post.createdAt ?? 0)}</span>
                    </List>
                </div>
                <div className="text-muted-foreground flex w-full items-center gap-1 rounded-lg text-xs">
                    <Heart size={14} />
                    <Condition condition={!!post.likeCount}>
                        <span>{formatCount(post.likeCount!)}</span>
                    </Condition>
                    <MessageSquareMore size={14} />
                    <Condition condition={!!post.commentPosted}>
                        <span>{formatCount(post.commentPosted! - (post.commentHidden ?? 0))}</span>
                    </Condition>
                </div>
            </div>
            <Condition condition={!!post.image$$?.length && !!post.image$$[0].url}>
                <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                    <img src={post.image$$![0]!.url!} className="h-full w-full" />
                    <Button
                        className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full text-lg backdrop-blur-sm"
                        size={'icon'}
                        onClick={() => onClickLike?.(post.$activity?.isLike)}
                    >
                        <Heart
                            className={cn(
                                '!h-5 !w-5 flex-none stroke-white',
                                post?.$activity?.isLike && 'fill-red-600'
                            )}
                        />
                    </Button>
                </div>
            </Condition>
        </div>
    );
};
