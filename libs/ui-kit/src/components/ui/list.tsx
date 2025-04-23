import React, { forwardRef } from 'react';

import { cn } from '../../lib/utils';

import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

export interface ListProps extends PropsWithChildren, ComponentPropsWithRef<'div'> {
    seperator?: JSX.Element;
    horizontal?: boolean;
    showLeadingSeparator?: boolean;
    showTrailingSeparator?: boolean;
}

export const List = forwardRef<HTMLDivElement, ListProps>(
    ({ children, className, seperator, horizontal, showLeadingSeparator, showTrailingSeparator, ...props }, ref) => {
        return (
            <div className={cn('flex w-full flex-col', horizontal && 'flex-row', className)} {...props} ref={ref}>
                {showLeadingSeparator && seperator && seperator}
                {React.Children.map(children, (child, idx) => {
                    return (
                        <>
                            {idx !== 0 && seperator && seperator}
                            {child}
                        </>
                    );
                })}
                {showTrailingSeparator && seperator && seperator}
            </div>
        );
    }
);
