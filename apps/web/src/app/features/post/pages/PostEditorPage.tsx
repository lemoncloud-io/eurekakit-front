import { PostEditor } from '../components/post-editor/PostEditor';
import { PostEditorHeader } from '../components/post-editor-header';

export const PostEditorPage = () => {
    return (
        <div className="w-full">
            <PostEditorHeader />
            <PostEditor />
        </div>
    );
};
