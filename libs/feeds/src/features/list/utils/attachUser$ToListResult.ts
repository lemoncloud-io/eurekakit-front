import type { ViewWithUser$ } from '../types';
import type { ListResult } from '@lemon/shared';
import type { UserView } from '@lemon/users';

export const attachUser$ToListResult = <L extends ListResult<V>, V extends ViewWithUser$>(
    listResult: L,
    userList: UserView[]
) => {
    const withUserList = listResult.list.map(data => {
        const ownerId = data.user$?.id;

        const owner =
            userList.find(user => user.id === ownerId) ?? ({ id: 'Unknown', nick: 'Unknown' } satisfies UserView);

        return { ...data, user$: owner };
    });

    return { ...listResult, list: withUserList } as L;
};
