import type { ViewWithUserId } from '../types';
import type { UserView, WithUsers } from '../types/index';
import type { ListResult } from '@lemon/shared';

export const attachUser$ToListResult = <L extends WithUsers<ListResult<V>>, V extends ViewWithUserId>(
    listResult: L,
    userList: L['Users']
) => {
    const withUserList = listResult.list.map(data => {
        const ownerId = data.userId;

        const owner =
            userList.find(user => user.id === ownerId) ?? ({ id: 'Unknown', nick: 'Unknown' } satisfies UserView);

        return { ...data, user$: owner };
    });

    return { ...listResult, list: withUserList } as L;
};
