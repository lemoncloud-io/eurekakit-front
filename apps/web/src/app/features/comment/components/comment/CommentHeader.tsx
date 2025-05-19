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

import { NickName, Profile } from '../../../../components';
import { useNavigate } from '../../../../hooks';
import { formatRelativeTime } from '../../../../utils';
import { DeleteCommentModal } from '../delete-comment-modal';
import { ReportCommentModal } from '../report-comment-modal';

interface CommentHeaderProps {
    commentId: string;
    feedId: string;
    nickname?: string;
    createdAt: EpochTimeStamp;
    profileImg?: string;
    isMe?: boolean;
}

export const CommentHeader = ({ commentId, feedId, profileImg, nickname, createdAt, isMe }: CommentHeaderProps) => {
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

            <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground ml-auto aspect-square">
                    <MoreVerticalIcon size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {isMe ? (
                        <>
                            <DropdownMenuItem onClick={() => navigate(`/comment/${commentId}/update?feedId=${feedId}`)}>
                                수정하기
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    overlay.open(overlayProps => (
                                        <DeleteCommentModal commentId={commentId} {...overlayProps} />
                                    ))
                                }
                            >
                                삭제하기
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuItem
                            onClick={() =>
                                overlay.open(overlayProps => (
                                    <ReportCommentModal commentId={commentId} {...overlayProps} />
                                ))
                            }
                        >
                            신고
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
