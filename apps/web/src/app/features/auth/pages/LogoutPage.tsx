import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingFallback } from '@lemon/shared';
import { useWebCoreStore } from '@lemon/web-core';

export const LogoutPage = () => {
    const isAuthenticated = useWebCoreStore(state => state.isAuthenticated);
    const logout = useWebCoreStore(state => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
        }
    }, [isAuthenticated]);

    return <LoadingFallback message={'Sign Out'} />;
};
