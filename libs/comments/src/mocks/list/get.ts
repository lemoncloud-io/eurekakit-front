import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { COMMENTS, CONTENT_ENDPOINT, FEEDS } from '../../consts';

import type { ListResult } from '@lemon/shared';
import type { CommentView } from '@lemoncloud/pets-socials-api';

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
            where: { feedId: { equals: feedId }, hidden: { equals: false } },
            orderBy: { createdAt: 'desc' },
        });

        const total = db.comment.count({
            where: { feedId: { equals: feedId } },
        });

        const userIds = comments.map(comment => comment.userId);
        const Users = db.user.getAll().filter(user => userIds.includes(user.id));

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
