import { Search } from 'lucide-react';

import { Images } from '@lemon/assets';
import { useQueryState } from '@lemon/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { LikedFeedList, TotalFeedList } from '../../components';

import type { FeedType } from '@lemon/feeds';

export const FeedPage = () => {
    const [feedType, setFeedType] = useQueryState<FeedType>('type', { defaultValue: 'all' });

    return (
        <div className="flex h-full flex-col">
            <header className="flex h-12 w-full flex-none items-center px-4">
                <img src={Images.feedPageLogo} />
                <button className="ml-auto">
                    <Search size={20} />
                </button>
            </header>
            <Tabs
                defaultValue={feedType}
                value={feedType}
                onValueChange={value => setFeedType(value as FeedType)}
                className="flex flex-1 flex-col"
            >
                <TabsList className="w-full flex-none justify-start border-b">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="hot">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex-1">
                    <TotalFeedList />
                </TabsContent>
                <TabsContent value="hot" className="flex-1">
                    <div className="flex h-full items-center justify-center">
                        <span>준비 중입니다.</span>
                    </div>
                </TabsContent>
                <TabsContent value="liked" className="flex-1">
                    <LikedFeedList />
                </TabsContent>
            </Tabs>
        </div>
    );
};
