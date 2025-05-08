import { Images } from '@lemon/assets';
import { useQueryState } from '@lemon/shared';
import { Tabs, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { LikedFeedList, PopularFeedList, TotalFeedList } from '../components';

import type { FeedType } from '@lemon/feeds';

export const FeedPage = () => {
    const [feedType, setFeedType] = useQueryState<FeedType>('type', { defaultValue: 'all' });

    return (
        <Tabs
            defaultValue={feedType}
            value={feedType}
            onValueChange={value => setFeedType(value as FeedType)}
            className="flex h-full flex-1 flex-col"
        >
            <header className="bg-background sticky top-0 z-50">
                <div className="flex h-12 w-full flex-none items-center px-4">
                    <img src={Images.feedPageLogo} />
                </div>
                <TabsList className="sticky top-0 w-full flex-none justify-start border-b">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="popular">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
            </header>
            <div className="flex-1">
                {feedType === 'all' && <TotalFeedList />}
                {feedType === 'popular' && <PopularFeedList />}
                {feedType === 'liked' && <LikedFeedList />}
            </div>
        </Tabs>
    );
};
