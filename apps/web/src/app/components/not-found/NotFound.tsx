import { Navigate } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

export const NotFound = () => {
    const { isAuthenticated } = useWebCoreStore();

    return isAuthenticated ? <Navigate to="home" /> : <Navigate to="/auth" />;
};
