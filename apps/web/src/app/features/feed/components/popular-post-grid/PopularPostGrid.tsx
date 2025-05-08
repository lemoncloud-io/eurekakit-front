import { useState } from 'react';

import { RotateCcw } from 'lucide-react';

import { useFetchFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';

import { FEED_GRID_COUNT, FEED_GRID_LIMIT } from '../../consts';
import { PostGridBlock } from '../post-block';
import { SkeletonPostGrid } from './SkeletonPostGrid';
import { NoFeed } from '../no-feed';

export const PopularPostGrid = () => {
    const GRID_COUNT = FEED_GRID_COUNT;
    const [gridPageIdx, setGridPageIdx] = useState(0);
    const { data: feedList, isLoading } = useFetchFeedList({ limit: FEED_GRID_LIMIT, sort: 'popular', image: true });

    const gridStartIdx = GRID_COUNT * gridPageIdx;
    const gridEndIdx = GRID_COUNT * (gridPageIdx + 1);
    const gridMaxPage = Math.ceil((feedList?.list?.length ?? 0) / GRID_COUNT);

    const gridFeedList = feedList?.list
        .sort((a, b) => Number(b.likeCount) - Number(a.likeCount))
        .slice(gridStartIdx, gridEndIdx);

    const changeGridPage = () => {
        setGridPageIdx(prev => (prev + 1) % gridMaxPage);
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            <h3 className="font-semibold">인기글</h3>
            <div className="flex flex-col gap-3 py-1">
                <Condition condition={!isLoading} fallback={<SkeletonPostGrid />}>
                    <Condition condition={!!feedList?.total} fallback={<NoFeed />}>
                        <div className="grid grid-cols-2 gap-2">
                            {gridFeedList?.map(post => <PostGridBlock key={post.id} post={post} />)}
                        </div>
                    </Condition>
                    <Condition condition={GRID_COUNT < (feedList?.list.length ?? 0)}>
                        <Button className="w-full gap-2" variant={'secondary'} onClick={changeGridPage}>
                            <RotateCcw />
                            인기글 새로 보기
                            <div />
                        </Button>
                    </Condition>
                </Condition>
            </div>
        </div>
    );
};
