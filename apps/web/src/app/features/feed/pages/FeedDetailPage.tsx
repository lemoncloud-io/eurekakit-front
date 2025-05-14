import { useParams } from 'react-router-dom';

import { ChevronRight, Loader2 } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';

import { useNavigate } from '../../../hooks';
import { CommentList } from '../../comment/components';
import { Feed } from '../components';

export const FeedDetailPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: feed, isLoading } = useFetchFeed(params.feedId);

    if (isLoading || !feed) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col gap-3">
            <Feed feed={feed} />
            <div>
                <div className="bg-muted flex px-4 py-1.5 text-sm">
                    <span>답글 {(feed?.commentPosted ?? 0) - (feed?.commentHidden ?? 0)}</span>
                    <button
                        className="text-secondary-foreground ml-auto inline-flex items-center gap-1 text-xs"
                        onClick={() => navigate(`/comment/create?feedId=${params.feedId}`)}
                    >
                        <span>답글 쓰기</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
                <CommentList />
            </div>
        </div>
    );
};
