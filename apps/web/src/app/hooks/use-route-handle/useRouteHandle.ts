import { useMatches } from 'react-router-dom';

interface HeaderButton {
    type: 'back' | 'cancel' | 'custom';
    position: 'left' | 'right';
    label?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

interface HandleHeader {
    title?: string;
    buttons: HeaderButton[];
}

export interface RouterHandle {
    header?: HandleHeader;
    tabBar?: boolean;
    requireAuth?: boolean;
    skipAuth?: boolean;
}

export const useRouteHandle = () => {
    const matches = useMatches();

    const handle = (matches[matches.length - 1].handle || {}) as RouterHandle;

    return [handle, matches] as const;
};
