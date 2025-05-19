import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { QueryStatesOptions, SetSearchParamsOptions } from './useQueryState';
import type { SetURLSearchParams } from 'react-router-dom';

type SearchParamsObject = {
    [k: string]: string;
};
type QueryStates<T> = { [K in keyof T]: T[K] };
type SetQueryStates<T> = (value: Partial<T>) => void;
type KeyMap<T> = { [K in keyof T]: QueryStatesOptions<T[K]> };

export function useQueryStates(): [SearchParamsObject, SetURLSearchParams];
export function useQueryStates<T extends Record<string, any>>(keyMap?: KeyMap<T>): [QueryStates<T>, SetQueryStates<T>];
export function useQueryStates<T extends Record<string, any>>(keyMap?: KeyMap<T>) {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramsObject = useMemo(() => {
        if (!keyMap) {
            return Object.fromEntries(searchParams.entries());
        }

        const initialParams = Object.fromEntries(
            Object.entries(keyMap).map(([key, options]) => [key, options.defaultValue])
        );

        Array.from(searchParams.entries())
            .filter(([key]) => key in keyMap)
            .forEach(([key, value]) => {
                const parser = keyMap[key].parser ?? String;
                initialParams[key] = parser(value);
            });

        return initialParams as T;
    }, [searchParams, keyMap]);

    const setQueryStatesWithKeyMap = (newValue: Partial<T>, options?: SetSearchParamsOptions) => {
        if (!keyMap) return;

        setSearchParams(prev => {
            const newSearchParams = new URLSearchParams(prev);

            if (options?.clear) {
                const excludeKeys = [...Object.keys(keyMap), ...(options.excludeFromClear || [])];

                Array.from(newSearchParams.keys()).forEach(paramKey => {
                    if (!excludeKeys.includes(paramKey)) {
                        newSearchParams.delete(paramKey);
                    }
                });
            }

            Object.entries(newValue).forEach(([key, value]) => {
                const defaultValue = keyMap[key as keyof T].defaultValue;
                value = value ?? defaultValue;
                const serializer = keyMap[key as keyof T].serializer ?? String;

                if (value === defaultValue) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, serializer(value));
                }
            });

            return newSearchParams;
        }, options);
    };

    return [paramsObject, keyMap ? setQueryStatesWithKeyMap : setSearchParams] as const;
}
