import { useQuery } from '@tanstack/react-query';

import { userKeys } from '../../../consts';
import { fetchProfile } from '../apis';

export const useFetchProfile = () =>
    useQuery({
        queryKey: userKeys.profile(),
        queryFn: () => fetchProfile(),
    });
