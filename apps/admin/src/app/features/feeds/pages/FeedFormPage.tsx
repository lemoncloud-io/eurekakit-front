import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

import { feedsKeys, useComments, useCreateFeed, useDeleteFeed, useFeed, useUpdateFeed } from '@lemon/feeds';
import { Loader, usePagination } from '@lemon/shared';
import { Alert, AlertDescription } from '@lemon/ui-kit/components/ui/alert';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@lemon/ui-kit/components/ui/card';
import { toast } from '@lemon/ui-kit/hooks/use-toast';

import { FeedBasicInfo, FeedCommentManager, FeedContentEditor, FeedFormActions } from '../components';

import type { FeedView} from '@lemon/feeds';
import type { FeedBody } from '@lemoncloud/lemon-feeds-api';

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

        methods.setValue('text', feed.text || '');
        if (feed.image$$ && feed.image$$.length > 0) {
            methods.setValue('image$$', [...feed.image$$], { shouldDirty: false });
        } else {
            methods.setValue('image$$', [], { shouldDirty: false });
        }

        if (feed.childNo && feed.childNo > 0) {
            setCommentsOpen(true);
        }
    }, [feed, methods]);

    useEffect(() => {
        if (commentsOpen && !isLoadingComments && commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = 0;
        }
    }, [currentPage, isLoadingComments, commentsOpen]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < Math.ceil((commentsData?.total || 0) / pageSize)) {
            setCurrentPage(newPage);
        }
    };

    const handleDeleteFeed = () => {
        if (!id) return;

        if (!window.confirm(t('feeds.confirm.deleteFeed', '이 피드를 삭제하시겠습니까?'))) {
            return;
        }

        setIsLoading(true);
        deleteFeed(id, {
            onSuccess: async () => {
                await queryClient.invalidateQueries(feedsKeys.invalidateList());
                toast({
                    description: t('feeds.toast.deleteFeedSuccess', '피드가 삭제되었습니다.'),
                    duration: 2000,
                });
                navigate('/feeds');
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    description: t('feeds.toast.deleteFeedError', '피드 삭제에 실패했습니다.'),
                    duration: 3000,
                    className: 'flex justify-center items-center',
                });
            },
            onSettled: () => setIsLoading(false),
        });
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
                    onSuccess: async () => {
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
                                {id && feed && <FeedBasicInfo feed={feed} />}

                                <FeedContentEditor methods={methods} />

                                {id && feed && feed.childNo > 0 && (
                                    <FeedCommentManager
                                        feedId={id}
                                        commentsData={commentsData}
                                        isLoadingComments={isLoadingComments}
                                        commentsContainerRef={commentsContainerRef}
                                        currentPage={currentPage}
                                        pageSize={pageSize}
                                        paginationRange={paginationRange}
                                        handlePageChange={handlePageChange}
                                        handleEditComment={handleEditComment}
                                        handleDeleteComment={handleDeleteComment}
                                        handleSaveComment={handleSaveComment}
                                        handleCancelEditComment={handleCancelEditComment}
                                        editingCommentId={editingCommentId}
                                        editingCommentText={editingCommentText}
                                        setEditingCommentText={setEditingCommentText}
                                        isLoading={isLoading}
                                        isFeedUpdating={isFeedUpdating}
                                        commentsOpen={commentsOpen}
                                        setCommentsOpen={setCommentsOpen}
                                    />
                                )}

                                <FeedFormActions
                                    id={id}
                                    handleDeleteFeed={handleDeleteFeed}
                                    navigate={navigate}
                                    isLoading={isLoading}
                                    isFeedUpdating={isFeedUpdating}
                                    isFeedCreating={isFeedCreating}
                                />
                            </form>
                        </FormProvider>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};
