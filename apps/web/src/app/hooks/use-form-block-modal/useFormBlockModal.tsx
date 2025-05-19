import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

import { useOverlay } from '@lemon/overlay';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogYes,
} from '@lemon/ui-kit/components/ui/dialog';

interface formBlockModalOptions {
    title?: string;
    description?: string;
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
                        <DialogTitle withDescription={!!modalOptions?.description}>
                            {modalOptions?.title ? modalOptions.title : '글쓰기를 중단하시겠어요?'}
                        </DialogTitle>
                        {modalOptions?.description && (
                            <DialogDescription className="text-center">{modalOptions.description}</DialogDescription>
                        )}
                        <DialogFooter>
                            <DialogClose onClick={() => blocker.reset?.()}>
                                {modalOptions?.no ? modalOptions.no : '취소'}
                            </DialogClose>
                            <DialogYes onClick={() => blocker.proceed?.()}>
                                {modalOptions?.yes ? modalOptions.yes : '중단'}
                            </DialogYes>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ));
        }
    }, [blocker]);

    return { blocker, blokerOn, setBlockerOn };
};
