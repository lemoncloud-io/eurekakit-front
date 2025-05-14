import { useState } from 'react';

import { RotateCcw } from 'lucide-react';

import { useFetchFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';

import { FEED_GRID_COUNT, FEED_GRID_LIMIT } from '../../consts';
import { NoFeed } from '../no-feed';
import { FeedGridBlock } from './FeedGridBlock';
import { ErrorWithRetry } from '../../../../components';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';

const HomeFeedGridSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: FEED_GRID_COUNT })?.map((_, idx) => (
                <div key={idx} className="flex w-full flex-col gap-2">
                    <div className="bg-secondary aspect-square w-full animate-pulse rounded-lg" />
                    <div className="bg-secondary h-12 w-full animate-pulse rounded-lg" />
                </div>
            ))}
        </div>
    );
};

const HomeFeedGridContent = () => {
    const GRID_COUNT = FEED_GRID_COUNT;
    const [gridPageIdx, setGridPageIdx] = useState(0);
    const { data: feedList } = useFetchFeedList({ limit: FEED_GRID_LIMIT, sort: 'popular', image: true });

    const gridStartIdx = GRID_COUNT * gridPageIdx;
    const gridEndIdx = GRID_COUNT * (gridPageIdx + 1);
    const gridMaxPage = Math.ceil((feedList?.list?.length ?? 0) / GRID_COUNT);

    const gridFeedList = feedList?.list.slice(gridStartIdx, gridEndIdx);

    const changeGridPage = () => {
        setGridPageIdx(prev => (prev + 1) % gridMaxPage);
    };

    if (!feedList.total) {
        return <NoFeed />;
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                {gridFeedList?.map(feed => <FeedGridBlock key={feed.id} feed={feed} />)}
            </div>
            {GRID_COUNT < (feedList?.list.length ?? 0) && (
                <Button className="w-full gap-2" variant={'secondary'} onClick={changeGridPage}>
                    <RotateCcw />
                    인기글 새로 보기
                    <div />
                </Button>
            )}
        </>
    );
};

export const HomeFeedGrid = withQueryErrorBoundary(
    withSuspense(HomeFeedGridContent, <HomeFeedGridSkeleton />),
    ErrorWithRetry
);
