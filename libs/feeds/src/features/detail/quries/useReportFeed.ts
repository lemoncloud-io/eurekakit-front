import { useMutation } from '@tanstack/react-query';

import { reportFeed } from '../apis/reportFeed';

export const useReportFeed = () => {
    return useMutation({
        mutationFn: ({ id, reason }: { id?: string; reason?: string }) => reportFeed(id, reason),
    });
};
