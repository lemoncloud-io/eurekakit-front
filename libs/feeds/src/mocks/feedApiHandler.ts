import { feedCommentHandler } from './feedComments/feedCommentHandlers';
import { feedHandler } from './feeds/feedHandlers';

export const feedApiHander = [...feedHandler, ...feedCommentHandler];
