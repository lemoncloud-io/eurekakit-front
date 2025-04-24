import { Search } from 'lucide-react';

import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { InfiniteList } from '../../../../components';
import { Post } from '../../../post/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';

export const TotalFeedList = () => {
    const { data: feedList, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchInfiniteFeedList();

    return (
        <InfiniteList
            seperator={<Separator />}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            fetchFn={fetchNextPage}
            className="overflow-x-hidden"
        >
            {isLoading
                ? Array.from({ length: 5 }).map(() => <PostSkeleton />)
                : feedList?.list.map(feed => <Post post={feed} />)}
        </InfiniteList>
    );
};

export const FeedPage = () => {
    return (
        <div className="min-h-screen">
            <header className="flex h-12 items-center px-4">
                Feed
                <button className="ml-auto">
                    <Search size={20} />
                </button>
            </header>
            <Tabs defaultValue="all">
                <TabsList className="w-full justify-start border-b">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="hot">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
                <TabsContent value="all" asChild>
                    <TotalFeedList />
                </TabsContent>
            </Tabs>
        </div>
    );
};
