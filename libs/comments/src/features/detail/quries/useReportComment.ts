import { useMutation } from '@tanstack/react-query';

import { reportComment } from '../apis';

export const useReportComment = () => {
    return useMutation({
        mutationFn: ({ commentId, reason }: { commentId?: string; reason?: string }) =>
            reportComment(commentId, reason),
    });
};
