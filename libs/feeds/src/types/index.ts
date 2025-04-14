import type { RequiredKeys } from '@lemon/shared';
import type { FeedListParam as OFeedListParam, FeedView as OFeedView, UserView } from '@lemoncloud/pets-socials-api';

export interface FeedListParam extends OFeedListParam {
    activity?: boolean;
    parent?: boolean;
}

export interface FeedView extends Omit<RequiredKeys<OFeedView, 'id' | 'name' | 'createdAt'>, 'user$'> {
    user$: RequiredKeys<UserView, 'id' | 'nick'>;
}
