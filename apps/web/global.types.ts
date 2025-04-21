import type { worker } from './src/app/mocks/browser';

declare global {
    interface Window {
        worker: typeof worker;
        Kakao: any;
    }
}
