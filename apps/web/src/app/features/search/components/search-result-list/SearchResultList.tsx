import { useEffect, useMemo } from 'react';

import { Loader2 } from 'lucide-react';

import { useSearchFeed } from '@lemon/feeds';
import { useQueryState } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { useIsIntersecting, useNavigate } from '../../../../hooks';
import { Post } from '../../../post/components';

export const SearchResultList = () => {
    const navigate = useNavigate();

    const [keyword] = useQueryState('keyword');
    const {
        data: searchResults,
        isPending,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useSearchFeed({ keyword });

    const { setRef, isIntersecting } = useIsIntersecting<HTMLDivElement>();

    const isEmptyResult = !!keyword && !searchResults?.total;
    const highlightedResult = useMemo(
        () =>
            searchResults?.list.map(post => {
                const regex = new RegExp(keyword, 'g');
                const highlighted = post.text.replace(
                    regex,
                    `<span class='bg-accent text-accent-foreground'>${keyword}</span>`
                );
                return { ...post, text: highlighted };
            }) ?? [],
        [searchResults, keyword]
    );

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage();
        }
    }, [isIntersecting, fetchNextPage]);

    if (isPending) {
        return (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return isEmptyResult ? (
        <div className="flex h-48 flex-col items-center justify-center">
            <span>검색 결과가 없습니다.</span>
            <span className="text-muted-foreground text-sm">다른 검색어를 입력해 보세요.</span>
        </div>
    ) : (
        <>
            <List seperator={<Separator />}>
                {highlightedResult.map(post => (
                    <div className="pb-4 pt-2" onClick={() => navigate(`/post/${post.id}`)}>
                        <Post post={post} />
                    </div>
                ))}
            </List>
            {hasNextPage && (
                <>
                    <Separator />
                    <div className="flex h-12 w-full items-center justify-center" ref={setRef}>
                        {isFetchingNextPage && <Loader2 className="animate-spin" />}
                    </div>
                </>
            )}
        </>
    );
};
