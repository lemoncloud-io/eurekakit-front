import { feedCommentHandler } from './feedCommentHandlers';
import { feedHandler } from './feedHandlers';

export const feedApiHander = [...feedHandler, ...feedCommentHandler];
