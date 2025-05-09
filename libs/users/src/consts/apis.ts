export const USER_ENDPOINT = window.OAUTH_ENDPOINT || import.meta.env.VITE_OAUTH_ENDPOINT;
export const PET_ENDPOINT =
    window.PET_API_ENDPOINT?.toLowerCase() || import.meta.env.VITE_PET_API_ENDPOINT?.toLowerCase();

export const USERS = 'users';

export const SOCIAL = 'social';
