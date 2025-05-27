import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { feedsKeys, useFetchFeed, useUpdateFeed } from '@lemon/feeds';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { useFormBlockModal, useNavigate } from '../../../hooks';
import { OwnerGuard } from '../../auth';
import { Editor } from '../../editor';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const UpdateFeedPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { setIsLoading } = useGlobalLoader();
    const { toast } = useToast();

    const { data: feed } = useFetchFeed(params.feedId);
    const { mutate: updateFeed, isPending } = useUpdateFeed();

    const methods = useForm<FeedBody>({
        mode: 'all',
        defaultValues: { image$$: [], text: '' },
        values: feed,
    });

    const watchedImages = useWatch({ control: methods.control, name: 'image$$' });
    const watchedText = useWatch({ control: methods.control, name: 'text' });

    const isTextDirty = watchedText?.length !== 0;
    const isImageDirty = !!watchedImages && watchedImages?.length !== 0;
    const isContentDirty = isTextDirty || isImageDirty;

    const { setBlockerOn } = useFormBlockModal(isContentDirty, {
        title: '수정하기를 중단하시겠습니까?',
        description: '해당 화면에서 이탈 시 변경된 내용이 사라집니다.',
    });

    const onSuccessUpdate = async () => {
        toast({ description: '수정이 완료되었습니다.', className: 'justify-center' });
        navigate(-1);
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    };

    const submitFeed = (feedBody: FeedBody) => {
        setBlockerOn(false);
        setIsLoading(true);

        updateFeed(
            { id: params.feedId, body: feedBody },
            {
                onSuccess: onSuccessUpdate,
                onError: () => setBlockerOn(true),
                onSettled: () => setIsLoading(false),
            }
        );
    };

    return (
        <OwnerGuard ownerId={feed.user$.id}>
            <div className="h-full p-4">
                <Form {...methods}>
                    <Editor isSubmitting={isPending} onValid={submitFeed} />
                </Form>
            </div>
        </OwnerGuard>
    );
};
