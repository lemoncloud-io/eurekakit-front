import { MoreVerticalIcon } from 'lucide-react';

import { useOverlay } from '@lemon/overlay';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@lemon/ui-kit/components/ui/dropdown-menu';
import { List } from '@lemon/ui-kit/components/ui/list';

import { NickName, Profile, ReportModal } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { formatRelativeTime } from '../../../../utils';
import { DeleteFeedModal } from '../delete-feed-modal';

interface FeedHeaderProps {
    feedId: string;
    profileImg?: string;
    nickname?: string;
    createdAt: EpochTimeStamp;
    isMe?: boolean;
    hideMenu?: boolean;
}

export const FeedHeader = ({ feedId, profileImg, nickname, createdAt, isMe, hideMenu = false }: FeedHeaderProps) => {
    const navigate = useNavigate();
    const overlay = useOverlay();

    return (
        <div className="flex w-full items-center gap-2 py-2">
            <Profile src={profileImg} />
            <List
                seperator={<span className="text-muted-foreground">·</span>}
                horizontal
                className="items-center gap-1"
            >
                <NickName nickname={nickname} />
                <span className="text-muted-foreground text-sm">{formatRelativeTime(createdAt)}</span>
            </List>
            {!hideMenu && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground ml-auto aspect-square">
                        <MoreVerticalIcon size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {isMe ? (
                            <>
                                <DropdownMenuItem onClick={() => navigate(`/feed/${feedId}/update`)}>
                                    수정하기
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() =>
                                        overlay.open(overlayProps => (
                                            <DeleteFeedModal feedId={feedId} {...overlayProps} />
                                        ))
                                    }
                                >
                                    삭제하기
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem
                                onClick={() =>
                                    overlay.open(overlayProps => <ReportModal id={feedId} {...overlayProps} />)
                                }
                            >
                                신고
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
