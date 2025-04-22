import { useTranslation } from 'react-i18next';

import { ChevronDown, ChevronUp, Edit, Save, Trash, X } from 'lucide-react';

import { Loader, formatDate } from '@lemon/shared';
import { Badge } from '@lemon/ui-kit/components/ui/badge';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@lemon/ui-kit/components/ui/collapsible';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@lemon/ui-kit/components/ui/pagination';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import type { FeedView } from '@lemon/feeds';

interface FeedCommentManagerProps {
    feedId: string;
    commentsData: any;
    isLoadingComments: boolean;
    commentsContainerRef: React.RefObject<HTMLDivElement>;
    currentPage: number;
    pageSize: number;
    paginationRange: (string | number)[];
    handlePageChange: (page: number) => void;
    handleEditComment: (comment: FeedView) => void;
    handleDeleteComment: (commentId: string) => void;
    handleSaveComment: (commentId: string) => void;
    handleCancelEditComment: () => void;
    editingCommentId: string | null;
    editingCommentText: string;
    setEditingCommentText: (text: string) => void;
    isLoading: boolean;
    isFeedUpdating: boolean;
    commentsOpen: boolean;
    setCommentsOpen: (open: boolean) => void;
}

export const FeedCommentManager = ({
    feedId,
    commentsData,
    isLoadingComments,
    commentsContainerRef,
    currentPage,
    pageSize,
    paginationRange,
    handlePageChange,
    handleEditComment,
    handleDeleteComment,
    handleSaveComment,
    handleCancelEditComment,
    editingCommentId,
    editingCommentText,
    setEditingCommentText,
    isLoading,
    isFeedUpdating,
    commentsOpen,
    setCommentsOpen,
}: FeedCommentManagerProps) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-lg border">
            <Collapsible open={commentsOpen} onOpenChange={setCommentsOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="h-auto w-full justify-between rounded-t-lg p-4 font-medium">
                        <div className="flex items-center">
                            <span className="text-base">{t('feeds.form.commentsSection', '답글 관리')}</span>
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 ml-2">
                                {commentsData?.data?.length}
                            </Badge>
                        </div>
                        <div className="bg-muted/50 rounded-full p-1">
                            {commentsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Separator />
                    <div ref={commentsContainerRef} className="max-h-[500px] overflow-y-auto p-4">
                        {isLoadingComments ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader />
                            </div>
                        ) : !commentsData || commentsData.data.length === 0 ? (
                            <div className="text-muted-foreground flex flex-col items-center py-12 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mb-3 h-12 w-12 opacity-20"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                                    />
                                </svg>
                                {t('feeds.form.noComments', '답글이 없습니다')}
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    {commentsData.data.map((comment: FeedView) => (
                                        <div
                                            key={comment.id}
                                            className="hover:border-primary/50 rounded-lg border p-4 transition-all"
                                        >
                                            {editingCommentId === comment.id ? (
                                                <div className="space-y-3">
                                                    <Textarea
                                                        value={editingCommentText}
                                                        onChange={e => setEditingCommentText(e.target.value)}
                                                        rows={4}
                                                        className="w-full"
                                                        placeholder={t(
                                                            'feeds.form.commentPlaceholder',
                                                            '답글 내용을 입력하세요...'
                                                        )}
                                                    />
                                                    <div className="flex justify-end space-x-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleCancelEditComment}
                                                        >
                                                            <X className="mr-1 h-4 w-4" />
                                                            {t('common.cancel', '취소')}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => handleSaveComment(comment.id)}
                                                            disabled={isFeedUpdating}
                                                        >
                                                            {isFeedUpdating ? (
                                                                <Loader className="h-4 w-4" />
                                                            ) : (
                                                                <>
                                                                    <Save className="mr-1 h-4 w-4" />
                                                                    {t('common.save', '저장')}
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="mb-2 flex justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="bg-muted/50">
                                                                #{comment.no}
                                                            </Badge>
                                                            <span className="text-muted-foreground text-sm">
                                                                {formatDate(comment.createdAt)}
                                                            </span>
                                                        </div>
                                                        <div className="flex space-x-1">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleEditComment(comment)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                disabled={isLoading}
                                                            >
                                                                {isLoading ? (
                                                                    <Loader className="h-4 w-4" />
                                                                ) : (
                                                                    <Trash className="h-4 w-4 text-red-500" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="border-muted bg-muted/10 rounded border-l-4 px-3 py-2">
                                                        <p className="whitespace-pre-wrap text-sm">{comment.text}</p>
                                                    </div>
                                                    <div className="mt-2 flex justify-between text-xs">
                                                        <div className="text-muted-foreground">
                                                            {t('feeds.form.commentUserId', 'User ID')}:{' '}
                                                            {comment.userId || '-'}
                                                        </div>
                                                        {comment.likeCount > 0 && (
                                                            <div className="flex items-center">
                                                                <span className="mr-1">
                                                                    {t('feeds.form.likes', '좋아요')}:
                                                                </span>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="h-5 min-w-5 px-1.5 text-xs"
                                                                >
                                                                    {comment.likeCount}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* 페이지네이션 컴포넌트 */}
                                {commentsData.total > pageSize && (
                                    <Pagination className="mt-6">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    aria-disabled={currentPage <= 0}
                                                    tabIndex={currentPage <= 0 ? -1 : undefined}
                                                    className={
                                                        currentPage <= 0
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer'
                                                    }
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
                                                            isActive={currentPage === Number(pageNumber)}
                                                        >
                                                            {Number(pageNumber) + 1}
                                                        </PaginationLink>
                                                    )}
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={
                                                        currentPage ===
                                                        Math.ceil((commentsData?.total || 0) / pageSize) - 1
                                                    }
                                                    aria-disabled={
                                                        currentPage ===
                                                        Math.ceil((commentsData?.total || 0) / pageSize) - 1
                                                    }
                                                    className={
                                                        currentPage ===
                                                        Math.ceil((commentsData?.total || 0) / pageSize) - 1
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer'
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </>
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};
