import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { PostListBlock } from './PostListBlock';

import type { FeedView } from '@lemon/feeds';

interface PostListProps {
    postList?: FeedView[];
}

export const PostList = ({ postList }: PostListProps) => {
    return (
        <List seperator={<Separator />} className="gap-3 py-3">
            {postList?.map(post => <PostListBlock key={post.id} post={post} />)}
        </List>
    );
};
