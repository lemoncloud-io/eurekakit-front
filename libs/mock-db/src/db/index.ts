import { faker, fakerKO } from '@faker-js/faker';
import { factory, manyOf, primaryKey } from '@mswjs/data';

export const myId = faker.string.uuid();

export const db = factory({
    user: {
        id: primaryKey(String),
        createdAt: () => Date.now(),
        updatedAt: () => Date.now(),
        nick: () => fakerKO.internet.username().slice(0, 10),
        name: fakerKO.person.fullName,
        image: fakerKO.image.avatar,
    },
    image: {
        id: primaryKey(String),
        url: String,
    },
    feed: {
        id: primaryKey(String),
        createdAt: () => Date.now(),
        updatedAt: () => Date.now(),
        likeCount: Number,
        viewCount: Number,
        text: () => fakerKO.lorem.paragraphs(Math.ceil(Math.random() * 5) + 1),
        userId: String,
        image$$: manyOf('image'),
        commentPosted: Number,
        commentHidden: Number,
        $activity: {
            isView: () => (Math.floor(Math.random() * 10) % 2 === 0 ? true : false),
            isLike: () => (Math.floor(Math.random() * 10) % 2 === 0 ? true : false),
        },
        hidden: () => false,
    },
    comment: {
        id: primaryKey(String),
        createdAt: () => Date.now(),
        updatedAt: () => Date.now(),
        likeCount: Number,
        text: () => fakerKO.lorem.paragraphs(Math.ceil(Math.random() * 10) + 1).slice(0, 1500),
        userId: String,
        image$$: manyOf('image'),
        Activity: {
            isView: () => (Math.floor(Math.random() * 10) % 2 === 0 ? true : false),
            isLike: () => (Math.floor(Math.random() * 10) % 2 === 0 ? true : false),
        },
        feedId: String,
        hidden: () => false,
    },
});
