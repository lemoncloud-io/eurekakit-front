import { useState } from 'react';

import { RotateCcw } from 'lucide-react';

import { useFetchFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Condition } from '@lemon/ui-kit/components/ui/condition';

import { NoPost } from '../no-post';
import { PostGridBlock } from '../post-block';

export const HotPostGrid = () => {
    const GRID_COUNT = 4;
    const [gridPageIdx, setGridPageIdx] = useState(0);
    const { data: feedList } = useFetchFeedList({ limit: 20 });

    const gridStartIdx = GRID_COUNT * gridPageIdx;
    const gridEndIdx = GRID_COUNT * (gridPageIdx + 1);

    // TODO : @luke-lemon 임시로 최신 순 20개를 가져와 인기순으로 정렬
    const gridFeedList = feedList?.list
        .sort((a, b) => Number(b.likeCount) - Number(a.likeCount))
        .slice(gridStartIdx, gridEndIdx);

    const changeGridPage = () => {
        setGridPageIdx(prev => (prev + 1) % 5);
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            <h3 className="font-semibold">인기글</h3>
            <div className="flex flex-col gap-3 py-1">
                <Condition condition={!!feedList?.total} fallback={<NoPost />}>
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
            </div>
        </div>
    );
};
