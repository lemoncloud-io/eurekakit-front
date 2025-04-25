import { Route, Routes } from 'react-router-dom';

import { UserPage } from '../pages';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserPage />} />
        </Routes>
    );
};
