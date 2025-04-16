import { Route, Routes } from 'react-router-dom';

import { PostEditorPage } from '../pages';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/create" element={<PostEditorPage />} />
            <Route path="*" element={<PostEditorPage />} />
        </Routes>
    );
};
