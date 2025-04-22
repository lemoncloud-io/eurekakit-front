import { Heart, MessageSquareMore } from 'lucide-react';

import { type FeedView } from '@lemon/feeds';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import { List } from '@lemon/ui-kit/components/ui/list';

import { LikeButton, Link, NickName } from '../../../../components';
import { formatCount, formatRelativeTime } from '../../../../utils';

interface PostListBlockProps {
    post: FeedView;
}

export const PostListBlock = ({ post }: PostListBlockProps) => {
    return (
        <Link className="flex gap-2" to={`/post/${post.id}`}>
            <div className="flex w-full flex-col justify-between gap-1">
                <div className="flex flex-col gap-1">
                    <p className="line-clamp-2 break-all">{post.text}</p>
                    <List horizontal seperator={<span>·</span>} className="text-muted-foreground gap-1 text-sm">
                        <NickName className="line-clamp-1" nickname={post.user$?.nick} />
                        <span>{formatRelativeTime(post.createdAt ?? 0)}</span>
                    </List>
                </div>
                <div className="text-muted-foreground flex w-full items-center gap-1 rounded-lg text-xs">
                    <Heart size={14} />
                    <Condition condition={!!post.likeCount}>
                        <span>{formatCount(post.likeCount!)}</span>
                    </Condition>
                    <MessageSquareMore size={14} />
                    <span>{formatCount(post.childNo)}</span>
                </div>
            </div>
            <Condition condition={!!post.image$$?.length && !!post.image$$[0].url}>
                <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                    {post.image$$?.length && <img src={post.image$$![0]!.url!} className="h-full w-full" />}
                    <LikeButton
                        hideCount
                        postId={post.id}
                        likeCount={post.likeCount}
                        isLike={post.$activity?.isLike}
                        className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full p-2 text-lg backdrop-blur-sm"
                    />
                </div>
            </Condition>
        </Link>
    );
};
