import { useMatches } from 'react-router-dom';

import type { UIMatch } from 'react-router-dom';

type HeaderButton = 'back' | 'cancel';

interface HandleHeader {
    title?: string;
    buttons?: HeaderButton[];
}

export interface RouteHandle {
    header?: HandleHeader;
    tabBar?: boolean;
    type?: 'public' | 'protected' | 'guest-only';
}

export const useRouteHandle = () => {
    const matches = useMatches() as UIMatch<unknown, RouteHandle | undefined>[];

    const handle = matches[matches.length - 1].handle;

    return [handle, matches] as const;
};
