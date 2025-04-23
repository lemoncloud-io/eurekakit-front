import { useParams } from 'react-router-dom';

import { ChevronRight } from 'lucide-react';

import { useFetchFeed, useFetchInfiniteFeedCommentList } from '@lemon/feeds';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { Comment } from '../../../comment/components';

import type { FeedView } from '@lemon/feeds';
import type { RequiredKeys } from '@lemon/shared';

export const CommentList = () => {
    const navigate = useNavigate();

    const { postId } = useParams();

    const { data: post } = useFetchFeed(postId);

    const {
        data: commentList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchInfiniteFeedCommentList(postId);

    return (
        <div>
            <div className="bg-muted flex px-4 py-1.5 text-sm">
                <span>답글 {post?.childNo ?? 0}</span>
                <button
                    className="text-secondary-foreground ml-auto inline-flex items-center gap-1 text-xs"
                    onClick={() => navigate(`/comment/create?postId=${postId}`)}
                >
                    <span>답글 쓰기</span>
                    <ChevronRight size={16} />
                </button>
            </div>
            <InfiniteList
                isFetching={isFetchingNextPage}
                fetchFn={fetchNextPage}
                showTrigger={hasNextPage}
                seperator={<Separator />}
            >
                {commentList?.list
                    .filter((comment): comment is RequiredKeys<FeedView, 'parentId'> => !!comment.parentId)
                    .map(comment => <Comment key={comment.id} comment={comment} />)}
            </InfiniteList>
        </div>
    );
};
