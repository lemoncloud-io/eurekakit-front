import { useMutation } from '@tanstack/react-query';

import { likeFeed } from '../apis';

// TODO : @luke-lemon 낙관적 업데이트 구현
export const useLikeFeed = () => {
    return useMutation({
        mutationFn: ({ id, like }: { id?: string; like?: boolean }) => likeFeed(id, like),
    });
};
