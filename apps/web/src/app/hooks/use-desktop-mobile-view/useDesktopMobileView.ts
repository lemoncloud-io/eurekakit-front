import { useEffect } from 'react';

import { getIsMobile } from '@lemon/shared';

export const useDesktopMobileView = (maxWidth = 400) => {
    const isMobile = getIsMobile();

    useEffect(() => {
        const body = document.body;
        const root = document.getElementById('root');

        if (!body || !root) {
            return;
        }

        body.style.display = 'flex';
        body.style.justifyContent = 'center';

        root.style.position = 'relative';
        root.style.width = '100%';

        if (!isMobile) {
            root.style.maxWidth = `${maxWidth}px`;
            root.style.borderLeftWidth = '1px';
            root.style.borderRightWidth = '1px';

            const observer = new MutationObserver(() => {
                root.querySelectorAll('.fixed').forEach(el => {
                    (el as HTMLElement).style.maxWidth = `${maxWidth}px`;
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
            };
        }
    }, [isMobile]);
};
