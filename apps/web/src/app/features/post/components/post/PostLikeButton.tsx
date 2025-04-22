import { useState } from 'react';

import { Heart } from 'lucide-react';

import { useLikeFeed } from '@lemon/feeds';
import { formatCount } from '@lemon/shared';
import { cn, useToast } from '@lemon/ui-kit';

interface PostLikeButtonProps {
    postId: string;
    isLike?: boolean;
    likeCount?: number;
}

export const PostLikeButton = ({ postId, isLike, likeCount }: PostLikeButtonProps) => {
    const { toast } = useToast();
    const [optimisticIslIke, setOptimisticIsLike] = useState(isLike);

    const { mutate: changeLike } = useLikeFeed();

    const onChangeLike = (e: React.MouseEvent) => {
        e.preventDefault();

        setOptimisticIsLike(prev => {
            changeLike(
                { id: postId, like: !prev },
                {
                    onError: onErrorChangeLike,
                }
            );

            return !prev;
        });
    };

    return (
        <button className="mt-1 flex items-center gap-1 text-xs" onClick={e => onChangeLike(e)}>
            <Heart size={16} className={cn(optimisticIslIke && 'fill-like stroke-like')} />
            <span>{formatCount(likeCount)}</span>
        </button>
    );

    function onErrorChangeLike() {
        toast({
            description: '좋아요 변경에 실패했습니다.',
            variant: 'destructive',
        });
        setOptimisticIsLike(prev => !prev);
    }
};
