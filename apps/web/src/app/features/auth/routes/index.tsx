import { Navigate } from 'react-router-dom';

import { KakaoCallbackPage, LoginPage, LogoutPage, OAuthResponsePage } from '../pages';

import type { ExtendedRouteObject } from '../../../routes';

export const authRoutes: ExtendedRouteObject[] = [
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'logout',
        element: <LogoutPage />,
        handle: { skipAuth: true },
    },
    {
        path: 'oauth-response',
        element: <OAuthResponsePage />,
        handle: { skipAuth: true },
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
