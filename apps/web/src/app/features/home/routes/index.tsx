import { Route, Routes } from 'react-router-dom';

import { DashboardPage } from '../pages';

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
        </Routes>
    );
};
