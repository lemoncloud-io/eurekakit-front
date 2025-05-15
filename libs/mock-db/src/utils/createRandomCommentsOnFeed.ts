import { faker } from '@faker-js/faker';

import { db } from '../db';
import { createRandomImages } from './createRandomImages';

export const createRandomCommentsOnFeed = (feedId: string, count: number) =>
    Array.from({ length: count }).map((_, idx) =>
        db.comment.create({
            id: `${feedId}:${idx}`,
            user$: db.user.create({ id: faker.string.uuid() }),
            image$$: createRandomImages(Math.floor(Math.random() * 6)),
            parentId: feedId,
        })
    );
