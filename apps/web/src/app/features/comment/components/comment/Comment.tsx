import { useFetchProfile } from '@lemon/users';

import { CommentHeader } from './CommentHeader';
import { ImageCarouselViewer } from '../../../../components';
import { LikeCommentButton } from '../like-comment-button';

import type { CommentView } from '@lemon/comments';

interface CommentProps {
    comment: CommentView;
}

export const Comment = ({ comment }: CommentProps) => {
    const { data: profile } = useFetchProfile();

    return (
        <div className="flex flex-col items-start gap-2 px-4 pb-4 pt-2">
            <CommentHeader
                commentId={comment.id}
                feedId={comment.feedId}
                profileImg={comment.user$?.image}
                nickname={comment.user$?.nick}
                createdAt={comment.createdAt}
                isMe={profile?.id === comment.userId}
            />
            <div className="whitespace-pre-line break-all">{comment.text}</div>
            <ImageCarouselViewer images={comment.image$$} />
            <LikeCommentButton
                commentId={comment.id}
                isLike={comment.$activity?.isLike}
                likeCount={comment.likeCount}
            />
        </div>
    );
};
