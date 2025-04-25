import { Route, Routes } from 'react-router-dom';

import { ProfilePage, RecentViewPage, UserActivityPage, UserPage } from '../pages';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/activity" element={<UserActivityPage />} />
            <Route path="/view" element={<RecentViewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
};
