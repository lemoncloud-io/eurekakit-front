import { Heart, MessageSquareMore, User2Icon } from 'lucide-react';

import { Condition } from '@lemon/ui-kit/components/ui/condition';

import { formatCount, formatRelativeTime } from '../../../../utils';

import type { FeedView } from '@lemon/feeds';

interface PostGridBlockProps {
    post: FeedView;
}

export const PostGridBlock = ({ post }: PostGridBlockProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="relative z-0 flex aspect-square w-full items-end">
                <Condition condition={!!post.image$$?.length && !!post.image$$[0].url}>
                    <img
                        src={post.image$$?.[0]?.url}
                        className="absolute -z-10 h-full w-full rounded-lg object-cover"
                    />
                </Condition>
                <div className="bg-foreground/40 text-background flex w-full items-center gap-2 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-background bg-foreground flex aspect-square h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full">
                        <Condition condition={!!post.user$?.image} fallback={<User2Icon size={16} />}>
                            <img src={post.user$?.image} />
                        </Condition>
                    </div>
                    <div className="shrink overflow-hidden text-xs">
                        <div className="overflow-hidden text-ellipsis text-nowrap">{post?.user$?.nick}</div>
                        <div className="overflow-hidden text-ellipsis text-nowrap">
                            {formatRelativeTime(post.createdAt)}
                        </div>
                    </div>
                    <div className="ml-auto flex flex-none items-center gap-1 text-xs">
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
            </div>
            <p className="line-clamp-2 w-full break-all">{post.name}</p>
        </div>
    );
};
