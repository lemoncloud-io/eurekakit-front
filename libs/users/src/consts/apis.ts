export const USER_ENDPOINT = window.OAUTH_ENDPOINT || import.meta.env.VITE_OAUTH_ENDPOINT;
export const CONTENT_ENDPOINT =
    window.CONTENT_API_ENDPOINT?.toLowerCase() || import.meta.env.VITE_CONTENT_API_ENDPOINT?.toLowerCase();

export const USERS = 'users';

export const SOCIAL = 'social';
