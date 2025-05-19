import { HttpResponse, http } from 'msw';

import { db } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, USERS } from '../../consts';

export const putHandler = [
    http.put([CONTENT_ENDPOINT, USERS, ':id'].join('/'), async ({ request, params }) => {
        const userId = params['id'];

        if (!userId) {
            return HttpResponse.json({ message: 'Invalid userId' }, { status: 400 });
        }

        const body = await request.json();
        const user = db.user.update({ where: { id: { equals: userId } }, data: { ...body } });

        return HttpResponse.json(user);
    }),
];
