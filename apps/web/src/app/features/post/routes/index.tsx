import { Route, Routes } from 'react-router-dom';

import { CreatePostPage, PostDetailPage, UpdatePostPage } from '../pages';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/:postId" element={<PostDetailPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/update/:postId" element={<UpdatePostPage />} />
        </Routes>
    );
};
