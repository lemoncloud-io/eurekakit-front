import { Navigate } from 'react-router-dom';

import { FeedsRoutes } from '../../features/feeds';
import { HomeRoutes } from '../../features/home';

export const ProtectedRoutes = [
    { path: `/feeds/*`, element: <FeedsRoutes /> },
    { path: `/*`, element: <HomeRoutes /> },
    { path: '/', element: <Navigate to="/home" replace /> },
    { path: '*', element: <Navigate to="/home" replace /> },
];
