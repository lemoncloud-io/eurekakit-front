import { useContext } from 'react';

import { OverlayContext } from '../../contexts/OverlayContext';

export const useOverlayContext = () => {
    const overlayContext = useContext(OverlayContext);

    if (!overlayContext) {
        throw Error('OverlayContext should be used in OverlayProvider');
    }

    return overlayContext;
};
