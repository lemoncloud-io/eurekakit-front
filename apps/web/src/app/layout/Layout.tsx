import { Outlet, ScrollRestoration } from 'react-router-dom';

import { ChevronLeft, X } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { TabBar } from '../components/tab-bar';
import { AuthGuard } from '../features/auth/components';
import { useNavigate, useRouteHandle } from '../hooks';

export const Layout = () => {
    const navigate = useNavigate();
    const [handle] = useRouteHandle();

    return (
        <AuthGuard>
            <ScrollRestoration />
            <div className="flex h-full flex-col">
                {handle?.header && (
                    <header className="bg-background sticky top-0 z-50 flex h-12 w-full flex-none items-center justify-between px-2">
                        {handle.header.buttons?.includes('back') && (
                            <Button variant={'ghost'} size={'icon'} onClick={() => navigate(-1)}>
                                <ChevronLeft />
                            </Button>
                        )}
                        {handle.header?.title && (
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
                                {handle.header?.title}
                            </span>
                        )}
                        {handle.header.buttons?.includes('cancel') && (
                            <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)} className="ml-auto">
                                <X />
                            </Button>
                        )}
                    </header>
                )}
                <div className="flex-1">
                    <Outlet />
                </div>
                {handle?.tabBar && <TabBar />}
            </div>
        </AuthGuard>
    );
};
