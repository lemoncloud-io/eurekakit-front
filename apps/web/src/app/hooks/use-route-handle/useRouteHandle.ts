import { useMatches } from 'react-router-dom';

import type { UIMatch } from 'react-router-dom';

type HeaderButton = 'back' | 'cancel';

interface HandleHeader {
    title?: string;
    buttons?: HeaderButton[];
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
