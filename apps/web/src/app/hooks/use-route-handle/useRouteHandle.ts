import { useMatches } from 'react-router-dom';

import type { UIMatch } from 'react-router-dom';

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
    const matches = useMatches() as UIMatch<unknown, RouterHandle | undefined>[];

    const handle = matches[matches.length - 1].handle;

    return [handle, matches] as const;
};
