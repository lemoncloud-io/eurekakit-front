import { type ComponentProps, useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { useIntersectionObserver } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';

export interface InfiniteListProps extends ComponentProps<typeof List> {
    isFetching: boolean;
    showTrigger: boolean;
    fetchFn: (...params: any) => Promise<any>;
    triggerType?: 'scroll' | 'button';
}

export const InfiniteList = ({
    children,
    isFetching,
    showTrigger,
    fetchFn,
    triggerType = 'scroll',
    ...listProps
}: InfiniteListProps) => {
    const { setRef, isIntersecting } = useIntersectionObserver();

    useEffect(() => {
        if (triggerType !== 'scroll') {
            return;
        }

        if (isIntersecting) {
            fetchFn();
        }
    }, [isIntersecting, fetchFn, triggerType]);

    return (
        <>
            <List {...listProps}>{children}</List>
            {showTrigger &&
                (triggerType === 'button' ? (
                    <Button
                        className="w-full gap-2"
                        variant={'secondary'}
                        onClick={() => fetchFn()}
                        isLoading={isFetching}
                    >
                        더보기
                    </Button>
                ) : (
                    <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                        {isFetching && <Loader2 className="animate-spin" />}
                    </div>
                ))}
        </>
    );
};
