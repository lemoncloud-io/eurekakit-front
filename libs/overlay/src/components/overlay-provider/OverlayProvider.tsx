import { Fragment, type PropsWithChildren, type ReactNode, useState } from 'react';

import { OverlayContext } from '../../contexts';

export const OverlayProvider = ({ children }: PropsWithChildren) => {
    const [overlayMap, setOverlayMap] = useState<Map<string, ReactNode>>(new Map());

    const mount = (id: string, overlay: ReactNode) => {
        setOverlayMap(prev => {
            const newMap = new Map(prev);

            newMap.set(id, overlay);

            return newMap;
        });
    };

    const unmount = (id: string) => {
        setOverlayMap(prev => {
            const newMap = new Map(prev);

            newMap.delete(id);

            return newMap;
        });
    };

    return (
        <OverlayContext.Provider value={{ mount, unmount }} data-overlay-provider={true}>
            <div className="contents" data-overlay-provider="true">
                {children}
                {Array.from(overlayMap.entries()).map(([id, element]) => (
                    <Fragment key={id}>{element}</Fragment>
                ))}
            </div>
        </OverlayContext.Provider>
    );
};
