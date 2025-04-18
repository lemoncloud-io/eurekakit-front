import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

import { useOverlay } from '@lemon/overlay';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@lemon/ui-kit/components/ui/dialog';

interface formBlockModalOptions {
    title?: string;
    no?: string;
    yes?: string;
}

export const useFormBlockModal = (when?: boolean, modalOptions?: formBlockModalOptions) => {
    const overlay = useOverlay();
    const [blokerOn, setBlockerOn] = useState(true);

    const blocker = useBlocker(() => blokerOn && !!when);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            overlay.open(overlayProps => (
                <Dialog {...overlayProps}>
                    <DialogContent>
                        <DialogTitle className="flex min-h-20 items-center justify-center">
                            {modalOptions?.title ? modalOptions.title : '글쓰기를 중단하시겠어요?'}
                        </DialogTitle>
                        <DialogFooter>
                            <DialogClose onClick={() => blocker.reset?.()}>
                                {modalOptions?.no ? modalOptions.no : '취소'}
                            </DialogClose>
                            <DialogClose onClick={() => blocker.proceed?.()} className="font-semibold">
                                {modalOptions?.yes ? modalOptions.yes : '중단'}
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ));
        }
    }, [blocker]);

    return { blocker, blokerOn, setBlockerOn };
};
