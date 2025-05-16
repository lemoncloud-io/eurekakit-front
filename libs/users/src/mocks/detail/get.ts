import { HttpResponse, http } from 'msw';

import { db, myId } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, SOCIAL, USERS } from '../../consts';

export const getHandler = [
    http.get([CONTENT_ENDPOINT, USERS, 0, SOCIAL].join('/'), () => {
        let my = db.user.findFirst({ where: { id: { equals: myId } } });

        if (!my) {
            my = db.user.create({ id: myId });
        }

        return HttpResponse.json(my);
    }),
];
