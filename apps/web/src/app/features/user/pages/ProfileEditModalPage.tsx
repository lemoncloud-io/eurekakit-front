import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { isDev, useGlobalLoader } from '@lemon/shared';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogYes } from '@lemon/ui-kit/components/ui/dialog';
import { Form } from '@lemon/ui-kit/components/ui/form';
import { useFetchProfile, useUpdateUser } from '@lemon/users';

import { useNavigate } from '../../../hooks';
import { ProfileImageField, ProfileNickNameField } from '../components/profile-field';

import type { UserBody } from '@lemoncloud/pets-socials-api';

export const ProfileEditModalPage = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading } = useFetchProfile();
    const { setIsLoading } = useGlobalLoader();

    const methods = useForm<UserBody>({
        mode: 'all',
        defaultValues: { nick: '', image: '' },
    });

    const nickName = useWatch({ control: methods.control, name: 'nick' }) ?? '';

    const isNickNameError = nickName.length < 3 || 10 < nickName.length;

    const { mutate: updateUser } = useUpdateUser();

    const submitUser = (body: UserBody) => {
        setIsLoading(true);
        updateUser(
            { id: profile?.id, body },
            {
                onSuccess: () => navigate('/home'),
                onError: () => setIsLoading(false),
                onSettled: () => setIsLoading(false),
            }
        );
    };

    useEffect(() => {
        if (!isLoading) {
            methods.reset({ nick: profile?.nick, image: profile?.image });
        }
    }, [isLoading]);

    return (
        <div>
            <Dialog open>
                <DialogContent>
                    <DialogTitle className="flex gap-1">
                        <span>닉네임 설정</span>
                        <span className="text-destructive">[필수]</span>
                    </DialogTitle>
                    <Form {...methods}>
                        <div className="flex flex-col gap-10 p-4">
                            {isDev() && <DevTool control={methods.control} />}
                            <div className="text-secondary-foreground flex w-full flex-col items-center justify-center gap-2 pb-2 pt-4 text-sm">
                                <ProfileImageField />
                                <span>프로필 사진[선택]</span>
                            </div>
                            <ProfileNickNameField />
                        </div>
                    </Form>
                    <DialogFooter>
                        <DialogYes
                            disabled={isNickNameError}
                            onClick={methods.handleSubmit(submitUser)}
                            className="disabled:opacity-50"
                        >
                            완료
                        </DialogYes>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
