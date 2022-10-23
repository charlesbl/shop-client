import React from 'react';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
if (container == null) {
    throw new Error("container null")
}
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
