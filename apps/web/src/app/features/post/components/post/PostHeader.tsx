import { MoreVerticalIcon } from 'lucide-react';

import { List } from '@lemon/ui-kit/components/ui/list';

import { NickName, Profile } from '../../../../components';
import { formatRelativeTime } from '../../../../utils';

interface PostHeaderProps {
    profileImg?: string;
    nickname: string;
    createdAt: EpochTimeStamp;
}

export const PostHeader = ({ profileImg, nickname, createdAt }: PostHeaderProps) => {
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
            <button className="text-muted-foreground ml-auto aspect-square">
                <MoreVerticalIcon size={16} />
            </button>
        </div>
    );
};
