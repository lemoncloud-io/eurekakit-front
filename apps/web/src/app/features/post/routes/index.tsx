import { Route, Routes } from 'react-router-dom';

import { PostDetailPage, PostEditorPage } from '../pages';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/:postId" element={<PostDetailPage />} />
            <Route path="/create" element={<PostEditorPage />} />
            <Route path="/update" element={<PostEditorPage />} />
            <Route path="*" element={<PostEditorPage />} />
        </Routes>
    );
};
