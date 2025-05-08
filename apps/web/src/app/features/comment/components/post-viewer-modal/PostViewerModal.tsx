import { Loader2, X } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';
import { Dialog, DialogContent } from '@lemon/ui-kit/components/ui/dialog';

import { ImageListViewer } from '../../../../components';
import { PostHeader } from '../../../feed/components/post/PostHeader';

import type { OverlayProps } from '@lemon/overlay';

interface PostViewerModalProps extends OverlayProps {
    postId: string;
}

export const PostViewerModal = ({ postId, close, ...overlayProps }: PostViewerModalProps) => {
    const { data: post, isLoading } = useFetchFeed(postId);

    return (
        <Dialog {...overlayProps}>
            <DialogContent className="overflow-hidden">
                <div className="flex h-12 items-center justify-center border-b px-3">
                    <div className="mr-auto w-4" />
                    <span>본문보기</span>
                    <button className="ml-auto" onClick={close}>
                        <X />
                    </button>
                </div>
                {isLoading && !post ? (
                    <div className="flex h-24 items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    post && (
                        <div className="flex max-h-[70vh] flex-col overflow-y-auto overflow-x-hidden p-4">
                            <PostHeader
                                postId={postId}
                                profileImg={post.user$.image}
                                nickname={post.user$.nick}
                                createdAt={post.createdAt}
                                hideMenu
                            />
                            <div className="flex flex-col gap-2">
                                <p className="whitespace-pre-line break-all">{post.text}</p>
                                <ImageListViewer images={post.image$$} />
                            </div>
                        </div>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};
