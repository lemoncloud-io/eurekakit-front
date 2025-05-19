import { Home, LayoutIcon, PlusSquare, Search, User } from 'lucide-react';

import { TabButton } from './TabBarButton';

export const TabBar = () => {
    return (
        <nav className="bg-background sticky bottom-0 flex h-16 w-full flex-none items-center justify-around border-t">
            <TabButton to="/">
                <Home size={24} />
            </TabButton>
            <TabButton to="/feed/search">
                <Search size={24} />
            </TabButton>
            <TabButton to="/feed/create">
                <PlusSquare size={24} />
            </TabButton>
            <TabButton to="/feed" end>
                <LayoutIcon size={24} />
            </TabButton>
            <TabButton to="/user">
                <User size={24} />
            </TabButton>
        </nav>
    );
};
