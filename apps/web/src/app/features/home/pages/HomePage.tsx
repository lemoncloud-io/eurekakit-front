import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeHeader, PopularPostGrid, TotalPostList } from '../components';

export const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <div className="h-[7.5rem]" />
            <PopularPostGrid />
            <div className="w-full px-4">
                <Separator />
            </div>
            <TotalPostList />
        </>
    );
};
