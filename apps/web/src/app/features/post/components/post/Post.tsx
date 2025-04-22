import { PostHeader } from './PostHeader';
import { ImageListViewer, LikeButton } from '../../../../components';

import type { FeedView } from '@lemon/feeds';

interface PostProps {
    post: FeedView;
}

export const Post = ({ post }: PostProps) => {
    return (
        <div className="flex flex-col items-start gap-2 overflow-hidden px-4">
            <PostHeader
                postId={post.id}
                profileImg={post.user$?.image}
                nickname={post.user$?.nick}
                createdAt={post.createdAt}
            />
            <div className="whitespace-pre-line break-all">{post.text}</div>
            <ImageListViewer images={post.image$$} />
            <LikeButton postId={post.id} isLike={post.$activity?.isLike} likeCount={post.likeCount} />
        </div>
    );
};
