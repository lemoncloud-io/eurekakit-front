import { Search } from 'lucide-react';

import { useFetchFeedList } from '@lemon/feeds';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { Post } from '../../../post/components';

export const FeedPage = () => {
    const { data: feedList } = useFetchFeedList();

    return (
        <div className="min-h-screen">
            <header className="flex h-12 items-center px-4">
                Feed
                <button className="ml-auto">
                    <Search size={20} />
                </button>
            </header>
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="hot">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
                <TabsContent value="all">{feedList?.list.map(feed => <Post post={feed} />)}</TabsContent>
            </Tabs>
        </div>
    );
};
