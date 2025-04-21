import { Route, Routes } from 'react-router-dom';

import { CreateCommentPage } from '../pages';

export const CommentRoutes = () => {
    return (
        <Routes>
            <Route path="/create" element={<CreateCommentPage />} />
        </Routes>
    );
};
