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
    DialogYes,
} from '@lemon/ui-kit/components/ui/dialog';

import { useModalWithDropDown, useNavigate } from '../../../../hooks';

import type { OverlayProps } from '@lemon/overlay';

interface DeleteFeedModalProps extends OverlayProps {
    feedId: string;
}

export const DeleteFeedModal = ({ feedId, open, onOpenChange }: DeleteFeedModalProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();

    const { setIsLoading } = useGlobalLoader();
    const { mutate: deleteFeed } = useDeleteFeed();

    const modal = useModalWithDropDown(open);

    const onSuccessDelete = async () => {
        await queryClient.invalidateQueries({ queryKey: feedsKeys.all });
        toast({ description: '삭제되었습니다', className: 'flex justify-center items-center' });
        navigate(-1);
    };

    const onClickDelete = () => {
        setIsLoading(true);
        deleteFeed(feedId, {
            onSuccess: onSuccessDelete,
            onError: () =>
                toast({ description: '게시글을 삭제할 수 없습니다.', className: 'flex justify-center items-center' }),
            onSettled: () => setIsLoading(false),
        });
    };

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle withDescription>해당 글을 삭제하시겠습니까?</DialogTitle>
                <DialogDescription className="flex flex-col items-center">
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
};
