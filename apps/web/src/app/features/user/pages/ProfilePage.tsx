import { useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { ChevronLeft } from 'lucide-react';

import { isDev, useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form } from '@lemon/ui-kit/components/ui/form';
import { useUpdateUser } from '@lemon/users';
import { useWebCoreStore } from '@lemon/web-core';

import { useNavigate } from '../../../hooks';
import { ProfileImageField, ProfileNickNameField } from '../components/profile-field';

import type { UserBody, UserView } from '@lemoncloud/codes-backend-api';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { profile, setProfile } = useWebCoreStore();
    const { toast } = useToast();
    const { setIsLoading } = useGlobalLoader();

    const methods = useForm<UserBody>({
        mode: 'all',
        defaultValues: { nick: '', photo: '' },
        values: { nick: profile?.$user?.nick, photo: profile?.$user?.photo },
    });

    const nickName = useWatch({ control: methods.control, name: 'nick' }) ?? '';

    const isDirty = methods.formState.isDirty;
    const isNickNameError = nickName.length < 3 || 10 < nickName.length;

    const { mutate: updateUser } = useUpdateUser();

    const submitUser = (body: UserBody) => {
        setIsLoading(true);
        updateUser(
            { id: profile?.uid, body },
            { onSuccess: onSuccessUpdate, onError: () => setIsLoading(false), onSettled: () => setIsLoading(false) }
        );
    };

    return (
        <div className="flex h-full flex-1 flex-col">
            <header className="flex h-12 flex-none items-center justify-between px-4">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} />
                </button>
                <span>프로필 수정</span>
                <div className="h-5 w-5" />
            </header>
            <Form {...methods}>
                <div className="flex flex-col gap-10 p-4">
                    {isDev() && <DevTool control={methods.control} />}
                    <div className="flex flex-col gap-2">
                        <ProfileImageField />
                        <ProfileNickNameField />
                    </div>
                    <div className="flex gap-2">
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
            </Form>
        </div>
    );

    function onSuccessUpdate(data: UserView) {
        toast({ description: '프로필 수정이 완료되었습니다.', className: 'flex justify-center items-center' });
        setProfile({ ...profile, $user: { ...profile?.$user, nick: data.nick, photo: data.photo } });
    }
};
