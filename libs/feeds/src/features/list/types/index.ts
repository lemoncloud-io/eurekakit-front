import type { UserView } from '@lemon/users';
import type { View } from '@lemoncloud/codes-backend-api/dist/cores/types';

export interface ViewWithUser$ extends View {
    user$: UserView;
}
