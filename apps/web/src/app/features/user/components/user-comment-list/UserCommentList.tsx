import { useFetchInfiniteUserCommentList } from '@lemon/comments';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchProfile } from '@lemon/users';

import { ErrorWithRetry } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';
import { Comment } from '../../../comment/components';
import { FeedSkeleton } from '../../../feed/components';

const UserCommentListSkeleton = () => (
    <List seperator={<Separator />}>
        {Array.from({ length: window.innerHeight / 120 - 2 }).map(() => (
            <FeedSkeleton />
        ))}
    </List>
);

const UserCommentListEmptyFallback = () => (
    <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
        <span>내가 쓴 답글이 없습니다.</span>
    </div>
);

const UserCommentListContent = () => {
    const { data: profile } = useFetchProfile();

    const {
        data: commentList,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useFetchInfiniteUserCommentList(profile?.id);

    return (
        <InfiniteFetchedList
            items={commentList?.list}
            renderItem={comment => <Comment key={comment.id} comment={comment} />}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            emptyFallBack={<UserCommentListEmptyFallback />}
            className="overflow-x-hidden"
        />
    );
};

export const UserCommentList = withQueryErrorBoundary(
    withSuspense(UserCommentListContent, <UserCommentListSkeleton />),
    errorProps => <ErrorWithRetry {...errorProps} className="h-full" />
);
