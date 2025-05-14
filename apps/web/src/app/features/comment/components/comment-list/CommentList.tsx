import { useParams } from 'react-router-dom';

import { useFetchInfiniteFeedCommentList } from '@lemon/comments';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { ErrorWithRetry } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';
import { Comment } from '../../../comment/components';
import { FeedSkeleton } from '../../../feed/components';

const CommentListSkeleton = () => (
    <List seperator={<Separator />}>
        <FeedSkeleton />
    </List>
);

const CommentListContent = () => {
    const params = useParams();

    const {
        data: commentList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchInfiniteFeedCommentList(params.feedId);

    return (
        <InfiniteFetchedList
            items={commentList?.list}
            renderItem={comment => <Comment key={comment.id} comment={comment} />}
            seperator={<Separator />}
            isFetching={isFetchingNextPage}
            fetchFn={fetchNextPage}
            showTrigger={hasNextPage}
            className="overflow-x-hidden"
        />
    );
};

export const CommentList = withQueryErrorBoundary(
    withSuspense(CommentListContent, <CommentListSkeleton />),
    ErrorWithRetry
);
