import { Search } from 'lucide-react';

import { Images } from '@lemon/assets';
import { useQueryState } from '@lemon/shared';
import { Tabs, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { LikedFeedList, TotalFeedList } from '../../components';

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
                    <button className="ml-auto">
                        <Search size={20} />
                    </button>
                </div>
                <TabsList className="sticky top-0 w-full flex-none justify-start border-b">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="hot">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
            </header>
            <div className="flex-1">
                {feedType === 'all' && <TotalFeedList />}
                {feedType === 'hot' && (
                    <div className="flex h-full items-center justify-center">
                        <span>준비 중입니다.</span>
                    </div>
                )}
                {feedType === 'liked' && <LikedFeedList />}
            </div>
        </Tabs>
    );
};
