import { useForm, useWatch } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, X } from 'lucide-react';

import { feedsKeys, useCrerateComment } from '@lemon/feeds';
import { useOverlay } from '@lemon/overlay';
import { useGlobalLoader, useQueryState } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { PostEditor } from '../../post/components';
import { PostViewerModal } from '../components';

import type { FeedView } from '@lemon/feeds';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const CreateCommentPage = () => {
    const overlay = useOverlay();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [postId] = useQueryState('postId');

    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const { mutate: createComment, isPending } = useCrerateComment();

    const methods = useForm<FeedBody>({ mode: 'all', defaultValues: { image$$: [], text: '' } });

    const watchedImages = useWatch({ control: methods.control, name: 'image$$' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isPostDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isPostDirty);

    const submitPost = (commentBody: FeedBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        createComment(
            { feedId: postId, body: commentBody },
            {
                onSuccess: onSuccessCreate,
                onError: () => setBlockerOn(true),
                onSettled: () => setIsLoading(false),
            }
        );
    };

    return (
        <div>
            <header className="flex h-12 w-full items-center justify-between border-b px-2">
                <div className="w-9" />
                <span className="font-medium">답글 쓰기</span>
                <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                    <X />
                </Button>
            </header>
            <div className="flex flex-col gap-3 p-4">
                <Button
                    variant={'outline'}
                    className="h-14 justify-start rounded-lg"
                    onClick={() => overlay.open(overlayProps => <PostViewerModal postId={postId} {...overlayProps} />)}
                >
                    본문 보기
                    <span className="ml-auto">
                        <ChevronRight />
                    </span>
                </Button>
                <Form {...methods}>
                    <PostEditor onValid={submitPost} isSubmitting={isPending} />
                </Form>
            </div>
        </div>
    );

    async function onSuccessCreate(feedResult: FeedView) {
        toast({ description: '답글 등록이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    }
};
