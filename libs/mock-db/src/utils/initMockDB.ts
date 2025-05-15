import { db } from '../db';
import { createRandomCommentsOnFeed } from './createRandomCommentsOnFeed';
import { createRandomFeeds } from './createRandomFeeds';
import { createRandomUsers } from './createRandomUsers';

export const initMockDB = () => {
    const users = createRandomUsers(5);

    for (const user of users) {
        const feedCount = Math.floor(Math.random() * 20);
        const feeds = createRandomFeeds(user, feedCount);

        for (const feed of feeds) {
            const commentCount = Math.floor(Math.random() * 20);
            createRandomCommentsOnFeed(feed.id, commentCount);

            db.feed.update({ where: { id: { equals: feed.id } }, data: { ...feed, commentPosted: commentCount } });
        }
    }

    console.log('Mocked DB intialized');
};
