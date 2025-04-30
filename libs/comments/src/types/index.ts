import type { Params } from '@lemoncloud/lemon-web-core';
import type {
    ActivityBody,
    ActivityParams,
    CommentBody as OCommentBody,
    CommentView as OCommentView,
} from '@lemoncloud/pets-socials-api';

export interface CommentView extends OCommentView {}

export interface CommentBody extends OCommentBody {}

export interface CommentListParams extends Params {}

export interface CommentActivityParams extends ActivityParams {}

export interface CommentActivityBody extends ActivityBody {
    reason?: string;
}
