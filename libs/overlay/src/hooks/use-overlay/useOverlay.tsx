import { useRef, useState } from 'react';

import { OverlayController, type OverlayControllerRef, type OverlayElement } from '../../components';
import { useOverlayContext } from '../use-overlay-context';

let overlayId = 1;

export const useOverlay = () => {
    const [id] = useState(String(overlayId++));
    const { mount, unmount } = useOverlayContext();

    const overlayRef = useRef<OverlayControllerRef>(null);

    const validate = (validater: unknown, onFail?: () => void) => {
        const isValid = typeof validater === 'function' ? validater() : validater;
        if (!isValid) {
            onFail?.();
            return;
        }

        return overlayApi;
    };

    const overlayApi = {
        open: (overlayElement: OverlayElement) => {
            // NOTE : key가 없으면 제대로 동작을 안함.
            mount(
                id,
                <OverlayController
                    key={Date.now()}
                    element={overlayElement}
                    onExit={() => unmount(id)}
                    ref={overlayRef}
                />
            );
        },
        close: () => {
            overlayRef.current?.close();
        },
        onOpenChange: (open?: boolean) => {
            overlayRef.current?.onOpenChange(open);
        },
        unmount: () => unmount(id),
        validate,
    };

    return overlayApi;
};
