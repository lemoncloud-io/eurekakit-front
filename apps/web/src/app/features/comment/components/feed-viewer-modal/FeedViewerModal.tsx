import { Loader2, X } from 'lucide-react';

import { useFetchFeed } from '@lemon/feeds';
import { Dialog, DialogContent } from '@lemon/ui-kit/components/ui/dialog';

import { ImageListViewer } from '../../../../components';
import { FeedHeader } from '../../../feed/components';

import type { OverlayProps } from '@lemon/overlay';

interface FeedViewerModalProps extends OverlayProps {
    feedId: string;
}

export const FeedViewerModal = ({ feedId, close, ...overlayProps }: FeedViewerModalProps) => {
    const { data: feed, isLoading } = useFetchFeed(feedId);

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
                {isLoading && !feed ? (
                    <div className="flex h-24 items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    feed && (
                        <div className="flex max-h-[70vh] flex-col overflow-y-auto overflow-x-hidden p-4">
                            <FeedHeader
                                feedId={feed.id}
                                profileImg={feed.user$.image}
                                nickname={feed.user$.nick}
                                createdAt={feed.createdAt}
                                hideMenu
                            />
                            <div className="flex flex-col gap-2">
                                <p className="whitespace-pre-line break-all">{feed.text}</p>
                                <ImageListViewer images={feed.image$$} />
                            </div>
                        </div>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};
