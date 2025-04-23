import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { LucideHome, MessageSquare } from 'lucide-react';

import { cn } from '@lemon/ui-kit';

import { useLayoutStore } from '../stores/useLayoutStore';

const menuItems = [
    {
        titleKey: 'menu.dashboard',
        path: '/home',
        icon: LucideHome,
    },
    {
        titleKey: 'menu.feeds',
        path: '/feeds',
        icon: MessageSquare,
    },
];

export const Sidebar = () => {
    const { t } = useTranslation();
    const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen);

    return (
        <aside
            className={cn(
                'bg-background left-0 top-16 z-20 h-[calc(100vh-4rem)] border-r transition-all duration-300',
                isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
            )}
        >
            <nav className={cn('h-full overflow-y-auto', isSidebarOpen ? 'space-y-2 p-4' : '')}>
                {menuItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                            )
                        }
                    >
                        <item.icon className="h-4 w-4" />
                        {t(item.titleKey)}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
