import { useMutation } from '@tanstack/react-query';

import { deleteComment } from '../apis';

export const useDeleteComment = () => useMutation({ mutationFn: (commentId?: string) => deleteComment(commentId) });
