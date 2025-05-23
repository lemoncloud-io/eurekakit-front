import { ChevronRight, CircleAlert } from 'lucide-react';

import { useWebCoreStore } from '@lemon/web-core';

import { Link } from '../components';

export const NotFound404 = () => {
    const isAuthenticated = useWebCoreStore(store => store.isAuthenticated);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
            <CircleAlert className="text-muted-foreground" size={32} />
            <div className="flex flex-col items-center gap-1 font-bold">
                <span className="text-2xl">Sorry,</span>
                <span>The page you requested could not be found.</span>
            </div>
            <span className="text-muted-foreground text-balance text-center text-sm">
                We will resolve the issue as soon as possible to ensure smooth service.
            </span>
            <br />
            <Link to={isAuthenticated ? '/' : '/auth'} className="text-accent-foreground flex items-center gap-1">
                <span>Go Back</span>
                <ChevronRight size={18} />
            </Link>
        </div>
    );
};
