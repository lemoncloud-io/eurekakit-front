import { NavLink } from 'react-router-dom';

import { cn } from '@lemon/ui-kit';

import type { NavLinkProps } from 'react-router-dom';

export const TabButton = ({ className, children, ...props }: NavLinkProps) => {
    return (
        <NavLink
            className={params =>
                cn(
                    params.isActive ? 'text-foreground' : 'text-muted-foreground',
                    typeof className === 'function' ? className(params) : className
                )
            }
            {...props}
        >
            {children}
        </NavLink>
    );
};
