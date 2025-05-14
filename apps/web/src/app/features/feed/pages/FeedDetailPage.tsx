import { useParams } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';

import { useNavigate } from '../../../hooks';
import { CommentList } from '../../comment/components';
import { Feed } from '../components';

export const FeedDetailPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: feed, isLoading } = useFetchFeed(params.feedId);

    return (
        <>
            <header className="bg-background sticky top-0 z-50 flex h-12 items-center px-2">
                <Button variant={'ghost'} size={'icon'} onClick={() => navigate(-1)}>
                    <ChevronLeft />
                </Button>
            </header>
            {!isLoading && !!feed ? (
                <div className="flex h-[calc(100%-48px)] flex-col gap-3">
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
            ) : (
                <div className="flex h-[calc(100%-48px)] items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            )}
        </>
    );
};
