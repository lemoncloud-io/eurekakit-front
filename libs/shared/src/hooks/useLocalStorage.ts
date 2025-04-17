import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log('Error reading localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            setStoredValue(prev => {
                const newValue = value instanceof Function ? value(prev) : value;
                window.localStorage.setItem(key, JSON.stringify(newValue));

                return newValue;
            });
        } catch (error) {
            console.log('Error saving to localStorage:', error);
        }
    };

    return [storedValue, setValue] as const;
}
