import { http, passthrough } from 'msw';

import { db, myId } from '@lemon/mock-db';
import { OAUTH_ENDPOINT } from '@lemon/web-core';

export const postHandler = [
    http.post([OAUTH_ENDPOINT, 'oauth', ':provider', 'token'].join('/'), () => {
        const user = db.user.create({ id: myId });

        console.log('Mocked user', user.id, 'is signed up');

        return passthrough();
    }),
];
