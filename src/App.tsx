import React, {useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import PurchaseCrypto from "./components/purchase crypto/PurchaseCrypto";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {lime} from "@mui/material/colors";
import {ReactComponent as PurchaseIcon} from "./assets/images/header-img/credit-card.svg"
import {ReactComponent as PortfolioIcon} from "./assets/images/header-img/database.svg"
import {ReactComponent as DashboardIcon} from "./assets/images/header-img/delicious.svg"
import {ReactComponent as NewsIcon} from "./assets/images/header-img/newspaper.svg"
import {ReactComponent as NftIcon} from "./assets/images/header-img/image.svg"
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Portfolio from "./components/portfolio/Portfolio";
import Nft from "./components/nfts/Nft";
import News from "./components/news/News";
import LoginContainer from "./components/login/LoginContainer";
import { TickerTape } from "react-ts-tradingview-widgets";
import DatabaseTest from "./components/database/DatabaseTest";


// @ts-ignore
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: lime,
    },

    components: {


        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: '#B8B8B8',
                    letterSpacing: "-0.5px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 15,
                    transition: ".3s ease-in-out",
                    padding: "10px 40px 10px 40px",
                    borderRadius: "12px",
                    backgroundColor: '#e0f64b',
                    color: "#171717",
                    '&:hover': {
                        backgroundColor: '#171717',
                        color: "#fff",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "16px",
                },
            },
        },
    },
    typography: {
        fontFamily: 'Manrope, sans-serif',
        h2: {
            fontSize: "2rem"
        }
    },

});


const routes = [
    // {path: '/login', element: <Login /> },
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard", icon: DashboardIcon},
    {path: '/portfolio', element: <Portfolio/>, name: "Portfolio", icon: PortfolioIcon},
    {path: '/nft', element: <Nft/>, name: "NFT", icon: NftIcon},
    {path: '/buy-crypto', element: <PurchaseCrypto/>, name: "PurchaseCrypto", icon: PurchaseIcon},
    {path: '/news', element: <News/>, name: "News", icon: NewsIcon},
]

function App() {
    const navigate = useNavigate();
    const isLoginPage = window.location.pathname === '/login';

    return (
        <ThemeProvider theme={theme}>
            { !isLoginPage &&
                <Header routes={routes}/>}
            {/*<TickerTape colorTheme="dark"></TickerTape>*/}
                <CssBaseline/>
                <Routes>
                    <Route path={"/dashboard"} element={<Dashboard/>}/>
                    <Route path={"/portfolio"} element={<Portfolio/>}/>
                    <Route path={"/nft"} element={<Nft/>}/>
                    <Route path={"/buy-crypto"} element={<PurchaseCrypto/>}/>
                    <Route path={"/news"} element={<News/>}/>
                    <Route path={"/login"} element={<LoginContainer/>}/>
                    <Route path={"/database"} element={<DatabaseTest/>}/>
                </Routes>
        </ThemeProvider>
    );
}

export default App;

