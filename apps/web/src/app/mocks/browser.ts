import { setupWorker } from 'msw/browser';

import { commentsHandler } from '@lemon/comments/mocks';
import { feedsHandler } from '@lemon/feeds/mocks';
import { uploadHandler } from '@lemon/uploads/mocks';
import { usersHandler } from '@lemon/users/mocks';

export const worker = setupWorker(...feedsHandler, ...commentsHandler, ...usersHandler, ...uploadHandler);
