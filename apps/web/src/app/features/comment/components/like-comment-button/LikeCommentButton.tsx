import { useState } from 'react';

import { Heart } from 'lucide-react';

import { useLikeComment } from '@lemon/feeds';
import { formatCount } from '@lemon/shared';
import { cn, useToast } from '@lemon/ui-kit';

import type { ClassNameValue } from 'tailwind-merge';

interface LikeState {
    isLike: boolean;
    likeCount: number;
}

interface LikeButtonProps extends Partial<LikeState> {
    commentId: string;
    hideCount?: boolean;
    className?: ClassNameValue;
}

export const LikeCommentButton = ({
    commentId,
    isLike = false,
    likeCount = 0,
    hideCount = false,
    className,
}: LikeButtonProps) => {
    const { toast } = useToast();
    const [optimisticLike, setOptimisticLike] = useState<LikeState>({
        isLike,
        likeCount,
    });

    const { mutate: changeLike } = useLikeComment();

    const onChangeLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        setOptimisticLike(prev => {
            changeLike(
                { commentId, isLike: !prev.isLike },
                {
                    onError: onErrorChangeLike,
                }
            );

            return getNewLike(prev);
        });
    };

    return (
        <button className={cn('mt-1 flex items-center gap-1 text-xs', className)} onClick={e => onChangeLike(e)}>
            <Heart size={16} className={cn(optimisticLike.isLike && 'fill-like stroke-like')} />
            {!hideCount && !!optimisticLike.likeCount && <span>{formatCount(optimisticLike.likeCount)}</span>}
        </button>
    );

    function onErrorChangeLike(e: Error) {
        console.error(e);

        toast({
            description: '좋아요 변경에 실패했습니다.',
            variant: 'destructive',
        });

        setOptimisticLike(prev => getNewLike(prev));
    }

    function getNewLike(like: LikeState): LikeState {
        const newIsLike = !like.isLike;
        const newLikeCount = newIsLike ? like.likeCount + 1 : like.likeCount - 1;

        return { isLike: newIsLike, likeCount: newLikeCount };
    }
};
