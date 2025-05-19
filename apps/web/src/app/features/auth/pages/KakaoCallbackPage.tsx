import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LoadingFallback } from '@lemon/shared';
import { useToast } from '@lemon/ui-kit';
import { useWebCoreStore, verifyNativeToken, webCore } from '@lemon/web-core';

import { useKakaoAuth } from '../hooks/useKakaoAuth';

export const KakaoCallbackPage = () => {
    const setIsAuthenticated = useWebCoreStore(state => state.setIsAuthenticated);
    const navigate = useNavigate();
    const { toast } = useToast();

    const [searchParams] = useSearchParams();
    const { getTokenFromCode, createLemonToken } = useKakaoAuth();

    useEffect(() => {
        const checkKakaoCodeParam = async () => {
            const code = searchParams.get('code');
            if (!code) {
                toast({ description: 'No kakao code param!', variant: 'destructive' });
                navigate(-1);
                return;
            }

            try {
                const kakaoToken = await getTokenFromCode(code);
                const oAuthToken = createLemonToken(kakaoToken);
                const tokenView = await verifyNativeToken(oAuthToken);
                const { Token: token } = tokenView;
                await webCore.buildCredentialsByToken(token);
                setIsAuthenticated(true);
            } catch (error) {
                console.error(error);
                toast({ description: error.message, variant: 'destructive' });
                navigate(-1);
            }
        };

        checkKakaoCodeParam();
    }, []);

    return <LoadingFallback />;
};
