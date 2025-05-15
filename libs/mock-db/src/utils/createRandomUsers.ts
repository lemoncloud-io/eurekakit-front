import { faker } from '@faker-js/faker';

import { db } from '../db';

export const createRandomUsers = (count: number) =>
    Array.from({ length: count }, () => db.user.create({ id: faker.string.uuid() }));
