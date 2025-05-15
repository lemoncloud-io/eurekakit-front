import { setupWorker } from 'msw/browser';

import { feedsHandler } from '@lemon/feeds';

export const worker = setupWorker(...feedsHandler);
