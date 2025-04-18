import { useMutation } from '@tanstack/react-query';

import { updateFeed } from '../apis';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const useUpdateFeed = () =>
    useMutation({
        mutationFn: ({ id, body }: { id?: string; body?: FeedBody }) => updateFeed(id, body),
    });
