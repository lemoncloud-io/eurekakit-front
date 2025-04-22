import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { ClipboardX, PlusCircle, RefreshCcw } from 'lucide-react';

import { useFeeds } from '@lemon/feeds';
import { Loader, formatDate, useGlobalLoader, usePagination } from '@lemon/shared';
import { Badge } from '@lemon/ui-kit/components/ui/badge';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@lemon/ui-kit/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@lemon/ui-kit/components/ui/pagination';

const truncateText = (text?: string, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const FeedListPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsLoading } = useGlobalLoader();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const page = parseInt(searchParams.get('page') || '0', 10);
    const limit = 20;

    const queryParams = {
        page,
        limit,
        parent: '',
    };

    const { data: feedsData, isLoading, error, refetch } = useFeeds(queryParams);
    const { paginationRange } = usePagination({
        totalCount: feedsData?.total || 0,
        pageSize: limit,
        currentPage: page,
        siblingCount: 1,
    });

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            prev.set('page', newPage.toString());
            return prev;
        });
    };

    const handleFeedClick = (feedId?: string) => {
        if (!feedId) {
            return;
        }
        navigate(`/feeds/${feedId}`);
    };

    return (
        <div className="container mx-auto py-10">
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{t('feeds.title', 'Feeds')}</CardTitle>
                            <p className="text-muted-foreground mt-2 text-sm">
                                {t('feeds.description', 'Manage all feeds and replies')}
                            </p>
                        </div>
                        <Button onClick={() => navigate('/feeds/create')} className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            {t('feeds.createButton', 'Create Feed')}
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">
                            {t('feeds.totalCount', { count: feedsData?.total || 0 })}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex h-[300px] w-full items-center justify-center">
                            <Loader />
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-8">
                            <p className="text-destructive text-center text-sm">
                                {t('feeds.error.loadFailed', 'Failed to load feeds')}
                            </p>
                            <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
                                <RefreshCcw className="h-4 w-4" />
                                {t('common.retry', 'Retry')}
                            </Button>
                        </div>
                    ) : feedsData?.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <ClipboardX className="text-muted-foreground/50 mb-4 h-12 w-12" />
                            <p className="text-muted-foreground text-sm">{t('feeds.noData', 'No feeds found')}</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.id', 'ID')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.feedNo', 'Feed No')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.text', 'Content')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.author', 'Author')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.replies', 'Replies')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.images', 'Images')}
                                        </th>
                                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                                            {t('feeds.table.createdAt', 'Created At')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {feedsData?.data.map((feed: any, i) => (
                                        <tr
                                            key={`${feed.id}_${i}`}
                                            className="hover:bg-muted/50 cursor-pointer transition-colors"
                                            onClick={() => handleFeedClick(feed.id)}
                                        >
                                            <td className="p-4 font-mono text-sm">{feed.id}</td>
                                            <td className="p-4 text-sm">{feed.feedNo}</td>
                                            <td className="max-w-md p-4 text-sm">
                                                <div className="truncate">{truncateText(feed.text)}</div>
                                            </td>
                                            <td className="p-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">{feed.user$?.nick || 'Unknown'}</span>
                                                    {feed.user$?.name && (
                                                        <span className="text-muted-foreground text-xs">
                                                            ({feed.user$?.name})
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-sm">
                                                {feed.childNo > 0 && (
                                                    <Badge variant="secondary" className="text-xs font-normal">
                                                        {feed.childNo}
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {feed.image$$ && feed.image$$.length > 0 && (
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {feed.image$$.length}
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="text-muted-foreground p-4 text-sm">
                                                {formatDate(feed.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
            {feedsData?.total && feedsData.total > 0 && (
                <Pagination className="py-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                                aria-disabled={page <= 0}
                                tabIndex={page <= 0 ? -1 : undefined}
                                className={page <= 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                        {paginationRange.map((pageNumber, index) => (
                            <PaginationItem key={index}>
                                {pageNumber === '...' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        className="cursor-pointer"
                                        onClick={() => handlePageChange(Number(pageNumber))}
                                        isActive={page === Number(pageNumber)}
                                    >
                                        {Number(pageNumber) + 1}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === Math.ceil((feedsData?.total || 0) / limit) - 1}
                                aria-disabled={page === Math.ceil((feedsData?.total || 0) / limit) - 1}
                                className={
                                    page === Math.ceil((feedsData?.total || 0) / limit) - 1
                                        ? 'pointer-events-none opacity-50'
                                        : 'cursor-pointer'
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};
