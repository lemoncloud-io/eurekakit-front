import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { enableMocking } from './app/mocks';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enableMocking().then(() =>
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
);
