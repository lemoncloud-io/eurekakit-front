import { Search } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { TotalFeedList } from '../../components';

export const FeedPage = () => {
    return (
        <div className="flex h-full flex-col">
            <header className="flex h-12 w-full flex-none items-center px-4">
                Feed
                <button className="ml-auto">
                    <Search size={20} />
                </button>
            </header>
            <Tabs defaultValue="all" className="flex flex-1 flex-col">
                <TabsList className="w-full flex-none justify-start border-b">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="hot">인기글</TabsTrigger>
                    <TabsTrigger value="liked">좋아요</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex-1">
                    <TotalFeedList />
                </TabsContent>
                <TabsContent value="hot" asChild></TabsContent>
            </Tabs>
        </div>
    );
};
