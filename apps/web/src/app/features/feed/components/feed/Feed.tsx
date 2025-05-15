import { useFetchProfile } from '@lemon/users';

import { FeedHeader } from './FeedHeader';
import { ImageCarouselViewer, LikeButton } from '../../../../components';

import type { FeedView } from '@lemon/feeds';

interface FeedProps {
    feed: FeedView;
}

export const Feed = ({ feed }: FeedProps) => {
    const { data: profile } = useFetchProfile();

    return (
        <div className="flex flex-col items-start gap-2 overflow-x-hidden px-4 py-2">
            <FeedHeader
                feedId={feed.id}
                profileImg={feed.user$?.image}
                nickname={feed.user$?.nick}
                createdAt={feed.createdAt}
                isMe={profile?.id === feed.userId}
            />
            <div className="whitespace-pre-line break-all" dangerouslySetInnerHTML={{ __html: feed.text }} />
            <ImageCarouselViewer images={feed.image$$} />
            <LikeButton feedId={feed.id} isLike={feed.$activity?.isLike} likeCount={feed.likeCount} />
        </div>
    );
};
