import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Edit, RefreshCw, Save, Trash, X } from 'lucide-react';

import { feedsKeys, useComments, useCreateFeed, useDeleteFeed, useFeed, useUpdateFeed } from '@lemon/feeds';
import { Loader, usePagination } from '@lemon/shared';
import { Alert, AlertDescription } from '@lemon/ui-kit/components/ui/alert';
import { Badge } from '@lemon/ui-kit/components/ui/badge';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@lemon/ui-kit/components/ui/card';
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
import { toast } from '@lemon/ui-kit/hooks/use-toast';

import { ImageUploader } from '../components';

import type { FeedBody, FeedView } from '@lemoncloud/lemon-feeds-api';

const formatDate = (timestamp?: number) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleString();
};

export const FeedFormPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const commentsContainerRef = useRef<HTMLDivElement>(null);

    const [commentsOpen, setCommentsOpen] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingCommentText, setEditingCommentText] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [isLoading, setIsLoading] = useState(false);

    const { data: feed, isLoading: isLoadingFeed, error: fetchError } = useFeed(id || '');
    const { mutate: updateFeed, isPending: isFeedUpdating } = useUpdateFeed();
    const { mutate: createFeed, isPending: isFeedCreating } = useCreateFeed();
    const { mutate: deleteFeed } = useDeleteFeed();

    const {
        data: commentsData,
        isLoading: isLoadingComments,
        refetch: refetchComments,
    } = useComments({
        feedId: id || '',
        params: {
            limit: pageSize,
            page: currentPage,
        },
    });

    // 페이지네이션 범위 계산
    const { paginationRange } = usePagination({
        totalCount: commentsData?.total || 0,
        pageSize,
        currentPage,
        siblingCount: 1,
    });

    // 폼 상태 관리
    const methods = useForm<FeedBody>({
        defaultValues: {
            text: '',
            image$$: [],
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (!feed) {
            return;
        }

        setValue('text', feed.text || '');
        if (feed.image$$ && feed.image$$.length > 0) {
            setValue('image$$', [...feed.image$$], { shouldDirty: false });
        } else {
            setValue('image$$', [], { shouldDirty: false });
        }

        if (feed.childNo && feed.childNo > 0) {
            setCommentsOpen(true);
        }
    }, [feed, setValue]);

    // 페이지 변경 시 스크롤 위치 조정
    useEffect(() => {
        if (commentsOpen && !isLoadingComments && commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = 0;
        }
    }, [currentPage, isLoadingComments, commentsOpen]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < Math.ceil((commentsData?.total || 0) / pageSize)) {
            setCurrentPage(newPage);
        }
    };

    // 폼 제출 처리
    const onSubmit = async (data: FeedBody) => {
        try {
            if (id) {
                updateFeed(
                    {
                        id,
                        body: data,
                    },
                    {
                        onSuccess: async (updated: FeedView) => {
                            await queryClient.invalidateQueries(feedsKeys.invalidateList());
                            queryClient.setQueryData(feedsKeys.detail(updated.id as string), updated);
                            toast({
                                description: t('feeds.toast.updateSuccess', '피드가 성공적으로 업데이트되었습니다'),
                                duration: 2000,
                            });
                            navigate(`/feeds/${updated.id}`);
                        },
                    }
                );
            } else {
                createFeed(data, {
                    onSuccess: async (newFeed: FeedView) => {
                        await queryClient.invalidateQueries(feedsKeys.invalidateList());
                        queryClient.setQueryData(feedsKeys.detail(newFeed.id as string), newFeed);
                        toast({
                            description: t('feeds.toast.createSuccess', '피드가 성공적으로 생성되었습니다'),
                            duration: 2000,
                        });
                        navigate(`/feeds/${newFeed.id}`);
                    },
                    onSettled: () => setIsLoading(false),
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: 'destructive',
                description: t('feeds.toast.error', '오류가 발생했습니다. 다시 시도해주세요.'),
                duration: 3000,
            });
        }
    };

    const handleEditComment = (comment: FeedView) => {
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text || '');
    };

    const handleCancelEditComment = () => {
        setEditingCommentId(null);
        setEditingCommentText('');
    };

    const handleSaveComment = async (commentId: string) => {
        if (!editingCommentText.trim()) {
            toast({
                variant: 'destructive',
                description: t('feeds.toast.commentEmpty', '답글 내용을 입력해주세요.'),
                duration: 2000,
            });
            return;
        }

        try {
            updateFeed(
                {
                    id: commentId,
                    body: {
                        text: editingCommentText,
                    },
                },
                {
                    onSuccess: async (updated: FeedView) => {
                        await refetchComments();
                        setEditingCommentId(null);
                        setEditingCommentText('');
                        toast({
                            description: t('feeds.toast.commentUpdateSuccess', '답글이 업데이트되었습니다.'),
                            duration: 2000,
                        });
                    },
                }
            );
        } catch (error) {
            toast({
                variant: 'destructive',
                description: t('feeds.toast.commentUpdateError', '답글 업데이트에 실패했습니다.'),
                duration: 3000,
            });
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!window.confirm(t('feeds.confirm.deleteComment', '이 답글을 삭제하시겠습니까?'))) {
            return;
        }

        try {
            setIsLoading(true);
            deleteFeed(commentId, {
                onSuccess: async () => {
                    await refetchComments();
                    await queryClient.invalidateQueries(feedsKeys.detail(id || ''));
                    toast({
                        description: t('feeds.toast.commentDeleteSuccess', '답글이 삭제되었습니다.'),
                        duration: 2000,
                    });
                },
                onError: () =>
                    toast({
                        description: '게시글을 삭제할 수 없습니다.',
                        className: 'flex justify-center items-center',
                    }),
                onSettled: () => setIsLoading(false),
            });
        } catch (error) {
            setIsLoading(false);
            toast({
                variant: 'destructive',
                description: t('feeds.toast.commentDeleteError', '답글 삭제에 실패했습니다.'),
                duration: 3000,
            });
        }
    };

    return (
        <div className="container mx-auto py-10">
            {(fetchError || updateFeed.error || createFeed.error) && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                        {fetchError instanceof Error
                            ? fetchError.message
                            : updateFeed.error instanceof Error
                              ? updateFeed.error.message
                              : createFeed.error instanceof Error
                                ? createFeed.error.message
                                : t('generalError', '오류가 발생했습니다')}
                    </AlertDescription>
                </Alert>
            )}

            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle>
                        {id ? t('feeds.form.editTitle', '피드 수정') : t('feeds.form.createTitle', '피드 작성')}
                    </CardTitle>
                </CardHeader>

                {isLoadingFeed ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader />
                    </div>
                ) : fetchError ? (
                    <div className="flex h-[200px] flex-col items-center justify-center gap-4">
                        <p className="text-destructive text-center text-sm">
                            {t('feeds.error.loadFailed', '피드를 불러오는데 실패했습니다')}
                        </p>
                        <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            {t('common.retry', '다시 시도')}
                        </Button>
                    </div>
                ) : (
                    <CardContent className="p-6">
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {id && feed && (
                                    <div className="bg-card/50 rounded-lg border p-5">
                                        <h3 className="mb-4 text-base font-medium">
                                            {t('feeds.form.basicInfo', '기본 정보')}
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-muted-foreground text-xs font-medium">
                                                        {t('feeds.form.id', 'ID')}
                                                    </label>
                                                    <div className="bg-muted/30 mt-1 overflow-hidden overflow-ellipsis rounded px-3 py-2 font-mono text-sm">
                                                        {feed.id}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-muted-foreground text-xs font-medium">
                                                        {t('feeds.form.feedNo', '피드 번호')}
                                                    </label>
                                                    <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">
                                                        {feed.feedNo}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-muted-foreground text-xs font-medium">
                                                        {t('feeds.form.createdAt', '생성일')}
                                                    </label>
                                                    <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">
                                                        {formatDate(feed.createdAt)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-muted-foreground text-xs font-medium">
                                                        {t('feeds.form.updatedAt', '수정일')}
                                                    </label>
                                                    <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">
                                                        {formatDate(feed.updatedAt)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-muted-foreground text-xs font-medium">
                                                    {t('feeds.form.author', '작성자')}
                                                </label>
                                                <div className="bg-muted/30 flex items-center space-x-2 rounded p-2">
                                                    {feed.user$?.nick ? (
                                                        <div className="flex-1">
                                                            <p className="font-medium">{feed.user$.nick}</p>
                                                            {feed.user$?.name && (
                                                                <p className="text-muted-foreground text-xs">
                                                                    {feed.user$.name}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted-foreground text-sm">-</div>
                                                    )}
                                                    {feed.userId && (
                                                        <Badge variant="outline" className="ml-auto">
                                                            {feed.userId}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                                <div className="flex items-center">
                                                    <span className="text-muted-foreground mr-2 text-xs font-medium">
                                                        {t('feeds.form.comments', '답글')}
                                                    </span>
                                                    <Badge variant="secondary">{feed.childNo || 0}</Badge>
                                                </div>

                                                <div className="flex items-center">
                                                    <span className="text-muted-foreground mr-2 text-xs font-medium">
                                                        {t('feeds.form.likes', '좋아요')}
                                                    </span>
                                                    <Badge variant="secondary">{feed.likeCount || 0}</Badge>
                                                </div>

                                                <div className="flex items-center">
                                                    <span className="text-muted-foreground mr-2 text-xs font-medium">
                                                        {t('feeds.form.images', '이미지')}
                                                    </span>
                                                    <Badge variant="secondary">{feed.image$$?.length || 0}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-5">
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-sm font-medium">
                                                {t('feeds.form.content', '내용')}
                                                <span className="ml-1 text-red-500">*</span>
                                            </label>
                                            <span className="text-muted-foreground text-xs">
                                                {methods.watch('text')?.length || 0}/2000
                                            </span>
                                        </div>
                                        <Textarea
                                            {...register('text', {
                                                required: t(
                                                    'feeds.form.validation.contentRequired',
                                                    '내용을 입력해주세요'
                                                ) as string,
                                                maxLength: {
                                                    value: 2000,
                                                    message: t(
                                                        'feeds.form.validation.contentLength',
                                                        '내용은 2000자 이내로 입력해주세요'
                                                    ),
                                                },
                                            })}
                                            rows={8}
                                            className="min-h-[120px] resize-y"
                                            placeholder={t(
                                                'feeds.form.contentPlaceholder',
                                                '피드 내용을 입력하세요...'
                                            )}
                                        />
                                        {errors.text && (
                                            <p className="mt-1.5 flex items-center text-sm text-red-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="mr-1 h-4 w-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.text.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* 이미지 업로더 영역 */}
                                    <div className="rounded-lg border border-dashed p-4">
                                        <ImageUploader methods={methods} />
                                    </div>

                                    {/* 답글 관리 섹션 */}
                                    {id && feed && feed.childNo > 0 && (
                                        <div className="rounded-lg border">
                                            <Collapsible open={commentsOpen} onOpenChange={setCommentsOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-auto w-full justify-between rounded-t-lg p-4 font-medium"
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="text-base">
                                                                {t('feeds.form.commentsSection', '답글 관리')}
                                                            </span>
                                                            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 ml-2">
                                                                {commentsData?.data?.length}
                                                            </Badge>
                                                        </div>
                                                        <div className="bg-muted/50 rounded-full p-1">
                                                            {commentsOpen ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </div>
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <Separator />
                                                    <div
                                                        ref={commentsContainerRef}
                                                        className="max-h-[500px] overflow-y-auto p-4"
                                                    >
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
                                                                    {commentsData.data.map(comment => (
                                                                        <div
                                                                            key={comment.id}
                                                                            className="hover:border-primary/50 rounded-lg border p-4 transition-all"
                                                                        >
                                                                            {editingCommentId === comment.id ? (
                                                                                <div className="space-y-3">
                                                                                    <Textarea
                                                                                        value={editingCommentText}
                                                                                        onChange={e =>
                                                                                            setEditingCommentText(
                                                                                                e.target.value
                                                                                            )
                                                                                        }
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
                                                                                            onClick={
                                                                                                handleCancelEditComment
                                                                                            }
                                                                                        >
                                                                                            <X className="mr-1 h-4 w-4" />
                                                                                            {t('common.cancel', '취소')}
                                                                                        </Button>
                                                                                        <Button
                                                                                            type="button"
                                                                                            size="sm"
                                                                                            onClick={() =>
                                                                                                handleSaveComment(
                                                                                                    comment.id
                                                                                                )
                                                                                            }
                                                                                            disabled={isFeedUpdating}
                                                                                        >
                                                                                            {isFeedUpdating ? (
                                                                                                <Loader className="h-4 w-4" />
                                                                                            ) : (
                                                                                                <>
                                                                                                    <Save className="mr-1 h-4 w-4" />
                                                                                                    {t(
                                                                                                        'common.save',
                                                                                                        '저장'
                                                                                                    )}
                                                                                                </>
                                                                                            )}
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <div className="mb-2 flex justify-between">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <Badge
                                                                                                variant="outline"
                                                                                                className="bg-muted/50"
                                                                                            >
                                                                                                #{comment.no}
                                                                                            </Badge>
                                                                                            <span className="text-muted-foreground text-sm">
                                                                                                {formatDate(
                                                                                                    comment.createdAt
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="flex space-x-1">
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                                className="h-8 w-8 p-0"
                                                                                                onClick={() =>
                                                                                                    handleEditComment(
                                                                                                        comment
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <Edit className="h-4 w-4" />
                                                                                            </Button>
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                                className="h-8 w-8 p-0"
                                                                                                onClick={() =>
                                                                                                    handleDeleteComment(
                                                                                                        comment.id
                                                                                                    )
                                                                                                }
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
                                                                                        <p className="whitespace-pre-wrap text-sm">
                                                                                            {comment.text}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="mt-2 flex justify-between text-xs">
                                                                                        <div className="text-muted-foreground">
                                                                                            {t(
                                                                                                'feeds.form.commentUserId',
                                                                                                'User ID'
                                                                                            )}
                                                                                            : {comment.userId || '-'}
                                                                                        </div>
                                                                                        {comment.likeCount > 0 && (
                                                                                            <div className="flex items-center">
                                                                                                <span className="mr-1">
                                                                                                    {t(
                                                                                                        'feeds.form.likes',
                                                                                                        '좋아요'
                                                                                                    )}
                                                                                                    :
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
                                                                                    onClick={() =>
                                                                                        handlePageChange(
                                                                                            currentPage - 1
                                                                                        )
                                                                                    }
                                                                                    aria-disabled={currentPage <= 0}
                                                                                    tabIndex={
                                                                                        currentPage <= 0
                                                                                            ? -1
                                                                                            : undefined
                                                                                    }
                                                                                    className={
                                                                                        currentPage <= 0
                                                                                            ? 'pointer-events-none opacity-50'
                                                                                            : 'cursor-pointer'
                                                                                    }
                                                                                />
                                                                            </PaginationItem>

                                                                            {paginationRange.map(
                                                                                (pageNumber, index) => (
                                                                                    <PaginationItem key={index}>
                                                                                        {pageNumber === '...' ? (
                                                                                            <PaginationEllipsis />
                                                                                        ) : (
                                                                                            <PaginationLink
                                                                                                className="cursor-pointer"
                                                                                                onClick={() =>
                                                                                                    handlePageChange(
                                                                                                        Number(
                                                                                                            pageNumber
                                                                                                        )
                                                                                                    )
                                                                                                }
                                                                                                isActive={
                                                                                                    currentPage ===
                                                                                                    Number(pageNumber)
                                                                                                }
                                                                                            >
                                                                                                {Number(pageNumber) + 1}
                                                                                            </PaginationLink>
                                                                                        )}
                                                                                    </PaginationItem>
                                                                                )
                                                                            )}

                                                                            <PaginationItem>
                                                                                <PaginationNext
                                                                                    onClick={() =>
                                                                                        handlePageChange(
                                                                                            currentPage + 1
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                        Math.ceil(
                                                                                            (commentsData?.total || 0) /
                                                                                                pageSize
                                                                                        ) -
                                                                                            1
                                                                                    }
                                                                                    aria-disabled={
                                                                                        currentPage ===
                                                                                        Math.ceil(
                                                                                            (commentsData?.total || 0) /
                                                                                                pageSize
                                                                                        ) -
                                                                                            1
                                                                                    }
                                                                                    className={
                                                                                        currentPage ===
                                                                                        Math.ceil(
                                                                                            (commentsData?.total || 0) /
                                                                                                pageSize
                                                                                        ) -
                                                                                            1
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
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3 border-t pt-6">
                                    <Button type="button" variant="outline" onClick={() => navigate('/feeds')}>
                                        {t('common.cancel', '취소')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isFeedCreating || isFeedUpdating}
                                        className="min-w-24 px-6"
                                    >
                                        {isFeedCreating || isFeedUpdating ? (
                                            <div className="flex items-center gap-2">
                                                <Loader size="sm" className="text-white" />
                                            </div>
                                        ) : id ? (
                                            t('common.update', '수정')
                                        ) : (
                                            t('common.create', '작성')
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};
