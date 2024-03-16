import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {theme} from './App';
import {BrowserRouter, RouterProvider} from "react-router-dom";
// import {store} from "./components/redux/ReduxStore";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import store from "./components/redux/ReduxStore";
import {WagmiProvider} from "wagmi";
import {config} from "./config";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Provider store={store}>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                    <App/>
                    </QueryClientProvider>
                </WagmiProvider>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);

