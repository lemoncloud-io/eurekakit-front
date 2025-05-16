import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { COMMENTS, CONTENT_ENDPOINT, FEEDS } from '../../consts';

import type { CommentView } from '../../types';
import type { ListResult } from '@lemon/shared';

export const getHandler = [
    http.get([CONTENT_ENDPOINT, FEEDS, ':feedId', COMMENTS].join('/'), async ({ request, params }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;
        const skip = page * limit;

        const feedId = params['feedId'] as string | undefined;

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feedId' }, { status: 400 });
        }

        const comments = db.comment.findMany({
            skip,
            take: limit,
            where: { feedId: { equals: feedId } },
            orderBy: { createdAt: 'asc' },
        });

        const total = db.comment.count({
            where: { feedId: { equals: feedId } },
        });

        const Users = comments.map(comment => comment.user$);

        await delay(2000);

        return HttpResponse.json({
            list: comments,
            total,
            page,
            limit,
            Users,
        } as ListResult<CommentView>);
    }),
];
