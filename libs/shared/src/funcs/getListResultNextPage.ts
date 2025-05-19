import type { ListResult } from '../types';
import type { View } from '@lemoncloud/codes-backend-api/dist/cores/types';

export const getListResultNextPage = <T extends View>(lastPage: ListResult<T>) => {
    const { page, total, limit } = lastPage;

    if (page == null || total == null || limit == null) {
        return undefined;
    }

    const maxPages = Math.ceil(total / limit);

    return page + 1 < maxPages ? page + 1 : undefined;
};
