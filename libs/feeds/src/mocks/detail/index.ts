import { getHandler } from './get';
import { postHandler } from './post';
import { putHandler } from './put';

export const detailHandler = [...getHandler, ...putHandler, ...postHandler];
