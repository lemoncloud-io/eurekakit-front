import { detailHandler } from './detail';
import { oauthHandler } from './oauth';

export const usersHandler = [...oauthHandler, ...detailHandler];
