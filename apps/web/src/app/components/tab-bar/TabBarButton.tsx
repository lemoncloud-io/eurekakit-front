import { NavLink } from 'react-router-dom';

import type { NavLinkProps } from 'react-router-dom';

export const TabButton = ({ className, children, ...props }: NavLinkProps) => {
    return (
        <NavLink className={params => (typeof className === 'function' ? className(params) : className)} {...props}>
            {children}
        </NavLink>
    );
};
