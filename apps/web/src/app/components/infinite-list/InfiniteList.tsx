import { type ComponentProps, useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { useIntersectionObserver } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';

export interface InfiniteListProps extends ComponentProps<typeof List> {
    isFetching: boolean;
    showTrigger: boolean;
    fetchFn: (...params: any) => Promise<any>;
}

export const InfiniteList = ({ children, isFetching, showTrigger, fetchFn, ...listProps }: InfiniteListProps) => {
    const { setRef, isIntersecting } = useIntersectionObserver();

    useEffect(() => {
        if (isIntersecting) {
            fetchFn();
        }
    }, [isIntersecting, fetchFn]);

    return (
        <List {...listProps}>
            {children}
            {showTrigger && (
                <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                    {isFetching && <Loader2 className="animate-spin" />}
                </div>
            )}
        </List>
    );
};
