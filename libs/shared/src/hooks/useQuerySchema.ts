import { useMemo } from 'react';

import { useQueryStates } from './useQueryStates';

import type { NonNullableObject } from '../types';
import type { QueryStatesOptions } from './useQueryState';
import type { z } from 'zod';

const extractDefaultValue = <T>(schema: z.ZodType<T>): T | undefined | null => {
    try {
        return schema.parse(undefined);
    } catch {
        return undefined;
    }
};

export const createQueryStatesOptions = <T extends z.ZodObject<z.ZodRawShape>>(
    schema: T
): Record<keyof z.infer<T>, QueryStatesOptions<any>> => {
    return Object.keys(schema.shape).reduce(
        (acc, key) => {
            const fieldSchema = schema.shape[key];
            const defaultValue = extractDefaultValue(fieldSchema);

            return {
                ...acc,
                [key]: {
                    defaultValue,
                    parser: (value: string) => {
                        const result = fieldSchema.safeParse(value);
                        return result.success ? result.data : defaultValue;
                    },
                    serializer: (value: any) => fieldSchema.parse(value).toString(),
                },
            };
        },
        {} as Record<keyof z.infer<T>, QueryStatesOptions<any>>
    );
};

// TODO : 여기 타입을 객체 value가 null이 아니도록 수정 -> undefined만 가능
export const useQuerySchema = <T extends z.ZodObject<Record<string, any>>>(schema: T) => {
    const defaultOptions = useMemo(() => createQueryStatesOptions(schema), [schema]);

    const [queryStates, setQueryStates] = useQueryStates(defaultOptions);

    const querySchemaStates = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(queryStates).filter(([_, value]) => value !== null && value !== undefined)
            ) as NonNullableObject<z.output<typeof schema>>,
        [queryStates]
    );

    return [querySchemaStates, setQueryStates] as const;
};
