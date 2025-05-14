import { useQueryState } from '@lemon/shared';
import { Tabs, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { UserCommentList, UserFeedList } from '../components';

type ActivityViewType = 'feeds' | 'comments';

export const UserActivityPage = () => {
    const [view, setView] = useQueryState<ActivityViewType>('view', { defaultValue: 'feeds' });

    return (
        <Tabs
            defaultValue="feeds"
            value={view}
            onValueChange={value => setView(value as ActivityViewType, { replace: true })}
            className="flex h-full flex-col"
        >
            <TabsList className="w-full flex-none justify-start">
                <TabsTrigger value="feeds">내가 쓴 글</TabsTrigger>
                <TabsTrigger value="comments">내가 쓴 답글</TabsTrigger>
            </TabsList>
            {view === 'feeds' && <UserFeedList />}
            {view === 'comments' && <UserCommentList />}
        </Tabs>
    );
};
