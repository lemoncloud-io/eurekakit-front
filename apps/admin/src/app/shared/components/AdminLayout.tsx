import { Outlet } from 'react-router-dom';

import { cn } from '@lemon/ui-kit';


import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useLayoutStore } from '../stores/useLayoutStore';

export const AdminLayout = () => {
    const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen);

    return (
        <div className="flex min-h-screen flex-col">
            <div className="fixed left-0 right-0 top-0 z-30">
                <Header />
            </div>

            <div className="flex flex-1 pt-16">
                <div className="fixed left-0 top-16 z-20 h-[calc(100vh-4rem)]">
                    <Sidebar />
                </div>
                <main
                    className={cn(
                        'bg-background/95 flex-1 transition-all duration-300',
                        'h-[calc(100vh-4rem)] w-full overflow-y-auto',
                        isSidebarOpen ? 'ml-64' : 'ml-0'
                    )}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
