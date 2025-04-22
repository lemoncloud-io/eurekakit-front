import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ChevronRight, Loader2 } from 'lucide-react';

import { useFetchFeed, useFetchInfiniteFeedCommentList } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { useIsIntersecting, useNavigate } from '../../../../hooks';
import { Comment } from '../../../comment/components';

export const CommentList = () => {
    const navigate = useNavigate();

    const { postId } = useParams();
    const { setRef, isIntersecting } = useIsIntersecting<HTMLDivElement>();

    const { data: post } = useFetchFeed(postId);

    const {
        data: commentList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchInfiniteFeedCommentList(postId);

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage();
        }
    }, [isIntersecting, fetchNextPage]);

    return (
        <div>
            <div className="bg-muted flex px-4 py-1.5 text-sm">
                <span>답글 {post?.childNo ?? 0}</span>
                <button
                    className="text-secondary-foreground ml-auto inline-flex items-center gap-1 text-xs"
                    onClick={() => navigate(`/comment/create?postId=${postId}`)}
                >
                    <span>답글 쓰기</span>
                    <ChevronRight size={16} />
                </button>
            </div>
            <List seperator={<Separator />} className="gap-3 py-3">
                {commentList?.list.map(comment => <Comment key={comment.id} comment={comment} />)}
            </List>
            {hasNextPage && (
                <>
                    <Separator />
                    <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                        {isFetchingNextPage && <Loader2 className="animate-spin" />}
                    </div>
                </>
            )}
        </div>
    );
};
