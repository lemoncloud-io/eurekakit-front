import { OAUTH_ENDPOINT, webCore } from '../core';
import { useWebCoreStore } from '../stores';

import type { UserProfile } from '../stores';
import type { AxiosError } from 'axios';

export const useProfile = () => {
    const { setProfile, logout } = useWebCoreStore();

    const fetchProfile = async () => {
        try {
            const { data } = await webCore
                .buildSignedRequest({
                    method: 'GET',
                    baseURL: `${OAUTH_ENDPOINT}/users/0/profile`,
                })
                .execute<UserProfile>();
            setProfile(data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);

            if ((error as AxiosError).isAxiosError && (error as AxiosError).response?.status === 403) {
                throw error;
            }
        }
    };

    return { fetchProfile };
};
