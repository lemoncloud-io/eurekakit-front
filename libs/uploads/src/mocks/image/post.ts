import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

import { db } from '@lemon/mock-db';

import { IMAGE_ENDPOINT, UPLOAD } from '../../consts';

export const postHandler = [
    http.post([IMAGE_ENDPOINT, UPLOAD].join('/'), () => {
        const image = db.image.create({
            id: faker.string.uuid(),
            url: faker.image.url(),
        });

        return HttpResponse.json({
            list: [image],
            isMultipart: true,
        });
    }),
];
