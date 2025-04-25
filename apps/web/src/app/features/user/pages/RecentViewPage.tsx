import { ChevronLeft } from 'lucide-react';

import { useNavigate } from '../../../hooks';
import { RecentViewedFeedList } from '../components';

export const RecentViewPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-1 flex-col">
            <header className="flex h-12 flex-none items-center justify-between px-4">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} />
                </button>
                <span>최근 본 글</span>
                <div className="h-5 w-5" />
            </header>
            <RecentViewedFeedList />
        </div>
    );
};
