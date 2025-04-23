import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { isAfter, subDays } from 'date-fns';
import { X } from 'lucide-react';

import { useLocalStorage, useQueryState } from '@lemon/shared';
import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';

import { RECENT_KEYWORD_STORAGE_KEY } from '../../consts';

import type { RecentKeyword, SearchState } from '../../types';

export const RecentKeywordList = () => {
    const methods = useFormContext<SearchState>();

    const [, setKeyword] = useQueryState('keyword');
    const [recentKeywordList, setResentKeywordList] = useLocalStorage<RecentKeyword[]>(RECENT_KEYWORD_STORAGE_KEY, []);

    const removeRecentKeyword = (e: React.MouseEvent, removeKeyword: string) => {
        e.stopPropagation();

        setResentKeywordList(prev => prev.filter(keyword => keyword.keyword !== removeKeyword));
    };

    const setRecentKeyword = (keyword: string) => {
        methods.reset({ keyword });
        setKeyword(keyword, { replace: true });
    };

    useEffect(() => {
        const TWO_WEEK_AGO = subDays(new Date(), 14);

        setResentKeywordList(prev => prev.filter(keyword => isAfter(new Date(keyword.timestamp), TWO_WEEK_AGO)));
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="text-secondary-foreground">최근 검색어</div>
            {recentKeywordList.length ? (
                <Carousel opts={{ dragFree: true }}>
                    <CarouselContent className="text-sm">
                        {recentKeywordList.map(keyword => (
                            <CarouselItem
                                className="max-w-[50vw] basis-auto"
                                key={keyword.keyword}
                                onClick={() => setRecentKeyword(keyword.keyword)}
                            >
                                <div className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full px-3 py-1">
                                    <span className="overflow-hidden text-ellipsis text-nowrap">{keyword.keyword}</span>
                                    <button onClick={e => removeRecentKeyword(e, keyword.keyword)}>
                                        <X size={12} className="flex-none" />
                                    </button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            ) : (
                <div className="text-muted-foreground flex h-7 items-center justify-center text-sm">
                    최근 검색어가 없습니다.
                </div>
            )}
        </div>
    );
};
