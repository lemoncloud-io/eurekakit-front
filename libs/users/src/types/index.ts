import type { RequiredKeys } from '@lemon/shared';
import type { UserView as OUserView } from '@lemoncloud/pets-socials-api';

export interface UserView extends RequiredKeys<OUserView, 'id'> {}

export type WithUsers<T extends object> = T & {
    Users: UserView[];
};
