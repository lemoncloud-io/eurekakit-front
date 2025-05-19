import { useCallback, useEffect, useState } from 'react';
import { type NavigateOptions, useSearchParams } from 'react-router-dom';

export interface QueryStatesOptions<T = string> {
    defaultValue?: T;
    parser?: (value: string) => T;
    serializer?: (value: T) => string;
}

export interface SetSearchParamsOptions extends NavigateOptions {
    clear?: boolean;
    excludeFromClear?: string[];
}

// TODO : @luke-lemon zod schema 지원
export const useQueryState = <T = string, K extends string = string>(key: K, options?: QueryStatesOptions<T>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { defaultValue = '' as T, parser = (value: string) => value as T, serializer = String } = options || {};

    const initialValue = searchParams.has(key) ? parser(searchParams.get(key)!) : defaultValue;
    const [queryParam, setQueryParam] = useState<T>(initialValue);

    const setQueryState = useCallback(
        (value?: T | null, options?: SetSearchParamsOptions) => {
            if (!value) {
                value = defaultValue;
            }

            setSearchParams(prev => {
                const newSearchParams = new URLSearchParams(prev);

                if (options?.clear) {
                    const excludeKeys = [key, ...(options.excludeFromClear || [])];

                    Array.from(newSearchParams.keys()).forEach(paramKey => {
                        if (!excludeKeys.includes(paramKey)) {
                            newSearchParams.delete(paramKey);
                        }
                    });
                }

                if (value === defaultValue) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, serializer(value));
                }

                return newSearchParams;
            }, options);
        },
        [key, defaultValue, serializer, setSearchParams]
    );

    useEffect(() => {
        const paramValue = searchParams.get(key);
        if (!paramValue) {
            setQueryParam(defaultValue);
        } else {
            setQueryParam(parser(paramValue));
        }
    }, [searchParams, key, defaultValue, parser]);

    return [queryParam, setQueryState] as const;
};
