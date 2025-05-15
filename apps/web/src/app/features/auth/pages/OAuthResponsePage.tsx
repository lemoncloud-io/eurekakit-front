import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoadingFallback } from '@lemon/shared';
import { toast } from '@lemon/ui-kit/hooks/use-toast';
import { createCredentialsByProvider, useWebCoreStore } from '@lemon/web-core';

export const OAuthResponsePage = () => {
    const setIsAuthenticated = useWebCoreStore(state => state.setIsAuthenticated);
    const location = useLocation();
    const navigate = useNavigate();
    const checkLoginResultCalled = useRef(false);

    useEffect(() => {
        if (checkLoginResultCalled.current) {
            return;
        }
        checkLoginResultCalled.current = true;

        const checkLoginResult = async () => {
            const routeParams = new URLSearchParams(location.search);
            const code = routeParams.get('code') || '';
            const provider = routeParams.get('provider') || '';
            const stateParam = routeParams.get('state') || '';
            const isSuccess = code.length > 5;

            if (isSuccess) {
                await createCredentialsByProvider(provider, code);
                setIsAuthenticated(true);

                // state 파라미터에서 원래 경로 추출
                let redirectTo = '/';
                try {
                    const stateObj = JSON.parse(decodeURIComponent(stateParam));
                    redirectTo = stateObj.from || '/';
                } catch (e) {
                    console.warn('Failed to parse state parameter:', e);
                }

                navigate(redirectTo, { replace: true });
                return;
            }

            // Error occurred!
            toast({ description: '에러가 발생했습니다.', variant: 'destructive' });
            navigate('/auth/login', { replace: true });
        };

        checkLoginResult();
    }, [location.search]);

    return <LoadingFallback message={'Signing...'} />;
};
