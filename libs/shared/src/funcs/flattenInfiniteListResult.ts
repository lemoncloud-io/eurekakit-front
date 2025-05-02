import type { ListResult } from '../types';
import type { View } from '@lemoncloud/codes-backend-api/dist/cores/types';
import type { InfiniteData } from '@tanstack/react-query';

export const flattenInfiniteListResult = <L extends ListResult<V>, V extends View>(data: InfiniteData<L, number>) =>
    data.pages.reduce((acc, pageData) => {
        Object.entries(pageData).map(([key, value]) => {
            if (Array.isArray(value)) {
                acc = { ...acc, [key]: [...(acc[key] ?? []), ...value] };
            } else {
                acc = { ...acc, [key]: value };
            }
        });

        return acc;
    }, {} as L);
