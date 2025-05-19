import { detailHandler } from './detail';
import { listHandler } from './lists';

export const feedsHandler = [...listHandler, ...detailHandler];
