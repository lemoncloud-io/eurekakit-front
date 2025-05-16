import { faker } from '@faker-js/faker';

import { db } from '../db';
import { createRandomImages } from './createRandomImages';

export const createRandomCommentsOnFeed = (feedId: string, count: number) =>
    Array.from({ length: count }).map((_, idx) => {
        const userId = db.user.create({ id: faker.string.uuid() }).id;
        return db.comment.create({
            id: `${feedId}:${idx}`,
            userId,
            image$$: createRandomImages(Math.floor(Math.random() * 6)),
            feedId,
        });
    });
