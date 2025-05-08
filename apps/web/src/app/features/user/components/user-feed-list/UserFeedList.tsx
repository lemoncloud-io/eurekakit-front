import { ChevronRight } from 'lucide-react';

import { useFetchInfiniteUserFeedList } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchProfile } from '@lemon/users';

import { InfiniteList, Link } from '../../../../components';
import { Feed, FeedSkeleton } from '../../../feed/components';

export const UserFeedList = () => {
    const { data: profile, isLoading: isProfileLoading } = useFetchProfile();

    const {
        data: feedList,
        hasNextPage,
        isFetching,
        fetchNextPage,
        isLoading,
    } = useFetchInfiniteUserFeedList(profile?.id);

    const isEmptyList = feedList?.total === 0;

    if (isLoading || isProfileLoading) {
        return (
            <List seperator={<Separator />}>
                {Array.from({ length: window.innerHeight / 120 - 2 }).map(() => (
                    <FeedSkeleton />
                ))}
            </List>
        );
    }

    if (isEmptyList) {
        return (
            <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
                <div className="flex flex-col items-center justify-center">
                    <span>글 작성을 아직 안하셨군요!</span>
                    <span>다양한 이야기로 다른 사용자들과 소통해 보세요!</span>
                </div>
                <Button variant={'secondary'} className="gap-1 pl-8 pr-6" size={'lg'}>
                    글 작성하러 가기
                    <ChevronRight />
                </Button>
            </div>
        );
    }

    return (
        <InfiniteList
            showTrigger={hasNextPage}
            isFetching={isFetching}
            fetchFn={fetchNextPage}
            seperator={<Separator />}
            className="overflow-x-hidden"
        >
            {feedList?.list
                .map(feed => ({ ...feed, user$: profile! }))
                .map(feed => (
                    <Link to={`/feed/${feed.id}`} key={feed.id}>
                        <Feed feed={feed} />
                    </Link>
                ))}
        </InfiniteList>
    );
};
