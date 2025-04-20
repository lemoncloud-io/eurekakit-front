import { useCallback, useEffect, useRef } from 'react';

import { useAppChecker } from './useAppChecker';

import type { AppMessage, WebMessage } from '@lemon/types';

// NOTE: how to use on component to receive message from native app
// const { sendMessage, subscribeToMessages } = useAppMessage();
//
// useEffect(() => {
//     const unsubscribe = subscribeToMessages(message => {
//         // handle message
//     });
//     return () => {
//         unsubscribe();
//     };
// }, [subscribeToMessages]);
export const useAppMessage = () => {
    const { isOnMobileApp } = useAppChecker();
    const messageCallbacks = useRef<Set<(message: AppMessage) => void>>(new Set());

    const onMessage = useCallback((event: { data: string }) => {
        console.log('onMessage', event);
        try {
            const message: AppMessage = JSON.parse(event.data);
            console.log('onAppMessage', message);
            messageCallbacks.current.forEach(callback => callback(message));
        } catch (e) {
            console.error('onAppMessage error: ', e);
        }
    }, []);

    useEffect(() => {
        console.log('isOnMobileApp', isOnMobileApp);
        if (isOnMobileApp) {
            window.addEventListener('message', onMessage, true);
        }
        return () => {
            if (isOnMobileApp) {
                window.removeEventListener('message', onMessage, true);
            }
        };
    }, [isOnMobileApp, onMessage]);

    const sendMessage = useCallback(
        (message: WebMessage) => {
            if (!isOnMobileApp) {
                console.log('sendMessage: ', message);
            }
            if (!window['ReactNativeWebView']) {
                return;
            }
            window['ReactNativeWebView'].postMessage(JSON.stringify(message));
        },
        [isOnMobileApp]
    );

    const subscribeToMessages = useCallback((callback: (message: AppMessage) => void) => {
        messageCallbacks.current.add(callback);
        return () => {
            messageCallbacks.current.delete(callback);
        };
    }, []);

    return {
        sendMessage,
        subscribeToMessages,
    };
};
