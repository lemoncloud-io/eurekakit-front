import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../../../shared';
import { FeedListPage } from '../pages';

export const FeedsRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {/* <Route path="/create" element={<BoardTypeFormPage />} /> */}
                {/* <Route path="/:id" element={<BoardTypeFormPage />} /> */}
                <Route path="/" element={<FeedListPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};
