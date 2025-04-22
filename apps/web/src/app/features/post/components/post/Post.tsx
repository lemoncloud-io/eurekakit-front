import { PostHeader } from './PostHeader';
import { PostImageViewer } from './PostImageViewer';
import { PostLikeButton } from './PostLikeButton';

import type { FeedView } from '@lemon/feeds';

interface PostProps {
    post: FeedView;
}

export const Post = ({ post }: PostProps) => {
    return (
        <div className="flex flex-col items-start gap-2 px-4">
            <PostHeader
                postId={post.id}
                profileImg={post.user$?.image}
                nickname={post.user$?.nick}
                createdAt={post.createdAt}
            />
            <div className="break-all">{post.text}</div>
            {post.image$$ && <PostImageViewer images={post.image$$} />}
            <PostLikeButton postId={post.id} isLike={post.$activity?.isLike} likeCount={post.likeCount} />
        </div>
    );
};
