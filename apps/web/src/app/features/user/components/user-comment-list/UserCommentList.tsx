import { useFetchInfiniteUserCommentList } from '@lemon/comments';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchProfile } from '@lemon/users';

import { InfiniteList } from '../../../../components';
import { Comment } from '../../../comment/components';
import { PostSkeleton } from '../../../feed/components/post/PostSkeleton';

export const UserCommentList = () => {
    const { data: profile, isLoading: isProfileLoading } = useFetchProfile();

    const {
        data: commentList,
        hasNextPage,
        isFetching,
        fetchNextPage,
        isLoading,
    } = useFetchInfiniteUserCommentList(profile?.id);

    const isEmptyList = commentList?.total === 0;

    if (isLoading || isProfileLoading) {
        return (
            <List seperator={<Separator />}>
                {Array.from({ length: window.innerHeight / 120 - 2 }).map(() => (
                    <PostSkeleton />
                ))}
            </List>
        );
    }

    if (isEmptyList) {
        return (
            <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
                <span>내가 쓴 답글이 없습니다.</span>
            </div>
        );
    }

    return (
        <InfiniteList
            showTrigger={hasNextPage}
            isFetching={isFetching}
            fetchFn={fetchNextPage}
            seperator={<Separator />}
            className="overflow-x-hidden"
        >
            {commentList?.list
                .map(comment => ({ ...comment, user$: profile! }))
                .map(comment => <Comment key={comment.id} comment={comment} />)}
        </InfiniteList>
    );
};
