import { PostEditor, PostEditorHeader } from '../components';

export const PostEditorPage = () => {
    return (
        <div className="w-full">
            <PostEditorHeader />
            <PostEditor />
        </div>
    );
};
