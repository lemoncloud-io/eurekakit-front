export async function enableMocking() {
    if (import.meta.env.MODE !== 'development') {
        return;
    }

    const devSetting = JSON.parse(localStorage.getItem('devSetting') || JSON.stringify({ msw: true }));

    if (!devSetting.msw) {
        return;
    }

    const [{ initMockDB }, { worker }] = await Promise.all([import('@lemon/mock-db'), import('./browser')]);

    initMockDB();

    window.worker = worker;

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}
