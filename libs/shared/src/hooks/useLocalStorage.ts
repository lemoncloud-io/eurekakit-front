import { useCallback, useMemo, useSyncExternalStore } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', callback);
        window.addEventListener('local-storage', callback);
        return () => {
            window.removeEventListener('storage', callback);
            window.removeEventListener('local-storage', callback);
        };
    };

    const getSnapshot = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ?? JSON.stringify(initialValue);
        } catch (error) {
            console.log('Error reading localStorage snapshot:', error);
            return JSON.stringify(initialValue);
        }
    };

    const rawState = useSyncExternalStore(subscribe, getSnapshot);

    const state = useMemo(() => {
        try {
            return JSON.parse(rawState) as T;
        } catch (error) {
            console.log('Error parsing localStorage value:', error);
            return initialValue;
        }
    }, [rawState, initialValue]);

    const setState = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const newValue = value instanceof Function ? value(state) : value;

                const newValueStr = JSON.stringify(newValue);
                const currentValueStr = JSON.stringify(state);

                if (newValueStr !== currentValueStr) {
                    localStorage.setItem(key, newValueStr);
                    window.dispatchEvent(new Event('local-storage'));
                }
            } catch (error) {
                console.log('Error saving to localStorage:', error);
            }
        },
        [key, state]
    );

    return [state, setState] as const;
};
