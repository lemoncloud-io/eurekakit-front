import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Images } from '@lemon/assets';
import { useGlobalLoader } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card } from '@lemon/ui-kit/components/ui/card';

export const LoginPage = () => {
    const { t } = useTranslation();
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
        <div className="bg-background flex min-h-screen items-center justify-center">
            <Card className="glassmorphism w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h1 className="gradient-text mb-2 text-4xl font-bold">Admin</h1>
                    <h1 className="text-text text-xl font-medium">{t('login.welcome')}</h1>
                </div>

                <div className="space-y-4">
                    <Button
                        className="flex w-full items-center justify-center space-x-2"
                        variant="outline"
                        onClick={() => onClickLogin('google')}
                    >
                        <img src={Images.googleLogo} alt="Google Logo" width={20} height={20} />
                        <span className="text-text font-medium">{t('login.googleButton')}</span>
                    </Button>

                    <Button
                        className="flex w-full items-center justify-center space-x-2 bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90"
                        onClick={() => onClickLogin('kakao')}
                    >
                        <img src={Images.kakaoLogo} alt="Kakao Logo" width={20} height={20} />
                        <span className="text-text font-medium">{t('login.kakaoButton')}</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};
