import { useMutation } from '@tanstack/react-query';

import { likeFeed } from '../apis';

export const useLikeFeed = () => {
    return useMutation({
        mutationFn: ({ id, like }: { id?: string; like?: boolean }) => likeFeed(id, like),
    });
};
