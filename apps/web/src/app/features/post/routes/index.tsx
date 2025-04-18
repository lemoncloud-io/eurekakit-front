import { Route, Routes } from 'react-router-dom';

import { CreatePostPage, PostDetailPage } from '../pages';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/:postId" element={<PostDetailPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/update" element={<CreatePostPage />} />
            <Route path="*" element={<CreatePostPage />} />
        </Routes>
    );
};
