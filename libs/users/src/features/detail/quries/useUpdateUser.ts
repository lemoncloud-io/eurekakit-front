import { useMutation } from '@tanstack/react-query';

import { updateUser } from '../apis';

import type { UserBody } from '@lemoncloud/pets-socials-api';

export const useUpdateUser = () =>
    useMutation({ mutationFn: ({ id, body }: { id?: string; body?: UserBody }) => updateUser(id, body) });
