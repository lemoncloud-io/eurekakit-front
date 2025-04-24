import { ChevronRight, Search } from 'lucide-react';

import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { InfiniteList } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { Post } from '../../../post/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';

export const NoFeedPost = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
                <span>아직 등록된 게시물이 없습니다.</span>
                <span>{`다양한 이야기로 다른 사용자들과 소통해 보세요 :)`}</span>
            </div>
            <Button
                className="gap-1 pl-6 pr-4"
                variant={'secondary'}
                size={'lg'}
                onClick={() => navigate('/post/create')}
            >
                글 작성하러 가기 <ChevronRight />
            </Button>
        </div>
    );
};

export const TotalFeedList = () => {
    const { data: feedList, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchInfiniteFeedList();

    return isLoading ? (
        <List seperator={<Separator />}>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </List>
    ) : (
        <InfiniteList
            seperator={<Separator />}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            fetchFn={fetchNextPage}
            className="overflow-x-hidden"
        >
            {feedList?.list.map(feed => <Post key={feed.id} post={feed} />)}
        </InfiniteList>
    );
};

export const FeedPage = () => {
    return (
        <div className="w-full">
            <header className="flex h-12 w-full items-center px-4">
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
                <TabsContent value="hot" asChild></TabsContent>
            </Tabs>
        </div>
    );
};
