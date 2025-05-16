import { faker } from '@faker-js/faker';

import { db } from '../db';
import { createRandomImages } from './createRandomImages';

export const createRandomFeeds = (userId: string, count: number) =>
    Array.from({ length: count }, () => {
        const images = createRandomImages(Math.floor(Math.random() * 6));
        const likeCount = Math.floor(Math.random() * (10 ** Math.random() * 10000));

        return db.feed.create({
            id: faker.string.uuid(),
            image$$: images,
            userId,
            likeCount,
            createdAt: faker.date.recent().getTime(),
            updatedAt: faker.date.recent().getTime(),
        });
    });
