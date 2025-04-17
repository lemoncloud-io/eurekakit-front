export async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const devSetting = JSON.parse(localStorage.getItem('devSetting') || JSON.stringify({ msw: true }));

    if (!devSetting.msw) {
        return;
    }

    const { worker } = await import('./browser');

    window.worker = worker;

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}
