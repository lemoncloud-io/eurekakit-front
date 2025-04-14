import { type PropsWithChildren, type ReactNode } from 'react';

interface ConditionProps extends PropsWithChildren {
    condition: boolean;
    fallback?: ReactNode;
}

export const Condition = ({ condition, children, fallback }: ConditionProps) => {
    return condition ? children : fallback;
};
