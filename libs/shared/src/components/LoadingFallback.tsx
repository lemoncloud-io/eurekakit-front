import { Loader2 } from 'lucide-react';

interface LoadingFallbackProps {
    message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="bg-background/80 fixed inset-0 z-50 flex !max-w-full items-center justify-center backdrop-blur-sm">
            <div className="bg-card glassmorphism rounded-lg p-6 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="text-primary h-10 w-10 animate-spin" />
                    <div className="text-center">
                        <span className="gradient-text text-lg font-bold">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
