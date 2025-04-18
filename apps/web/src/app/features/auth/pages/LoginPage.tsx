import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppChecker, useAppMessage } from '@lemon/app-checker';
import { Images } from '@lemon/assets';
import { useGlobalLoader } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';

import type { LoginProvider, WebMessage } from '@lemon/types';

export const LoginPage = () => {
    const { setIsLoading } = useGlobalLoader();
    const location = useLocation();
    const from = location.state?.from || '/home';

    const { isOnMobileApp, deviceInfo } = useAppChecker();
    const { sendMessage, subscribeToMessages } = useAppMessage();

    useEffect(() => {
        const unsubscribe = subscribeToMessages(async message => {
            // TODO: verify native token from api
            // if (message.type === 'SuccessToGetVerifyNativeToken') {...}
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const onClickLogin = (provider: LoginProvider) => {
        if (isOnMobileApp) {
            const message: WebMessage = { type: 'LoginWithSDK', data: { provider } };
            sendMessage(message);
            return;
        }

        setIsLoading(true);
        const HOST = import.meta.env.VITE_HOST.toLowerCase();
        const SOCIAL_OAUTH = import.meta.env.VITE_SOCIAL_OAUTH_ENDPOINT.toLowerCase();
        const state = encodeURIComponent(JSON.stringify({ from }));
        const redirectUrl = `${HOST}/auth/oauth-response?state=${state}`;

        window.location.replace(`${SOCIAL_OAUTH}/oauth/${provider}/authorize?redirect=${redirectUrl}`);
    };

    return (
        <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-4 p-6">
            <div className="text-background fixed top-0 w-full rounded-b-[24px] bg-[#1F1F3C] py-5 pl-6 shadow-md">
                <img src={Images.eurekaCodesLogo} alt="Eureka Codes Logo" />
            </div>
            <div className="text-center">
                <h2 className="text-muted-foreground text-2xl font-semibold uppercase">LOGIN</h2>
            </div>
            <Button
                className="flex w-full items-center justify-center space-x-2 rounded-full"
                variant="secondary"
                size={'lg'}
                onClick={() => onClickLogin('google')}
            >
                <span className="h-5 w-5 flex-none">
                    <img src={Images.googleLogo} alt="Google Logo" width={20} height={20} />
                </span>
                <span className="w-full">구글 계정으로 로그인</span>
                <span className="h-5 w-5 flex-none" />
            </Button>
        </div>
    );
};
