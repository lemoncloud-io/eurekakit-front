import { useForm, useWatch } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { feedsKeys, useCreateFeed } from '@lemon/feeds';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { Editor } from '../../editor';

import type { FeedView } from '@lemon/feeds';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const CreateFeedPage = () => {
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
    const isContentDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isContentDirty);

    const onSuccessCreate = async (feedResult: FeedView) => {
        toast({ description: '게시글 등록이 완료되었습니다.', className: 'justify-center' });
        navigate(`/feed/${feedResult.id}`, { replace: true });
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    };

    const submitFeed = (feedBody: FeedBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        createFeed(feedBody, {
            onSuccess: onSuccessCreate,
            onError: () => setBlockerOn(true),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <div className="h-full p-4">
            <Form {...methods}>
                <Editor isSubmitting={isPending} onValid={submitFeed} />
            </Form>
        </div>
    );
};
