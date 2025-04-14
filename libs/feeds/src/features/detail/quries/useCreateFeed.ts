import { useMutation } from '@tanstack/react-query';

import { createFeed } from '../apis';

import type { MediaBody } from '@lemoncloud/lemon-uploads-api';

export const useCrerateFeed = () =>
    useMutation({
        mutationFn: (body: MediaBody) => createFeed(body),
    });
