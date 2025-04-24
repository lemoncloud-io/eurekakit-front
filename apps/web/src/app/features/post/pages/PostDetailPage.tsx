import { useParams } from 'react-router-dom';

import { ChevronLeft, Loader2 } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';

import { useNavigate } from '../../../hooks';
import { Post } from '../components';
import { CommentList } from '../components/comment-list';

export const PostDetailPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: post, isLoading } = useFetchFeed(params.postId);

    return (
        <>
            <header className="bg-background sticky top-0 z-50 flex h-12 items-center px-2">
                <Button variant={'ghost'} size={'icon'} onClick={() => navigate(-1)}>
                    <ChevronLeft />
                </Button>
            </header>
            {!isLoading && !!post ? (
                <div className="flex h-[calc(100%-48px)] flex-col gap-3">
                    <Post post={post} />
                    <CommentList />
                </div>
            ) : (
                <div className="flex h-[calc(100%-48px)] items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            )}
        </>
    );
};
