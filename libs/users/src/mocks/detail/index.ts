import { getHandler } from './get';
import { putHandler } from './put';

export const detailHandler = [...getHandler, ...putHandler];
