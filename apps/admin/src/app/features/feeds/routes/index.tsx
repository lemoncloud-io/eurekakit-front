import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../../../shared';
import { FeedFormPage, FeedListPage } from '../pages';

export const FeedsRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/create" element={<FeedFormPage />} />
                <Route path="/:id" element={<FeedFormPage />} />
                <Route path="/" element={<FeedListPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};
