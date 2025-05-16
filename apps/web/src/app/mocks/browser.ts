import { setupWorker } from 'msw/browser';

import { commentsHandler } from '@lemon/comments';
import { feedsHandler } from '@lemon/feeds';

export const worker = setupWorker(...feedsHandler, ...commentsHandler);
