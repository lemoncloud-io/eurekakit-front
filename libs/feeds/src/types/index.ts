import type { RequiredKeys } from '@lemon/shared';
import type { UserView } from '@lemon/users';
import type { FeedListParam as OFeedListParam, FeedView as OFeedView } from '@lemoncloud/pets-socials-api';

export type FeedType = 'all' | 'popular' | 'liked';

export interface FeedListParam extends OFeedListParam {
    type?: FeedType;
    activity?: boolean;
    parent?: boolean;
    sort?: 'popular' | 'asc' | 'desc';
    image?: boolean;
}

export interface FeedView extends Omit<RequiredKeys<OFeedView, 'id' | 'createdAt' | 'text' | 'userId'>, 'user$'> {
    user$: UserView;
}
