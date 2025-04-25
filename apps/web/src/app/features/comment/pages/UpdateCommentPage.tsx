import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, X } from 'lucide-react';

import { feedsKeys, useFetchComment, useUpdateComment } from '@lemon/feeds';
import { useOverlay } from '@lemon/overlay';
import { useGlobalLoader, useQueryState } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { PostEditor } from '../../post/components';
import { PostViewerModal } from '../components';

import type { CommentBody } from '@lemoncloud/pets-socials-api';

export const UpdateCommentPage = () => {
    const overlay = useOverlay();

    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const params = useParams();

    const [feedId] = useQueryState('feedId');

    const { data: comment, isPending: isLoadingComment } = useFetchComment(params.commentId);
    const { mutate: updateComment, isPending } = useUpdateComment();

    const methods = useForm<CommentBody>({
        mode: 'all',
        defaultValues: { image$$: [], text: '' },
        values: comment,
    });

    const watchedImages = useWatch({ control: methods.control, name: 'images' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isCommentDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isCommentDirty, {
        title: '수정하기를 중단하시겠습니까?',
        description: '해당 화면에서 이탈 시 변경된 내용이 사라집니다.',
    });

    const submitComment = (commentBody: CommentBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        updateComment(
            { commentId: params.commentId, body: commentBody },
            {
                onSuccess: onSuccessUpdate,
                onError: () => setBlockerOn(true),
                onSettled: () => setIsLoading(false),
            }
        );
    };

    return (
        <div className="h-full w-full">
            <header className="flex h-12 w-full items-center justify-between border-b px-2">
                <div className="w-9" />
                <span className="font-medium">수정하기</span>
                <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                    <X />
                </Button>
            </header>
            {!isLoadingComment && comment && (
                <div className="flex h-[calc(100%-3rem)] flex-col gap-3 p-4">
                    <Button
                        variant={'outline'}
                        className="h-14 w-full justify-start rounded-lg"
                        onClick={() =>
                            overlay.open(overlayProps => <PostViewerModal postId={feedId} {...overlayProps} />)
                        }
                    >
                        본문 보기
                        <span className="ml-auto">
                            <ChevronRight />
                        </span>
                    </Button>
                    <Form {...methods}>
                        <PostEditor isSubmitting={isPending} onValid={submitComment} />
                    </Form>
                </div>
            )}
        </div>
    );

    async function onSuccessUpdate() {
        toast({ description: '수정이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    }
};
