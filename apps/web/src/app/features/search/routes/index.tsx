import { Route, Routes } from 'react-router-dom';

import { SearchPage } from '../pages';

export const SearchRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />} />
        </Routes>
    );
};
