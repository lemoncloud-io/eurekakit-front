import { Clipboard, EditIcon, Settings, User } from 'lucide-react';

import { Images } from '@lemon/assets';
import { useOverlay } from '@lemon/overlay';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@lemon/ui-kit/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@lemon/ui-kit/components/ui/dropdown-menu';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { useFetchProfile } from '@lemon/users';

import { Link, NickName, Profile } from '../../../components';
import { useModalWithDropDown, useNavigate } from '../../../hooks';

import type { OverlayProps } from '@lemon/overlay';

export const LogoutModal = ({ open, onOpenChange }: OverlayProps) => {
    const navigate = useNavigate();
    const modal = useModalWithDropDown(open);

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle className="flex items-center justify-center py-8 text-lg">
                    로그아웃 하시겠습니까?
                </DialogTitle>
                <DialogFooter>
                    <DialogClose>취소</DialogClose>
                    <DialogClose onClick={() => navigate('/auth/logout')} className="text-accent-foreground">
                        로그아웃
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const UserPage = () => {
    const overlay = useOverlay();
    const { data: profile } = useFetchProfile();

    return (
        <div className="flex-1">
            <header className="flex h-12 items-center pr-4">
                <div className="flex h-12 flex-none items-center px-4">
                    <img src={Images.userPageLogo} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto">
                        <Settings size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => overlay.open(overlayProps => <LogoutModal {...overlayProps} />)}
                        >
                            로그아웃
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <div className="flex items-center gap-3 p-4">
                <Profile src={profile?.image} className="h-12 w-12" />
                <NickName nickname={profile?.nick ?? ''} className="text-base" />
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
                    to="viewed"
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
