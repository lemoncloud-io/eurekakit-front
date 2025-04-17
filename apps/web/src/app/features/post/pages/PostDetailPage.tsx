import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChevronLeft, Loader2, User2Icon } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';
import { Button } from '@lemon/ui-kit/components/ui/button';

import { useNavigate } from '../../../hooks';
import { Post } from '../components';
import { CommentList } from '../components/comment-list';

interface UserProfileProps {
    src?: string;
}

export const UserProfile = ({ src }: UserProfileProps) => {
    const [isImageError, setIsImageError] = useState(false);

    return (
        <span className="text-background bg-foreground flex aspect-square h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full">
            {!!src && !isImageError ? <img src={src} onError={() => setIsImageError(true)} /> : <User2Icon size={16} />}
        </span>
    );
};

interface UserNickNameProps {
    nickname: string;
}

export const UserNickName = ({ nickname }: UserNickNameProps) => {
    return <span className="overflow-hidden text-ellipsis text-nowrap text-sm">{nickname}</span>;
};

export const PostDetailPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: post, isLoading } = useFetchFeed(params.postId);

    return (
        <div className="relative h-full overflow-x-hidden">
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
        </div>
    );
};
