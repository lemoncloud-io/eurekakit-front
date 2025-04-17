import { useQueryClient } from '@tanstack/react-query';

import { useLocalStorage } from '@lemon/shared';
import { Dialog, DialogContent, DialogTitle } from '@lemon/ui-kit/components/ui/dialog';
import { Switch } from '@lemon/ui-kit/components/ui/switch';

import type { OverlayProps } from '@lemon/overlay';

export const DevModeSettingModal = (overlayProps: OverlayProps) => {
    const queryClient = useQueryClient();

    const [devSetting, setDevSetting] = useLocalStorage('devSetting', { msw: true });

    const onChangeMSW = async (checked?: boolean) => {
        if (checked) {
            setDevSetting(prev => ({ ...prev, msw: true }));
            await window.worker?.start();
        } else {
            setDevSetting(prev => ({ ...prev, msw: false }));
            window.worker?.stop();
        }

        await queryClient.invalidateQueries({ refetchType: 'all' });
        // window.location.reload();
    };

    return (
        <Dialog {...overlayProps}>
            <DialogContent showCloseBtn>
                <DialogTitle className="flex h-12 w-full items-center justify-center border-b">개발자 설정</DialogTitle>
                <div className="grid grid-cols-[1fr_40px] p-4">
                    <span>MSW Worker</span>
                    <Switch checked={devSetting.msw} onCheckedChange={onChangeMSW} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
