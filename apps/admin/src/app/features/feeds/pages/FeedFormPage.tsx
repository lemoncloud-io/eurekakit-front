import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

import { feedsKeys, useComments, useCreateFeed, useDeleteFeed, useFeed, useUpdateFeed } from '@lemon/feeds';
import { Loader } from '@lemon/shared';
import { Alert, AlertDescription } from '@lemon/ui-kit/components/ui/alert';
import { Badge } from '@lemon/ui-kit/components/ui/badge';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@lemon/ui-kit/components/ui/card';
import { Input } from '@lemon/ui-kit/components/ui/input';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';
import { toast } from '@lemon/ui-kit/hooks/use-toast';

import type { FeedBody, FeedView } from '@lemoncloud/lemon-feeds-api';

const formatDate = (timestamp?: number) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleString();
};

const truncateText = (text?: string, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const FeedFormPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [images, setImages] = useState<any[]>([]);

    const [commentsOpen, setCommentsOpen] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingCommentText, setEditingCommentText] = useState('');

    const { data: feed, isLoading: isLoadingFeed, error: fetchError } = useFeed(id || '');
    const updateFeed = useUpdateFeed();
    const createFeed = useCreateFeed();

    const { mutate: deleteFeed } = useDeleteFeed();

    const {
        data: commentsData,
        isLoading: isLoadingComments,
        refetch: refetchComments,
    } = useComments({ feedId: id || '', params: { limit: 100, page: 0 } });

    // 폼 상태 관리
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FeedBody>({
        defaultValues: {
            text: '',
        },
    });

    // 피드 데이터 로드 시 폼 필드 설정
    useEffect(() => {
        if (feed) {
            setValue('text', feed.text || '');

            if (feed.childNo && feed.childNo > 0) {
                setCommentsOpen(true);
            }

            // 기존 이미지 설정
            if (feed.image$$ && feed.image$$.length > 0) {
                const existingImages = feed.image$$.map(img => ({
                    id: img.id,
                    preview: img.url,
                    width: img.width,
                    height: img.height,
                    contentType: img.contentType,
                    url: img.url,
                    name: img.name,
                }));
                setImages(existingImages);
            }
        }
    }, [feed, setValue]);

    // 이미지 파일 선택 처리
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map(file => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            setImages(prev => [...prev, ...newImages]);
        }

        // 파일 인풋 초기화
        e.target.value = '';
    };

    // 이미지 삭제 처리
    const handleRemoveImage = (index: number) => {
        setImages(prev => {
            const newImages = [...prev];
            // 브라우저 메모리에서 URL 객체 해제
            if (newImages[index].preview.startsWith('blob:')) {
                URL.revokeObjectURL(newImages[index].preview);
            }
            newImages.splice(index, 1);
            return newImages;
        });
    };

    // 폼 제출 처리
    const onSubmit = async (data: FeedBody) => {
        try {
            if (id) {
                await updateFeed.mutateAsync(
                    {
                        id,
                        body: {
                            text: data.text,
                        },
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
                // 피드 생성
                await createFeed.mutateAsync(
                    {
                        text: data.text,
                    },
                    {
                        onSuccess: async (newFeed: FeedView) => {
                            await queryClient.invalidateQueries(feedsKeys.invalidateList());
                            queryClient.setQueryData(feedsKeys.detail(newFeed.id as string), newFeed);
                            toast({
                                description: t('feeds.toast.createSuccess', '피드가 성공적으로 생성되었습니다'),
                                duration: 2000,
                            });
                            navigate(`/feeds/${newFeed.id}`);
                        },
                    }
                );
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
            await updateFeed.mutateAsync(
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
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {id && feed && (
                                <div className="mb-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.id', 'ID')}
                                            </label>
                                            <Input value={feed.id} readOnly className="bg-muted/50 mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.feedNo', '피드 번호')}
                                            </label>
                                            <Input value={feed.feedNo} readOnly className="bg-muted/50 mt-1" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.createdAt', '생성일')}
                                            </label>
                                            <Input
                                                value={formatDate(feed.createdAt)}
                                                readOnly
                                                className="bg-muted/50 mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.updatedAt', '수정일')}
                                            </label>
                                            <Input
                                                value={formatDate(feed.updatedAt)}
                                                readOnly
                                                className="bg-muted/50 mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-muted-foreground text-sm font-medium">
                                            {t('feeds.form.author', '작성자')}
                                        </label>
                                        <div className="bg-muted/50 flex items-center space-x-2 rounded-md border p-2">
                                            <div>
                                                <p className="font-medium">{feed.user$?.nick || '-'}</p>
                                                {feed.user$?.name && (
                                                    <p className="text-muted-foreground text-sm">{feed.user$?.name}</p>
                                                )}
                                            </div>
                                            {feed.userId && (
                                                <Badge variant="outline" className="ml-auto">
                                                    {feed.userId}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.comments', '답글')}:
                                            </span>
                                            <Badge>{feed.childNo || 0}</Badge>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.likes', '좋아요')}:
                                            </span>
                                            <Badge variant="secondary">{feed.likeCount || 0}</Badge>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-medium">
                                                {t('feeds.form.images', '이미지')}:
                                            </span>
                                            <Badge variant="outline">{feed.image$$?.length || 0}</Badge>
                                        </div>
                                    </div>

                                    <Separator className="my-4" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    {t('feeds.form.content', '내용')}
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
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
                                    rows={6}
                                    placeholder={t('feeds.form.contentPlaceholder', '피드 내용을 입력하세요...')}
                                />
                                {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>}
                            </div>

                            {id && feed && feed.image$$ && feed.image$$.length > 0 && (
                                <div className="space-y-4">
                                    <label className="text-sm font-medium">
                                        {t('feeds.form.currentImages', '현재 이미지')}
                                    </label>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {feed.image$$.map((image, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square overflow-hidden rounded-md border"
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={`Image ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => navigate('/feeds')}>
                                    {t('common.cancel', '취소')}
                                </Button>
                                <Button type="submit" disabled={updateFeed.isPending || createFeed.isPending}>
                                    {updateFeed.isPending || createFeed.isPending ? (
                                        <div className="flex items-center gap-2">
                                            <Loader className="text-white" />
                                        </div>
                                    ) : id ? (
                                        t('common.update', '수정')
                                    ) : (
                                        t('common.create', '작성')
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};
