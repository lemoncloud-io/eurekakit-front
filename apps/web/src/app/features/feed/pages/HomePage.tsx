import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeFeedGrid, HomeFeedList } from '../components';
import { HomeHeader } from '../components/home-header';

export const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <div className="h-[7.5rem]" />
            <HomeFeedGrid />
            <div className="w-full px-4">
                <Separator />
            </div>
            <HomeFeedList />
        </>
    );
};
