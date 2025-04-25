import { Clipboard, EditIcon, Settings, User } from 'lucide-react';

import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useWebCoreStore } from '@lemon/web-core';

import { Link, NickName, Profile } from '../../../components';

export const UserPage = () => {
    const { profile } = useWebCoreStore();

    return (
        <div className="flex-1">
            <header className="flex h-12 items-center px-4">
                <span>MY</span>
                <button className="ml-auto">
                    <Settings size={20} />
                </button>
            </header>
            <div className="flex items-center gap-3 p-4">
                <Profile src={profile?.$user.photo} className="h-12 w-12" />
                <NickName nickname={profile?.$user.nick ?? ''} className="text-base" />
            </div>
            <Separator />
            <div className="flex items-center justify-center gap-2 p-4">
                <Link
                    to="activity"
                    className="bg-muted text-foreground flex aspect-square h-auto flex-1 flex-col items-center justify-center gap-2 rounded-lg p-4 text-sm"
                >
                    <span className="bg-background text-foreground inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
                        <EditIcon size={16} />
                    </span>
                    <span>내 활동 내역</span>
                </Link>
                <Link
                    to="view"
                    className="bg-muted text-foreground flex aspect-square h-auto flex-1 flex-col items-center justify-center gap-2 rounded-lg p-4 text-sm"
                >
                    <span className="bg-background text-foreground inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
                        <Clipboard size={16} />
                    </span>
                    <span>최근 본 글</span>
                </Link>
                <Link
                    to="profile"
                    className="bg-muted text-foreground flex aspect-square h-auto flex-1 flex-col items-center justify-center gap-2 rounded-lg p-4 text-sm"
                >
                    <span className="bg-background text-foreground inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
                        <User size={16} />
                    </span>
                    <span>프로필 수정</span>
                </Link>
            </div>
        </div>
    );
};
