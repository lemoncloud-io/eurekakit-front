import { RotateCcw } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import type { FallbackProps } from 'react-error-boundary';

export const ErrorWithRetry = ({ resetErrorBoundary, error }: FallbackProps) => {
    return (
        <div className="flex min-h-40 flex-col items-center justify-center gap-3">
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
