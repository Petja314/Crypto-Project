import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import store from "./redux/ReduxStore";
import {createWeb3Modal} from '@web3modal/wagmi/react'
import {defaultWagmiConfig} from '@web3modal/wagmi/react/config'
import {WagmiProvider} from 'wagmi'
import {mainnet, sepolia} from 'wagmi/chains'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {theme} from "./mui/MuiTheme";
import App from "./App";


// WAGMI
// 0. Setup queryClient
const queryClient = new QueryClient()
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_API_KEY_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia] as const // Can add more chains if needed
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
})
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <WagmiProvider config={config}>
                        <App/>
                    </WagmiProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
   </ThemeProvider>
);

