import { useParams } from 'react-router-dom';

import { ChevronRight } from 'lucide-react';

import { useFetchInfiniteFeedCommentList } from '@lemon/comments';
import { useFetchFeed } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { Comment } from '../../../comment/components';
import { PostSkeleton } from '../post/PostSkeleton';

export const CommentList = () => {
    const navigate = useNavigate();

    const { postId } = useParams();

    const { data: post } = useFetchFeed(postId);

    const {
        data: commentList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
    } = useFetchInfiniteFeedCommentList(postId);

    return (
        <div>
            <div className="bg-muted flex px-4 py-1.5 text-sm">
                <span>답글 {(post?.commentPosted ?? 0) - (post?.commentHidden ?? 0)}</span>
                <button
                    className="text-secondary-foreground ml-auto inline-flex items-center gap-1 text-xs"
                    onClick={() => navigate(`/comment/create?feedId=${postId}`)}
                >
                    <span>답글 쓰기</span>
                    <ChevronRight size={16} />
                </button>
            </div>
            {(() => {
                if (isLoading) {
                    return (
                        <List seperator={<Separator />}>
                            <PostSkeleton />
                        </List>
                    );
                }

                return (
                    <InfiniteList
                        isFetching={isFetchingNextPage}
                        fetchFn={fetchNextPage}
                        showTrigger={hasNextPage}
                        seperator={<Separator />}
                        className="overflow-x-hidden"
                    >
                        {commentList?.list.map(comment => <Comment key={comment.id} comment={comment} />)}
                    </InfiniteList>
                );
            })()}
        </div>
    );
};
