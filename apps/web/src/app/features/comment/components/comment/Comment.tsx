import { useWebCoreStore } from '@lemon/web-core';

import { CommentHeader } from './CommentHeader';
import { ImageListViewer, LikeButton } from '../../../../components';

import type { FeedView } from '@lemon/feeds';
import type { RequiredKeys } from '@lemon/shared';

interface CommentProps {
    comment: RequiredKeys<FeedView, 'parentId'>;
}

export const Comment = ({ comment }: CommentProps) => {
    const { profile } = useWebCoreStore();

    return (
        <div className="flex flex-col items-start gap-2 px-4 pb-4 pt-2">
            <CommentHeader
                commentId={comment.id}
                postId={comment.parentId}
                profileImg={comment.user$?.image}
                nickname={comment.user$?.nick ?? profile?.$user.nick}
                createdAt={comment.createdAt}
                isMe={profile?.uid === comment.userId}
            />
            <div className="whitespace-pre-line break-all">{comment.text}</div>
            <ImageListViewer images={comment.image$$} />
            <LikeButton postId={comment.id} isLike={comment.$activity?.isLike} likeCount={comment.likeCount} />
        </div>
    );
};
