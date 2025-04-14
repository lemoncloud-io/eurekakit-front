import { useMutation } from '@tanstack/react-query';

import { createFeed } from '../apis';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const useCrerateFeed = () =>
    useMutation({
        mutationFn: (body: FeedBody) => createFeed(body),
    });
