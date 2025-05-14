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
        handle: { type: 'public' },
    },
    {
        path: 'oauth-response',
        element: <OAuthResponsePage />,
        handle: { type: 'public' },
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
