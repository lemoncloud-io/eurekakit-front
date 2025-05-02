import type { RequiredKeys } from '@lemon/shared';
import type { UserView } from '@lemon/users';
import type { Params } from '@lemoncloud/lemon-web-core';
import type {
    ActivityBody,
    ActivityParams,
    CommentBody as OCommentBody,
    CommentView as OCommentView,
} from '@lemoncloud/pets-socials-api';

export interface CommentView
    extends Omit<RequiredKeys<OCommentView, 'id' | 'createdAt' | 'userId' | 'feedId'>, 'user$'> {
    user$: UserView;
}

export interface CommentBody extends OCommentBody {}

export interface CommentListParams extends Params {}

export interface CommentActivityParams extends ActivityParams {}

export interface CommentActivityBody extends ActivityBody {
    reason?: string;
}
