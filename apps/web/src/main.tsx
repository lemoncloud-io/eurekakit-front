import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom/client';

import { enableMocking } from './app/mocks';
import { Router } from './app/routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enableMocking().then(() =>
    root.render(
        <StrictMode>
            <Router />
        </StrictMode>
    )
);
