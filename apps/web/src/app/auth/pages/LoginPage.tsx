import { useLocation } from 'react-router-dom';

import { Images } from '@lemon/assets';
import { useGlobalLoader } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';

export const LoginPage = () => {
    const { setIsLoading } = useGlobalLoader();
    const location = useLocation();
    const from = location.state?.from || '/home';

    const onClickLogin = (provider: string) => {
        setIsLoading(true);
        const HOST = import.meta.env.VITE_HOST.toLowerCase();
        const SOCIAL_OAUTH = import.meta.env.VITE_SOCIAL_OAUTH_ENDPOINT.toLowerCase();
        const state = encodeURIComponent(JSON.stringify({ from }));
        const redirectUrl = `${HOST}/auth/oauth-response?state=${state}`;

        window.location.replace(`${SOCIAL_OAUTH}/oauth/${provider}/authorize?redirect=${redirectUrl}`);
    };

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-background p-6">
            <div className="fixed top-0 w-full bg-[#1F1F3C] rounded-b-[24px] py-5 text-background shadow-md pl-6">
                <img src={Images.eurekaCodesLogo} alt="Eureka Codes Logo" />
            </div>
            <div className="text-center">
                <h2 className="text-muted-foreground uppercase text-2xl font-semibold">LOGIN</h2>
            </div>
            <Button
                className="w-full flex items-center justify-center space-x-2 rounded-full"
                variant="secondary"
                size={'lg'}
                onClick={() => onClickLogin('google')}
            >
                <span className="w-5 h-5 flex-none">
                    <img src={Images.googleLogo} alt="Google Logo" width={20} height={20} />
                </span>
                <span className="w-full">구글 계정으로 로그인</span>
                <span className="w-5 h-5 flex-none" />
            </Button>
        </div>
    );
};
