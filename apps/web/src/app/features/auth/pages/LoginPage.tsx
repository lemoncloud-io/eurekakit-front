import { useLocation } from 'react-router-dom';

import { useAppChecker } from '@lemon/app-checker';
import { Images } from '@lemon/assets';
import { useGlobalLoader } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { HOST, SOCIAL_OAUTH_ENDPOINT } from '@lemon/web-core';

import type { LoginProvider } from '@lemon/types';

export const LoginPage = () => {
    const { setIsLoading } = useGlobalLoader();
    const location = useLocation();
    const from = location.state?.from || '/';

    const { isOnMobileApp } = useAppChecker();

    const handleSocialLoginClick = (provider: LoginProvider) => {
        switch (provider) {
            case 'kakao':
                handleSocialLogin('kakao');
                return;
            case 'google':
                handleSocialLogin('google');
                return;
            default:
                return;
        }
    };

    const handleSocialLogin = (provider: 'kakao' | 'google') => {
        setIsLoading(true);
        const state = encodeURIComponent(JSON.stringify({ from }));
        const redirectUrl = `${HOST}/auth/oauth-response?state=${state}`;

        window.location.replace(`${SOCIAL_OAUTH_ENDPOINT}/oauth/${provider}/authorize?redirect=${redirectUrl}`);
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
                onClick={() => handleSocialLoginClick('kakao')}
            >
                <span className="h-5 w-5 flex-none">
                    <img src={Images.kakaoLogo} alt="Kakao Logo" width={20} height={20} />
                </span>
                <span className="w-full">카카오 계정으로 로그인</span>
                <span className="h-5 w-5 flex-none" />
            </Button>
            {!isOnMobileApp && (
                <Button
                    className="flex w-full items-center justify-center space-x-2 rounded-full"
                    variant="secondary"
                    size={'lg'}
                    onClick={() => handleSocialLoginClick('google')}
                >
                    <span className="h-5 w-5 flex-none">
                        <img src={Images.googleLogo} alt="Google Logo" width={20} height={20} />
                    </span>
                    <span className="w-full">구글 계정으로 로그인</span>
                    <span className="h-5 w-5 flex-none" />
                </Button>
            )}
        </div>
    );
};
