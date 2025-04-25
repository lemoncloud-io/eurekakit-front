import { ChevronLeft } from 'lucide-react';

import { useQueryState } from '@lemon/shared';
import { Tabs, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

import { useNavigate } from '../../../hooks';
import { UserCommentList, UserFeedList } from '../components';

type ActivityViewType = 'feeds' | 'comments';

export const UserActivityPage = () => {
    const [view, setView] = useQueryState<ActivityViewType>('view', { defaultValue: 'feeds' });
    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-1 flex-col">
            <header className="flex h-12 flex-none items-center justify-between px-4">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} />
                </button>
                <span>내 활동 내역</span>
                <div className="h-5 w-5" />
            </header>
            <Tabs
                defaultValue="feeds"
                value={view}
                onValueChange={value => setView(value as ActivityViewType, { replace: true })}
                className="flex flex-1 flex-col"
            >
                <TabsList className="w-full flex-none justify-start">
                    <TabsTrigger value="feeds">내가 쓴 글</TabsTrigger>
                    <TabsTrigger value="comments">내가 쓴 답글</TabsTrigger>
                </TabsList>
                {view === 'feeds' && <UserFeedList />}
                {view === 'comments' && <UserCommentList />}
            </Tabs>
        </div>
    );
};
