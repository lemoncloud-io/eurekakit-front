import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchInfiniteUserCommentList } from '@lemon/users';
import { useWebCoreStore } from '@lemon/web-core';

import { InfiniteList } from '../../../../components';
import { Comment } from '../../../comment/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';

export const UserCommentList = () => {
    const { profile } = useWebCoreStore();

    const {
        data: commentList,
        hasNextPage,
        isFetching,
        fetchNextPage,
        isLoading,
    } = useFetchInfiniteUserCommentList(profile?.uid);

    const isEmptyList = commentList?.total === 0;

    if (isLoading) {
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
            {commentList?.list.map(comment => <Comment comment={comment} />)}
        </InfiniteList>
    );
};
