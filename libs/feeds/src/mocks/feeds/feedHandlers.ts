import { HttpResponse, delay, http } from 'msw';

import { createFeedItem, feedList } from './mockFeeds';
import { ACTIVITY, DETAIL, FEED, FEEDS, HELLO, LIKED, LIST, LIST_V2, PET_ENDPOINT, USERS } from '../../consts';

import type { FeedView } from '../../types';
import type { ListResult } from '@lemon/shared';

let mutableFeedList = [...feedList];

export const feedHandler = [
    http.get([PET_ENDPOINT, FEEDS, 0, LIST_V2].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, mutableFeedList.length);

        const responseFeedList = mutableFeedList.slice(startFeedIdx, endFeedIdx);

        const Users = responseFeedList.map(feed => feed.user$);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: mutableFeedList.length,
            page,
            limit,
            Users,
        } as ListResult<FeedView>);
    }),
    http.get([PET_ENDPOINT, USERS, ':userId', FEEDS].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, mutableFeedList.length);

        const responseFeedList = mutableFeedList.slice(startFeedIdx, endFeedIdx);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: mutableFeedList.length,
            page,
            limit,
        } as ListResult<FeedView>);
    }),
    http.get([PET_ENDPOINT, FEEDS, 0, LIKED].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const likedFeedList = mutableFeedList.filter(feed => feed.$activity?.isLike);
        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, likedFeedList.length);

        const responseFeedList = likedFeedList.slice(startFeedIdx, endFeedIdx);
        const Users = responseFeedList.map(feed => feed.user$);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: likedFeedList.length,
            page,
            limit,
            Users,
        } as ListResult<FeedView>);
    }),
    http.get([PET_ENDPOINT, FEEDS, ':id', DETAIL].join('/'), async ({ params }) => {
        const feedId = params['id'];

        const targetFeed = mutableFeedList.find(feed => feed.id === feedId);

        await delay(1000);

        if (!targetFeed) {
            return HttpResponse.error();
        }

        return HttpResponse.json(targetFeed);
    }),
    http.get([PET_ENDPOINT, HELLO, FEEDS, LIST].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;
        const keyword = new URL(request.url).searchParams.get('keyword') || '';

        if (!keyword) {
            return HttpResponse.error();
        }

        const searchedFeedList = mutableFeedList.filter(feed => feed.text?.includes(keyword));

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, searchedFeedList.length);

        const responseFeedList = searchedFeedList.slice(startFeedIdx, endFeedIdx);
        const Users = responseFeedList.map(feed => feed.user$);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: searchedFeedList.length,
            page,
            limit,
            Users,
        } as ListResult<FeedView>);
    }),
    http.put([PET_ENDPOINT, FEEDS, ':id', ACTIVITY].join('/'), async ({ request, params }) => {
        const feedId = params['id'];

        const toBeLike = JSON.parse(new URL(request.url).searchParams.get('like')!) as boolean;

        const targetFeed = mutableFeedList.find(feed => feed.id === feedId)!;
        const toBeFeed = {
            ...targetFeed,
            $activity: { ...targetFeed?.$activity, isLike: toBeLike },
        };

        mutableFeedList = mutableFeedList.map(feed => (feed.id !== targetFeed.id ? feed : toBeFeed));

        await delay(1000);

        return HttpResponse.json(toBeFeed);
    }),
    http.put([PET_ENDPOINT, FEEDS, ':id'].join('/'), async ({ request, params }) => {
        const feedId = params['id'];

        const body = await request.json();

        const targetFeed = mutableFeedList.find(feed => feed.id === feedId);
        mutableFeedList = mutableFeedList
            .map(feed => (feed.id !== feedId ? feed : { ...feed, ...body }))
            .filter(feed => !feed.hidden);

        await delay(1000);

        return HttpResponse.json({ ...targetFeed, ...body });
    }),
    http.post([PET_ENDPOINT, USERS, 0, FEED].join('/'), async ({ request }) => {
        const body = await request.json();

        const nextId = Math.max(...mutableFeedList.map(feed => Number(feed.id ?? 0)));

        const newFeed = {
            ...createFeedItem(nextId + 1),
            createdAt: Date.now(),
            text: body['text'],
            image$$: body['images'],
            user$: { id: '1', nick: 'DefaultUser' },
            likeCount: 0,
            childNo: 0,
        } as FeedView;

        await delay(2000);

        mutableFeedList.unshift(newFeed);

        return HttpResponse.json(newFeed);
    }),
];
