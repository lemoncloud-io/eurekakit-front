import { Home, LayoutIcon, PlusSquare, Search, User } from 'lucide-react';

import { TabButton } from './TabBarButton';

export const TabBar = () => {
    return (
        <nav className="sticky h-16 w-full bg-background bottom-0 border-t flex justify-around items-center">
            <TabButton to="/home">
                <Home size={24} />
            </TabButton>
            <TabButton to="/search">
                <Search size={24} />
            </TabButton>
            <TabButton to="/post/create">
                <PlusSquare size={24} />
            </TabButton>
            <TabButton to="/feed">
                <LayoutIcon size={24} />
            </TabButton>
            <TabButton to="/user">
                <User size={24} />
            </TabButton>
        </nav>
    );
};
