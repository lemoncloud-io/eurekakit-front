import { InfiniteList, type InfiniteListProps } from '../infinite-list';

import type { View } from '@lemoncloud/pets-socials-api/dist/cores/types';

interface InfiniteFetchedListProps<T extends View> extends InfiniteListProps {
    items?: T[];
    renderItem: (item: T) => React.ReactNode | React.ReactNode[] | undefined | null;
    isLoading?: boolean;
    loadingFallback?: React.ReactNode;
    emptyFallBack?: React.ReactNode;
}

export const InfiniteFetchedList = <T extends View>({
    items = [],
    renderItem,
    isLoading,
    loadingFallback,
    emptyFallBack,
    ...infiniteListProps
}: InfiniteFetchedListProps<T>) => {
    if (isLoading) {
        return loadingFallback;
    }

    if (!items?.length) {
        return emptyFallBack;
    }

    return <InfiniteList {...infiniteListProps}>{items.map(renderItem)}</InfiniteList>;
};
