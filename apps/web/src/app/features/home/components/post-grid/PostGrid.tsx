import { PostGridBlock } from './PostGridBlock';

import type { FeedView } from '@lemoncloud/pets-socials-api';

interface PostGridProps {
    postList?: FeedView[];
}

export const PostGrid = ({ postList }: PostGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {postList?.map(post => <PostGridBlock key={post.id} post={post} />)}
        </div>
    );
};
