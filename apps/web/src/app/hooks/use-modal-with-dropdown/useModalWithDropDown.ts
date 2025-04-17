import { useEffect } from 'react';

// NOTE : dropdown과 modal 혼용 사용 시 pointer event 에러 해결을 위해 사용 -> Dialog의 modal 속성과 같이 사용해야함.
export const useModalWithDropDown = (open?: boolean) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = 'none';
            }, 0);

            return () => clearTimeout(timer);
        } else {
            document.body.style.pointerEvents = '';
        }
    }, [open]);

    return !!open;
};
