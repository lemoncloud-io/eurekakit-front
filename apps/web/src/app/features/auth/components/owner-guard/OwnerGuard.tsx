import { type PropsWithChildren, useEffect } from 'react';

import { useToast } from '@lemon/ui-kit';
import { useFetchProfile } from '@lemon/users';

import { useNavigate } from '../../../../hooks';

interface OwnerGuardProps extends PropsWithChildren {
    ownerId?: string;
}

export const OwnerGuard = ({ ownerId, children }: OwnerGuardProps) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { data: profile, isLoading } = useFetchProfile();

    useEffect(() => {
        if (!profile || ownerId === profile.id) return;

        toast({ description: '소유자만 접근할 수 있습니다.' });
        navigate(-1);
    }, [ownerId, profile, navigate, toast]);

    if (isLoading || !profile || ownerId !== profile.id) {
        return null;
    }

    return children;
};
