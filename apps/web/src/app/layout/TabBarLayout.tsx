import { Outlet } from 'react-router-dom';

import { TabBar } from '../components/tab-bar';

export const TabBarLayout = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex-1">
                <Outlet />
            </div>
            <TabBar />
        </div>
    );
};
