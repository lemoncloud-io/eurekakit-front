import { Route, Routes } from 'react-router-dom';

import { CreatePostPage, PostDetailPage } from '../pages';
import { UpdatePostPage } from '../pages/UpdatePostPage';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/:postId" element={<PostDetailPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/update/:postId" element={<UpdatePostPage />} />
        </Routes>
    );
};
