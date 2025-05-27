import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import { commentKeys, useFetchComment, useUpdateComment } from '@lemon/comments';
import { useOverlay } from '@lemon/overlay';
import { useGlobalLoader, useQueryState } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { OwnerGuard } from '../../auth';
import { Editor } from '../../editor';
import { FeedViewerModal } from '../components';

import type { CommentBody } from '@lemoncloud/pets-socials-api';

export const UpdateCommentPage = () => {
    const overlay = useOverlay();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const params = useParams();
    const { data: comment } = useFetchComment(params.commentId);

    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const [feedId] = useQueryState('feedId');

    const { mutate: updateComment, isPending } = useUpdateComment();

    const methods = useForm<CommentBody>({
        mode: 'all',
        defaultValues: { image$$: [], text: '' },
        values: comment,
    });

    const watchedImages = useWatch({ control: methods.control, name: 'image$$' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isCommentDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isCommentDirty, {
        title: '수정하기를 중단하시겠습니까?',
        description: '해당 화면에서 이탈 시 변경된 내용이 사라집니다.',
    });

    const onSuccessUpdate = async () => {
        toast({ description: '수정이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: commentKeys.all });
    };

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
        <OwnerGuard ownerId={comment.user$.id}>
            <div className="flex h-full flex-col gap-3 p-4">
                <Button
                    variant={'outline'}
                    className="h-14 w-full justify-start rounded-lg"
                    onClick={() => overlay.open(overlayProps => <FeedViewerModal feedId={feedId} {...overlayProps} />)}
                >
                    본문 보기
                    <span className="ml-auto">
                        <ChevronRight />
                    </span>
                </Button>
                <Form {...methods}>
                    <Editor isSubmitting={isPending} onValid={submitComment} />
                </Form>
            </div>
        </OwnerGuard>
    );
};
