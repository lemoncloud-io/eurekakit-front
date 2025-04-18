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
                        <div className="flex flex-col gap-1 pb-6 pt-8">
                            <DialogTitle className="flex items-center justify-center text-base">
                                {modalOptions?.title ? modalOptions.title : '글쓰기를 중단하시겠어요?'}
                            </DialogTitle>
                            {modalOptions?.description && (
                                <DialogDescription className="text-center">
                                    {modalOptions.description}
                                </DialogDescription>
                            )}
                        </div>
                        <DialogFooter>
                            <DialogClose onClick={() => blocker.reset?.()}>
                                {modalOptions?.no ? modalOptions.no : '취소'}
                            </DialogClose>
                            <DialogClose
                                onClick={() => blocker.proceed?.()}
                                className="text-accent-foreground font-semibold"
                            >
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
