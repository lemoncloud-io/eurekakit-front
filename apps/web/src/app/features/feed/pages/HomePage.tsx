import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { HomeFeedGrid, HomeFeedList } from '../components';
import { HomeHeader } from '../components/home-header';

export const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <div className="h-[7.5rem]" />
            <div className="flex flex-col gap-2 p-4">
                <h3 className="font-semibold">인기글</h3>
                <HomeFeedGrid />
            </div>
            <div className="w-full px-4">
                <Separator />
            </div>
            <div className="flex flex-col p-4">
                <h3 className="font-semibold">전체글</h3>
                <HomeFeedList />
            </div>
        </>
    );
};
