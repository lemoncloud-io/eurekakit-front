import { useMutation } from '@tanstack/react-query';

import { likeComment } from '../apis';

export const useLikeComment = () => {
    return useMutation({
        mutationFn: ({ commentId, isLike }: { commentId?: string; isLike?: boolean }) => likeComment(commentId, isLike),
    });
};
