import { initMockDB } from '@lemon/mock-db';

export async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const devSetting = JSON.parse(localStorage.getItem('devSetting') || JSON.stringify({ msw: true }));

    if (!devSetting.msw) {
        return;
    }

    initMockDB();

    const { worker } = await import('./browser');

    window.worker = worker;

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}
