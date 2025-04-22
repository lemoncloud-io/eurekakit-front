import { useMutation } from '@tanstack/react-query';

import { createComment } from '../apis/createComment';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const useCrerateComment = () =>
    useMutation({
        mutationFn: ({ feedId, body }: { feedId?: string; body?: FeedBody }) => createComment(feedId, body),
    });
