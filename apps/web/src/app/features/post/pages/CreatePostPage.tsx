import { useForm, useWatch } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

import { feedsKeys, useCreateFeed } from '@lemon/feeds';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { PostEditor } from '../components';

import type { FeedView } from '@lemon/feeds';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const CreatePostPage = () => {
    const { setIsLoading } = useGlobalLoader();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const navigate = useNavigate();

    const { mutate: createFeed, isPending } = useCreateFeed();

    const methods = useForm<FeedBody>({ mode: 'all', defaultValues: { image$$: [], text: '' } });

    const watchedImages = useWatch({ control: methods.control, name: 'image$$' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isPostDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isPostDirty);

    const submitPost = (feedBody: FeedBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        createFeed(feedBody, {
            onSuccess: onSuccessCreate,
            onError: () => setBlockerOn(true),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <div className="h-full w-full">
            <header className="flex h-12 w-full items-center justify-between border-b px-2">
                <div className="w-9" />
                <span className="font-medium">새로운 글쓰기</span>
                <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                    <X />
                </Button>
            </header>
            <div className="h-[calc(100%-3rem)] p-4">
                <Form {...methods}>
                    <PostEditor isSubmitting={isPending} onValid={submitPost} />
                </Form>
            </div>
        </div>
    );

    async function onSuccessCreate(feedResult: FeedView) {
        toast({ description: '게시글 등록이 완료되었습니다.', className: 'justify-center' });
        navigate(`/post/${feedResult.id}`, { replace: true });
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    }
};
