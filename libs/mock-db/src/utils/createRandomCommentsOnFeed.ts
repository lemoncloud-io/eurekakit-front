import { faker } from '@faker-js/faker';

import { db } from '../db';
import { createRandomImages } from './createRandomImages';

export const createRandomCommentsOnFeed = (feedId: string, count: number) =>
    Array.from({ length: count }).map((_, idx) => {
        const userId = faker.string.uuid();
        return db.comment.create({
            id: `${feedId}:${idx}`,
            user$: db.user.create({ id: faker.string.uuid() }),
            userId,
            image$$: createRandomImages(Math.floor(Math.random() * 6)),
            feedId,
        });
    });
