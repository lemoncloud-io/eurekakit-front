import { useQueryClient } from '@tanstack/react-query';

import { feedsKeys, useDeleteFeed } from '@lemon/feeds';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@lemon/ui-kit/components/ui/dialog';

import { useModalWithDropDown, useNavigate } from '../../../../hooks';

import type { OverlayProps } from '@lemon/overlay';

interface DeletePostModalProps extends OverlayProps {
    postId: string;
}

export const DeletePostModal = ({ postId, open, onOpenChange }: DeletePostModalProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();

    const { setIsLoading } = useGlobalLoader();
    const { mutate: deletePost } = useDeleteFeed();

    const modal = useModalWithDropDown(open);

    const onClickDelete = () => {
        setIsLoading(true);
        deletePost(postId, {
            onSuccess: onSuccessDelete,
            onError: () =>
                toast({ description: '게시글을 삭제할 수 없습니다.', className: 'flex justify-center items-center' }),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-4 text-center">
                <DialogTitle className="flex h-12 items-end justify-center pb-0">
                    해당 글을 삭제하시겠습니까?
                </DialogTitle>
                <DialogDescription className="flex flex-col">
                    <span>삭제 후 내용은 복원이 불가능하며,</span>
                    <span>답글 내용도 삭제됩니다.</span>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose className="text-muted-foreground">취소</DialogClose>
                    <DialogClose className="text-accent-foreground font-semibold" onClick={onClickDelete}>
                        삭제
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    async function onSuccessDelete() {
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
        toast({ description: '삭제되었습니다', className: 'flex justify-center items-center' });
        navigate(-1);
    }
};
