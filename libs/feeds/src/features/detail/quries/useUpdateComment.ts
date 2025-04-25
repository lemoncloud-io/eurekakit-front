import { useMutation } from '@tanstack/react-query';

import { updateComment } from '../apis';

import type { CommentBody } from '@lemoncloud/pets-socials-api';

export const useUpdateComment = () =>
    useMutation({
        mutationFn: ({ commentId, body }: { commentId?: string; body?: CommentBody }) => updateComment(commentId, body),
    });
