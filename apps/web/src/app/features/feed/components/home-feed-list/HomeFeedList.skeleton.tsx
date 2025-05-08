import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

export const HomeFeedListSkeleton = () => {
    return (
        <List seperator={<Separator />} className="gap-3 py-3">
            {Array.from({ length: 5 }).map((_, idx) => (
                <div className="flex gap-2" key={idx}>
                    <div className="flex w-full flex-col gap-2">
                        <div className="bg-secondary h-1/2 w-full animate-pulse rounded-lg" />
                        <div className="bg-secondary h-5 w-1/2 animate-pulse rounded-lg" />
                        <div className="bg-secondary h-5 w-1/2 animate-pulse rounded-lg" />
                    </div>
                    <div className="bg-secondary aspect-square h-24 animate-pulse rounded-lg" key={idx} />
                </div>
            ))}
        </List>
    );
};
