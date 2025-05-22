import { ChevronRight } from 'lucide-react';

import { useFetchInfiniteUserFeedList } from '@lemon/feeds';
import { buttonVariants } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchProfile } from '@lemon/users';

import { ErrorWithRetry, Link } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';
import { Feed, FeedSkeleton } from '../../../feed/components';

const UserFeedListSkeleton = () => (
    <List seperator={<Separator />}>
        {Array.from({ length: window.innerHeight / 120 - 2 }).map((_, idx) => (
            <FeedSkeleton key={idx} />
        ))}
    </List>
);

const UserFeedListEmptyFallback = () => (
    <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
        <div className="flex flex-col items-center justify-center">
            <span>글 작성을 아직 안하셨군요!</span>
            <span>다양한 이야기로 다른 사용자들과 소통해 보세요!</span>
        </div>
        <Link
            to="/feed/create"
            className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'gap-1 pl-8 pr-6' })}
        >
            글 작성하러 가기
            <ChevronRight />
        </Link>
    </div>
);

const UserFeedListContent = () => {
    const { data: profile } = useFetchProfile();

    const {
        data: feedList,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useFetchInfiniteUserFeedList(profile?.id);

    return (
        <InfiniteFetchedList
            items={feedList?.list}
            renderItem={feed => (
                <Link to={`/feed/${feed.id}`} key={feed.id}>
                    <Feed feed={feed} />
                </Link>
            )}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            emptyFallBack={<UserFeedListEmptyFallback />}
            className="overflow-x-hidden"
        />
    );
};

export const UserFeedList = withQueryErrorBoundary(
    withSuspense(UserFeedListContent, <UserFeedListSkeleton />),
    errorProps => <ErrorWithRetry {...errorProps} className="h-full" />
);
