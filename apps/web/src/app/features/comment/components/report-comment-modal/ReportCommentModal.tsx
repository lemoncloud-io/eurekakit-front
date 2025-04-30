import { useState } from 'react';

import { DialogClose } from '@radix-ui/react-dialog';

import { useReportComment } from '@lemon/comments';
import { useToast } from '@lemon/ui-kit';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@lemon/ui-kit/components/ui/dialog';
import { Label } from '@lemon/ui-kit/components/ui/label';
import { List } from '@lemon/ui-kit/components/ui/list';
import { RadioGroup, RadioGroupItem } from '@lemon/ui-kit/components/ui/radio-group';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { useModalWithDropDown } from '../../../../hooks';

import type { OverlayProps } from '@lemon/overlay';

interface ReportModalProps extends OverlayProps {
    commentId?: string;
}

export const ReportCommentModal = ({ commentId, open, onOpenChange }: ReportModalProps) => {
    const { toast } = useToast();
    const modal = useModalWithDropDown(open);
    const [reason, setReason] = useState<string>();

    const { mutate: reportComment } = useReportComment();

    const submitReport = () => {
        reportComment({ commentId, reason }, { onSuccess: () => toast({ description: '신고가 완료되었습니다.' }) });
    };

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseBtn>
                <DialogTitle className="text-md flex h-12 items-center justify-center border-b">신고하기</DialogTitle>
                <RadioGroup asChild onValueChange={value => setReason(value)}>
                    <List seperator={<Separator />}>
                        <Label htmlFor="reason0" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason0" value="욕설, 비방, 차별, 혐오" />
                            <span>욕설, 비방, 차별, 혐오</span>
                        </Label>
                        <Label htmlFor="reason1" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason1" value="홍보, 영리 목적" />
                            <span>홍보, 영리 목적</span>
                        </Label>
                        <Label htmlFor="reason2" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason2" value="불법 정보" />
                            <span> 불법 정보</span>
                        </Label>
                        <Label htmlFor="reason3" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason3" value="음란, 청소년 유해" />
                            <span>음란, 청소년 유해</span>
                        </Label>
                        <Label htmlFor="reason4" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason4" value="개인 정보 노출, 유포 거래" />
                            <span>개인 정보 노출, 유포 거래</span>
                        </Label>
                        <Label htmlFor="reason5" className="flex items-center gap-4 p-4">
                            <RadioGroupItem id="reason5" value="도배, 스팸" />
                            <span>도배, 스팸</span>
                        </Label>
                    </List>
                </RadioGroup>
                <DialogFooter>
                    <DialogClose
                        disabled={!reason}
                        onClick={submitReport}
                        className="text-accent-foreground font-semibold disabled:opacity-50"
                    >
                        완료
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
