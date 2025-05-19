import { type Ref, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export type OverlayProps = {
    open: boolean;
    close: () => void;
    onOpenChange?: (open?: boolean) => void;
    exit?: (id?: string) => void;
};

export type OverlayElement = (props: OverlayProps) => JSX.Element;

export interface OverlayControllerProps {
    element: OverlayElement;
    onExit: (id?: string) => void;
}

export interface OverlayControllerRef {
    onOpenChange: (open?: boolean) => void;
    close: () => void;
}

export const OverlayController = forwardRef(function OverlayController(
    { element: Overlay, onExit }: OverlayControllerProps,
    ref: Ref<OverlayControllerRef>
) {
    const [isOpen, setIsOpen] = useState(true);

    const onOpenChange = useCallback((open?: boolean) => {
        setIsOpen(open ?? false);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            onOpenChange,
            close,
        }),
        [onOpenChange, close]
    );

    return <Overlay open={isOpen} close={close} onOpenChange={onOpenChange} exit={onExit} />;
});
