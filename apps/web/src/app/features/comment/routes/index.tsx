import { Route, Routes } from 'react-router-dom';

import { CreateCommentPage, UpdateCommentPage } from '../pages';

export const CommentRoutes = () => {
    return (
        <Routes>
            <Route path="/create" element={<CreateCommentPage />} />
            <Route path="/update/:commentId" element={<UpdateCommentPage />} />
        </Routes>
    );
};
