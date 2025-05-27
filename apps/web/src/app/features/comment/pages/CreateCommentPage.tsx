import { useForm, useWatch } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import { commentKeys, useCrerateComment } from '@lemon/comments';
import { useOverlay } from '@lemon/overlay';
import { useGlobalLoader, useQueryState } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { Editor } from '../../editor';
import { FeedViewerModal } from '../components';

import type { CommentBody } from '@lemoncloud/pets-socials-api';

export const CreateCommentPage = () => {
    const overlay = useOverlay();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [feedId] = useQueryState('feedId');

    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const { mutate: createComment, isPending } = useCrerateComment();

    const methods = useForm<CommentBody>({ mode: 'all', defaultValues: { image$$: [], text: '' } });

    const watchedImages = useWatch({ control: methods.control, name: 'image$$' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isContentDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isContentDirty);

    const onSuccessCreate = async () => {
        toast({ description: '답글 등록이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: commentKeys.all });
    };

    const submitContent = (commentBody: CommentBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        createComment(
            { feedId, body: commentBody },
            {
                onSuccess: onSuccessCreate,
                onError: () => setBlockerOn(true),
                onSettled: () => setIsLoading(false),
            }
        );
    };

    return (
        <div className="flex flex-col gap-3 p-4">
            <Button
                variant={'outline'}
                className="h-14 justify-start rounded-lg"
                onClick={() => overlay.open(overlayProps => <FeedViewerModal feedId={feedId} {...overlayProps} />)}
            >
                본문 보기
                <span className="ml-auto">
                    <ChevronRight />
                </span>
            </Button>
            <Form {...methods}>
                <Editor onValid={submitContent} isSubmitting={isPending} />
            </Form>
        </div>
    );
};
