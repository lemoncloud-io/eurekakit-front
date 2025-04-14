import type { FeedListParam } from '@lemoncloud/pets-socials-api';

export interface FeedListParams extends FeedListParam {
    activity?: boolean;
    parent?: boolean;
}
