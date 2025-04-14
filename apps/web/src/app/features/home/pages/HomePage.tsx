import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeHeader, HotPostGrid, TotalPostList } from '../components';

export const HomePage = () => {
    return (
        <div className="flex min-h-full flex-col">
            <HomeHeader />
            <div className="h-28" />
            <HotPostGrid />
            <div className="w-full px-4">
                <Separator />
            </div>
            <TotalPostList />
        </div>
    );
};
