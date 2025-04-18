import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

import { feedKeys, useCrerateFeed, useFetchFeed } from '@lemon/feeds';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { PostEditor } from '../components';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const UpdatePostPage = () => {
    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const params = useParams();

    const { data: post, isPending: isLoadingPost } = useFetchFeed(params.postId);
    const { mutate: createFeed, isPending } = useCrerateFeed();

    const methods = useForm<FeedBody>({
        mode: 'all',
        defaultValues: { image$$: [], text: '' },
        values: post,
    });

    const watchedImages = useWatch({ control: methods.control, name: 'images' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isPostDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isPostDirty, {
        title: '수정하기를 중단하시겠습니까?',
        description: '해당 화면에서 이탈 시 변경된 내용이 사라집니다.',
    });

    const submitPost = (feedBody: FeedBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        createFeed(feedBody, {
            onSuccess: onSuccessUpdate,
            onError: () => setBlockerOn(true),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <div className="w-full">
            <header className="flex h-12 w-full items-center justify-between border-b px-2">
                <div className="w-9" />
                <span className="font-medium">수정하기</span>
                <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                    <X />
                </Button>
            </header>
            {!isLoadingPost && (
                <Form {...methods}>
                    <PostEditor isSubmitting={isPending} onValid={submitPost} />
                </Form>
            )}
        </div>
    );

    async function onSuccessUpdate() {
        toast({ description: '수정이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: feedKeys.all });
    }
};
