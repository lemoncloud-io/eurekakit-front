import { setupWorker } from 'msw/browser';

import { feedApiHander } from '@lemon/feeds';

export const worker = setupWorker(...feedApiHander);
