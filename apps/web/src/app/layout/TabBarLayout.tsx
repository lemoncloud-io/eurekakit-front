import { Outlet } from 'react-router-dom';

import { TabBar } from '../components/tab-bar';

export const TabBarLayout = () => {
    return (
        <>
            <Outlet />
            <TabBar />
        </>
    );
};
