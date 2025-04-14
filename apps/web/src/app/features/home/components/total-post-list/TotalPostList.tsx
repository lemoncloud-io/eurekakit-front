import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';

import { NoPost } from '../no-post';
import { PostList } from '../post-list/PostList';

export const TotalPostList = () => {
    const { data: feedList, fetchNextPage, isFetching, hasNextPage } = useFetchInfiniteFeedList({ limit: 5 });

    return (
        <div className="flex flex-col p-4">
            <h3 className="font-semibold">전체글</h3>
            <Condition condition={!!feedList?.total} fallback={<NoPost />}>
                <PostList postList={feedList?.list} />
                <Condition condition={hasNextPage}>
                    <Button
                        className="w-full gap-2"
                        variant={'secondary'}
                        onClick={() => fetchNextPage()}
                        isLoading={isFetching}
                    >
                        더보기
                    </Button>
                </Condition>
            </Condition>
        </div>
    );
};
