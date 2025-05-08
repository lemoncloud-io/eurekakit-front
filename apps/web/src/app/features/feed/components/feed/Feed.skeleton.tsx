export const FeedSkeleton = () => {
    return (
        <div className="flex animate-pulse flex-col items-start gap-2 px-4 pb-4 pt-2">
            <div className="flex w-full items-center gap-2 py-2">
                <span className="bg-secondary flex aspect-square h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full" />
                <span className="bg-secondary h-4 w-36 rounded-full" />
            </div>
            <div className="bg-secondary h-4 w-full rounded-full" />
            <div className="bg-secondary h-4 w-4/5 rounded-full" />
            <div className="bg-secondary h-4 w-11/12 rounded-full" />
        </div>
    );
};
