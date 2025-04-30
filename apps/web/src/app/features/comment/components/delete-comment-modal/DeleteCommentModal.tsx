import { useQueryClient } from '@tanstack/react-query';

import { commentKeys, useDeleteComment } from '@lemon/comments';
import { useGlobalLoader } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogYes,
} from '@lemon/ui-kit/components/ui/dialog';

import { useModalWithDropDown } from '../../../../hooks';

import type { OverlayProps } from '@lemon/overlay';

interface DeleteCommentModalProps extends OverlayProps {
    commentId: string;
}

export const DeleteCommentModal = ({ commentId, open, onOpenChange }: DeleteCommentModalProps) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { setIsLoading } = useGlobalLoader();
    const { mutate: deleteComment } = useDeleteComment();

    const modal = useModalWithDropDown(open);

    const onClickDelete = () => {
        setIsLoading(true);
        deleteComment(commentId, {
            onSuccess: onSuccessDelete,
            onError: () =>
                toast({ description: '게시글을 삭제할 수 없습니다.', className: 'flex justify-center items-center' }),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent className="text-center">
                <DialogTitle withDescription>해당 글을 삭제하시겠습니까?</DialogTitle>
                <DialogDescription className="flex flex-col">
                    <span>삭제 후 내용은 복원이 불가능하며,</span>
                    <span>답글 내용도 삭제됩니다.</span>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose className="text-muted-foreground">취소</DialogClose>
                    <DialogYes onClick={onClickDelete}>삭제</DialogYes>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    async function onSuccessDelete() {
        await queryClient.invalidateQueries({ queryKey: commentKeys.all });
        toast({ description: '삭제되었습니다', className: 'flex justify-center items-center' });
    }
};
