import { Heart, MessageSquareMore } from 'lucide-react';

import { type FeedView } from '@lemon/feeds';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import { List } from '@lemon/ui-kit/components/ui/list';

import { Image, LikeButton, Link, NickName } from '../../../../components';
import { formatCount, formatRelativeTime } from '../../../../utils';

interface FeedListBlockProps {
    feed: FeedView;
}

export const FeedListBlock = ({ feed }: FeedListBlockProps) => {
    return (
        <Link className="flex gap-2" to={`/feed/${feed.id}`}>
            <div className="flex w-full flex-col justify-between gap-1">
                <div className="flex flex-col gap-1">
                    <p className="line-clamp-2 break-all">{feed.text}</p>
                    <List horizontal seperator={<span>·</span>} className="text-muted-foreground gap-1 text-sm">
                        <NickName className="line-clamp-1" nickname={feed.user$?.nick} />
                        <span>{formatRelativeTime(feed.createdAt ?? 0)}</span>
                    </List>
                </div>
                <div className="text-muted-foreground flex w-full items-center gap-1 rounded-lg text-xs">
                    <Heart size={14} />
                    <Condition condition={!!feed.likeCount}>
                        <span>{formatCount(feed.likeCount!)}</span>
                    </Condition>
                    <MessageSquareMore size={14} />
                    <span>{formatCount((feed.commentPosted ?? 0) - (feed.commentHidden ?? 0))}</span>
                </div>
            </div>
            <Condition condition={!!feed.image$$?.length && !!feed.image$$[0].url}>
                <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                    {feed.image$$?.length && <Image src={feed.image$$![0]!.url!} />}
                    <LikeButton
                        hideCount
                        feedId={feed.id}
                        likeCount={feed.likeCount}
                        isLike={feed.$activity?.isLike}
                        className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full p-2 text-lg backdrop-blur-sm"
                    />
                </div>
            </Condition>
        </Link>
    );
};
