import { type ComponentProps, type ReactNode, useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { List } from '@lemon/ui-kit/components/ui/list';

import { useIsIntersecting } from '../../hooks';

interface InfiniteListProps extends ComponentProps<typeof List> {
    trigger?: ReactNode;
    isFetching?: boolean;
    hasNextPage?: boolean;
    fetchFn?: any;
}

export const InfiniteList = ({
    children,
    trigger,
    isFetching,
    hasNextPage,
    fetchFn,
    ...listProps
}: InfiniteListProps) => {
    const { setRef, isIntersecting } = useIsIntersecting();

    useEffect(() => {
        if (isIntersecting) {
            fetchFn();
        }
    }, [isIntersecting, fetchFn]);

    return (
        <List ref={setRef} {...listProps}>
            {children}
            {hasNextPage &&
                (trigger ? (
                    <div ref={setRef}>hello{trigger}</div>
                ) : (
                    <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                        {isFetching && <Loader2 className="animate-spin" />}
                    </div>
                ))}
        </List>
    );
};
