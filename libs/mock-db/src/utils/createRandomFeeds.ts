import { faker } from '@faker-js/faker';

import { db } from '../db';
import { createRandomImages } from './createRandomImages';

export const createRandomFeeds = (user: ReturnType<(typeof db)['user']['create']>, count: number) =>
    Array.from({ length: count }, () => {
        const images = createRandomImages(Math.floor(Math.random() * 6));

        return db.feed.create({ id: faker.string.uuid(), image$$: images, user$: user });
    });
