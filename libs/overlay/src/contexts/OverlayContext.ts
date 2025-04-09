import { type ReactNode, createContext } from 'react';

export const OverlayContext = createContext<{
    mount(id: string, element: ReactNode): void;
    unmount(id: string): void;
} | null>(null);
