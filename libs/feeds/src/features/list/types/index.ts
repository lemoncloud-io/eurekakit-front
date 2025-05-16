import type { View } from '@lemoncloud/codes-backend-api/dist/cores/types';

export interface ViewWithUserId extends View {
    userId: string;
}
