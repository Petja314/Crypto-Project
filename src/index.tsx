import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {theme} from './App';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {store} from "./components/redux/ReduxStore";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);

