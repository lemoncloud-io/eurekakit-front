import { POST_GRID_COUNT } from '../../consts';

export const SkeletonPostGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: POST_GRID_COUNT })?.map((_, idx) => (
                <div key={idx} className="flex w-full flex-col gap-2">
                    <div className="bg-secondary aspect-square w-full animate-pulse rounded-lg" />
                    <div className="bg-secondary h-12 w-full animate-pulse rounded-lg" />
                </div>
            ))}
        </div>
    );
};
