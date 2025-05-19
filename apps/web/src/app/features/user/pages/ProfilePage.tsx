import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { isDev, useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';
import { useFetchProfile, useUpdateUser } from '@lemon/users';

import { useNavigate } from '../../../hooks';
import { ProfileImageField, ProfileNickNameField } from '../components/profile-field';

import type { UserBody, UserView } from '@lemoncloud/pets-socials-api';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading } = useFetchProfile();
    const { toast } = useToast();
    const { setIsLoading } = useGlobalLoader();

    const methods = useForm<UserBody>({
        mode: 'all',
        defaultValues: { nick: '', image: '' },
    });

    const nickName = useWatch({ control: methods.control, name: 'nick' }) ?? '';

    const isDirty = methods.formState.isDirty;
    const isNickNameError = nickName.length < 3 || 10 < nickName.length;

    const { mutate: updateUser } = useUpdateUser();

    const submitUser = (body: UserBody) => {
        setIsLoading(true);
        updateUser(
            { id: profile?.id, body },
            { onSuccess: onSuccessUpdate, onError: () => setIsLoading(false), onSettled: () => setIsLoading(false) }
        );
    };

    useEffect(() => {
        if (!isLoading) {
            methods.reset({ nick: profile?.nick, image: profile?.image });
        }
    }, [isLoading]);

    return (
        <div className="flex h-full flex-1 flex-col">
            <Form {...methods}>
                <div className="flex flex-col gap-4 p-4">
                    {isDev() && <DevTool control={methods.control} />}
                    <div className="text-secondary-foreground flex flex-col items-center justify-center gap-2 text-sm">
                        <ProfileImageField />
                        <span>프로필 사진 변경</span>
                    </div>
                    <ProfileNickNameField />
                </div>
            </Form>
            <div className="flex gap-2 p-4">
                <Button size={'lg'} className="flex-1" variant={'outline'} onClick={() => navigate(-1)}>
                    취소
                </Button>
                <Button
                    size={'lg'}
                    className="flex-1"
                    disabled={!isDirty || isNickNameError}
                    onClick={methods.handleSubmit(submitUser)}
                >
                    작성 완료
                </Button>
            </div>
        </div>
    );

    function onSuccessUpdate(data: UserView) {
        toast({ description: '프로필 수정이 완료되었습니다.', className: 'flex justify-center items-center' });
    }
};
