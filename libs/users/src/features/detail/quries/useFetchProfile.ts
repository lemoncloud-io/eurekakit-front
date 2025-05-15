import { useSuspenseQuery } from '@tanstack/react-query';

import { userKeys } from '../../../consts';
import { fetchProfile } from '../apis';

export const useFetchProfile = () =>
    useSuspenseQuery({
        queryKey: userKeys.profile(),
        queryFn: () => fetchProfile(),
    });
