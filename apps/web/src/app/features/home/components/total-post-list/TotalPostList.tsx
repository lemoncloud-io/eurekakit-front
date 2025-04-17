import { useQueryClient } from '@tanstack/react-query';

import { feedKeys, useFetchInfiniteFeedList, useLikeFeed } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { INFINITE_POST_LIST_LIMIT } from '../../consts';
import { NoPost } from '../no-post';
import { PostListBlock } from '../post-block';
import { SkeletonPostList } from './SkeletonPostList';

// TODO : @luke-lemon 낙관적 업데이트 적용
export const TotalPostList = () => {
    const queryClient = useQueryClient();

    const {
        data: feedList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
    } = useFetchInfiniteFeedList({ limit: INFINITE_POST_LIST_LIMIT });

    const { mutate: changeLike } = useLikeFeed();

    const onChangeLike = (e: React.MouseEvent, id: string, like?: boolean) => {
        e.preventDefault();

        const isLike = !like;

        changeLike(
            { id, like: isLike },
            { onSuccess: () => queryClient.invalidateQueries({ queryKey: feedKeys.lists() }) }
        );
    };

    return (
        <div className="flex flex-col p-4">
            <h3 className="font-semibold">전체글</h3>
            <Condition condition={!isLoading} fallback={<SkeletonPostList />}>
                <Condition condition={!!feedList?.total} fallback={<NoPost />}>
                    <List seperator={<Separator />} className="gap-3 py-3">
                        {feedList?.list.map(post => (
                            <PostListBlock
                                key={post.id}
                                post={post}
                                onClickLike={(e, like) => onChangeLike(e, post.id, like)}
                            />
                        ))}
                    </List>
                    <Condition condition={hasNextPage}>
                        <Button
                            className="w-full gap-2"
                            variant={'secondary'}
                            onClick={() => fetchNextPage()}
                            isLoading={isFetchingNextPage}
                        >
                            더보기
                        </Button>
                    </Condition>
                </Condition>
            </Condition>
        </div>
    );
};
