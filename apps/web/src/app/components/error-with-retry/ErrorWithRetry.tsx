import { RotateCcw } from 'lucide-react';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';

import type { FallbackProps } from 'react-error-boundary';
import type { ClassNameValue } from 'tailwind-merge';

interface ErrorWithRetryProps extends FallbackProps {
    className?: ClassNameValue;
}

export const ErrorWithRetry = ({ resetErrorBoundary, error, className }: ErrorWithRetryProps) => {
    return (
        <div className={cn('flex min-h-40 flex-col items-center justify-center gap-3', className)}>
            <div className="flex flex-col items-center justify-center gap-1">
                <span>에러가 발생했습니다.</span>
                <span className="text-muted-foreground text-sm">{error.message}</span>
            </div>
            <Button onClick={() => resetErrorBoundary()}>
                <RotateCcw />
                다시 시도
            </Button>
        </div>
    );
};
