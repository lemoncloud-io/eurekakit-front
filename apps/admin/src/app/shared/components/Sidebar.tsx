import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { ChevronDown, FileText, LayoutGrid, LayoutList, LucideHome } from 'lucide-react';

import { useBoards } from '@lemon/boards';
import { Loader } from '@lemon/shared';
import { cn } from '@lemon/ui-kit';

import { useLayoutStore } from '../stores/useLayoutStore';

const menuItems = [
    {
        titleKey: 'menu.dashboard',
        path: '/home',
        icon: LucideHome,
    },
    {
        titleKey: 'menu.boardTypes',
        path: '/board-types',
        icon: FileText,
    },
    {
        titleKey: 'menu.boards',
        path: '/boards',
        icon: LayoutGrid,
    },
    {
        titleKey: 'menu.feeds',
        path: '/feeds',
        icon: LayoutGrid,
    },
    // Add more menu items as needed
];

export const Sidebar = () => {
    const { t } = useTranslation();
    const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen);
    const [isExpanded, setIsExpanded] = useState(true);
    const { data: boardsData, isLoading } = useBoards({ page: 0, limit: 100 });

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
                {isSidebarOpen && (
                    <div className="mt-6">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-md px-4 py-2"
                        >
                            <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                <LayoutList className="h-4 w-4" />
                                {t('menu.boardList')}
                            </h3>
                            <ChevronDown
                                className={cn(
                                    'text-muted-foreground h-4 w-4 transition-transform',
                                    isExpanded ? 'rotate-0 transform' : '-rotate-90 transform'
                                )}
                            />
                        </button>
                        {isExpanded && (
                            <>
                                {isLoading ? (
                                    <div className="flex justify-center py-4">
                                        <Loader />
                                    </div>
                                ) : (
                                    <div className="mt-2 space-y-1">
                                        {boardsData?.data.map(board => (
                                            <NavLink
                                                key={board.id}
                                                to={`/boards/${board.id}/posts`}
                                                className={({ isActive }) =>
                                                    cn(
                                                        'flex items-center px-4 py-2 text-sm transition-colors',
                                                        'hover:bg-accent hover:text-accent-foreground',
                                                        isActive
                                                            ? 'bg-accent/50 text-accent-foreground'
                                                            : 'text-muted-foreground'
                                                    )
                                                }
                                            >
                                                {board.title}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </nav>
        </aside>
    );
};
