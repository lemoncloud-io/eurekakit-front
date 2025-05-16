import type { RequiredKeys } from '@lemon/shared';
import type { View } from '@lemoncloud/codes-backend-api/dist/cores/types';
import type { UserView as OUserView } from '@lemoncloud/pets-socials-api';

export interface ViewWithUserId extends View {
    userId: string;
}

export interface UserView extends RequiredKeys<OUserView, 'id'> {}

export type WithUsers<T extends object> = T & {
    Users: UserView[];
};
