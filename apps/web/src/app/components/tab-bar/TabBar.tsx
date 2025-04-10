import { Home, LayoutIcon, PlusSquare, Search, User } from 'lucide-react';

import { TabButton } from './TabBarButton';

export const TabBar = () => {
    return (
        <nav className="sticky h-16 w-full bg-background bottom-0 border-t flex justify-around items-center">
            <TabButton
                to="/home"
                className={isActive => (isActive.isActive ? 'text-foreground' : 'text-muted-foreground')}
            >
                <Home size={24} />
            </TabButton>
            <TabButton
                to="/search"
                className={isActive => (isActive.isActive ? 'text-foreground' : 'text-muted-foreground')}
            >
                <Search size={24} />
            </TabButton>
            <TabButton
                to="/post/create"
                className={isActive => (isActive.isActive ? 'text-foreground' : 'text-muted-foreground')}
            >
                <PlusSquare size={24} />
            </TabButton>
            <TabButton
                to="/feed"
                className={isActive => (isActive.isActive ? 'text-foreground' : 'text-muted-foreground')}
            >
                <LayoutIcon size={24} />
            </TabButton>
            <TabButton
                to="/user"
                className={isActive => (isActive.isActive ? 'text-foreground' : 'text-muted-foreground')}
            >
                <User size={24} />
            </TabButton>
        </nav>
    );
};
