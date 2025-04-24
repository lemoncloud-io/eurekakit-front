import { type ComponentProps, useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { useIntersectionObserver } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';

interface InfiniteListProps extends ComponentProps<typeof List> {
    isFetching: boolean;
    showTrigger: boolean;
    fetchFn: (...params: any) => Promise<any>;
}

// TODO : 에러 시 표시 및 refetch 버튼 추가
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
