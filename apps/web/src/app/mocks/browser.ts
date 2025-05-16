import { setupWorker } from 'msw/browser';

import { commentsHandler } from '@lemon/comments';
import { feedsHandler } from '@lemon/feeds';
import { usersHandler } from '@lemon/users';

export const worker = setupWorker(...feedsHandler, ...commentsHandler, ...usersHandler);
