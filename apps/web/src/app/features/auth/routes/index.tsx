import { Navigate } from 'react-router-dom';

import { KakaoCallbackPage, LoginPage, LogoutPage, OAuthResponsePage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'logout',
        element: <LogoutPage />,
    },
    {
        path: 'oauth-response',
        element: <OAuthResponsePage />,
    },
    {
        path: 'kakao/callback',
        element: <KakaoCallbackPage />,
    },
    {
        path: '*',
        element: <Navigate to="/auth/login" />,
    },
];
