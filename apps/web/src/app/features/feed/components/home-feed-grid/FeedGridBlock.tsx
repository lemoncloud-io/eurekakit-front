import { Heart, MessageSquareMore } from 'lucide-react';

import { Condition } from '@lemon/ui-kit/components/ui/condition';

import { Image, Link, NickName, Profile } from '../../../../components';
import { formatCount, formatRelativeTime } from '../../../../utils';

import type { FeedView } from '@lemon/feeds';

interface FeedGridBlockProps {
    feed: FeedView;
}

export const FeedGridBlock = ({ feed }: FeedGridBlockProps) => {
    return (
        <Link className="flex w-full flex-col gap-2" to={`/feed/${feed.id}`}>
            <div className="relative z-0 flex aspect-square w-full items-end">
                <div className="absolute -z-0 h-full w-full overflow-hidden rounded-lg">
                    <Image src={feed.image$$?.[0]?.url} />
                </div>
                <div className="text-background flex w-full items-center gap-2 rounded-lg bg-[#8A8A8A]/40 p-2 backdrop-blur-sm">
                    <Profile src={feed.user$.image} className="h-8 w-8" />
                    <div className="shrink overflow-hidden text-xs">
                        <NickName nickname={feed.user$.nick} className="text-xs" />
                        <div className="overflow-hidden text-ellipsis text-nowrap">
                            {formatRelativeTime(feed.createdAt)}
                        </div>
                    </div>
                    <div className="ml-auto flex flex-none items-center gap-1 text-xs">
                        <Heart size={14} />
                        <Condition condition={!!feed.likeCount}>
                            <span>{formatCount(feed.likeCount!)}</span>
                        </Condition>
                        <MessageSquareMore size={14} />
                        <span>{formatCount((feed.commentPosted ?? 0) - (feed.commentHidden ?? 0))}</span>
                    </div>
                </div>
            </div>
            <p className="line-clamp-2 w-full break-all">{feed.text}</p>
        </Link>
    );
};
