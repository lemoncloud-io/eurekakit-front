import { feedList, generateFeeds } from './mockFeeds';

export const commentList = feedList
    .map(feed => generateFeeds(feed.childNo ?? 0, feed.id))
    .flat()
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
