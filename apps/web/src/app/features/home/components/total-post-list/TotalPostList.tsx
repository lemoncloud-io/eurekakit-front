import { useQueryClient } from '@tanstack/react-query';

import { feedKeys, useFetchInfiniteFeedList, useLikeFeed } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import List from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { NoPost } from '../no-post';
import { PostListBlock } from '../post-block';

// TODO : 낙관적 업데이트 적용
export const TotalPostList = () => {
    const queryClient = useQueryClient();

    const { data: feedList, fetchNextPage, isFetching, hasNextPage } = useFetchInfiniteFeedList({ limit: 5 });
    const { mutate: changeLike } = useLikeFeed();

    const onChangeLike = (id: string, like?: boolean) => {
        const toBeLike = !like;

        changeLike(
            { id, like: toBeLike },
            { onSuccess: () => queryClient.invalidateQueries({ queryKey: feedKeys.lists() }) }
        );
    };

    return (
        <div className="flex flex-col p-4">
            <h3 className="font-semibold">전체글</h3>
            <Condition condition={!!feedList?.total} fallback={<NoPost />}>
                <List seperator={<Separator />} className="gap-3 py-3">
                    {feedList?.list.map(post => (
                        <PostListBlock key={post.id} post={post} onClickLike={like => onChangeLike(post.id, like)} />
                    ))}
                </List>
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
