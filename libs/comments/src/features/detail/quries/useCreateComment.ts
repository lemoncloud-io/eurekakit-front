import { useMutation } from '@tanstack/react-query';

import { createComment } from '../apis';

import type { CommentBody } from '../../../types';
export const useCrerateComment = () =>
    useMutation({
        mutationFn: ({ feedId, body }: { feedId?: string; body?: CommentBody }) => createComment(feedId, body),
    });
