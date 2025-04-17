import { useMutation } from '@tanstack/react-query';

import { deleteFeed } from '../apis';

export const useDeleteFeed = () => useMutation({ mutationFn: (id?: string) => deleteFeed(id) });
