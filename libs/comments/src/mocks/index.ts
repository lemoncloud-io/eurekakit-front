import { detailHandler } from './detail';
import { listHandler } from './list';

export const commentsHandler = [...listHandler, ...detailHandler];
