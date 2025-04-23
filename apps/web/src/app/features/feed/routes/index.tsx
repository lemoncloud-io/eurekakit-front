import { Route, Routes } from 'react-router-dom';

import { FeedPage } from '../pages';

export const FeedRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<FeedPage />} />
        </Routes>
    );
};
