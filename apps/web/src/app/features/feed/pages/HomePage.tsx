import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeHeader } from '../components/home-header';
import { PopularPostGrid } from '../components/popular-post-grid';
import { TotalPostList } from '../components/total-post-list';

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
