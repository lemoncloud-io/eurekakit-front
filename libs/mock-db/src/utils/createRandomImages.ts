import { faker } from '@faker-js/faker';

import { db } from '../db';

export const createRandomImages = (count: number) =>
    Array.from({ length: count }, () => db.image.create({ id: faker.string.uuid(), url: faker.image.url() }));
