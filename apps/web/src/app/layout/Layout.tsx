import { Outlet } from 'react-router-dom';

import { X } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { TabBar } from '../components/tab-bar';
import { AuthGuard } from '../features/auth/components';
import { useNavigate, useRouteHandle } from '../hooks';

export const Layout = () => {
    const navigate = useNavigate();
    const [handle] = useRouteHandle();

    return (
        <AuthGuard>
            <div className="flex h-full flex-col">
                {handle?.header && (
                    <header className="flex h-12 w-full flex-none items-center justify-between border-b px-2">
                        <div className="w-9" />
                        <span className="font-medium">{handle.header?.title}</span>
                        <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                            <X />
                        </Button>
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
