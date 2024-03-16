import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import PurchaseCrypto from "./components/purchase crypto/PurchaseCrypto";
import {Box, CircularProgress, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {lime} from "@mui/material/colors";
import {ReactComponent as PurchaseIcon} from "./assets/images/header-img/credit-card.svg"
import {ReactComponent as PortfolioIcon} from "./assets/images/header-img/database.svg"
import {ReactComponent as DashboardIcon} from "./assets/images/header-img/delicious.svg"
import {ReactComponent as NewsIcon} from "./assets/images/header-img/newspaper.svg"
import {ReactComponent as NftIcon} from "./assets/images/header-img/image.svg"
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import PortfolioManager from "./components/portfolio/PortfolioManager";
import Nft from "./components/nfts/Nft";
import News from "./components/news/News";
import LoginContainer from "./components/login/LoginContainer";
import {TickerTape} from "react-ts-tradingview-widgets";
import DatabaseTest from "./components/database/DatabaseTest";
import ForgotPasswords from "./components/login/ForgotPasswords";
import {auth} from "./config/firebase";
import Profile from "./components/profile/Profile";
import {profileThunkCreator} from "./components/redux/ProfileReducer";
import {useDispatch} from "react-redux";
import {CoinContainerDescription} from "./components/coin-info/CoinContainerDescription";
import Preloader from "./commons/preloader/Preloader";

// @ts-ignore
export const theme = createTheme({
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
        MuiTableRow: { // Add styles for MuiTableRow
            styleOverrides: {
                root: {

                    whiteSpace : "nowrap"
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
    {path: '/portfolio', element: <PortfolioManager/>, name: "Portfolio", icon: PortfolioIcon},
    {path: '/nft', element: <Nft/>, name: "NFT", icon: NftIcon},
    {path: '/buy-crypto', element: <PurchaseCrypto/>, name: "PurchaseCrypto", icon: PurchaseIcon},
    {path: '/news', element: <News/>, name: "News", icon: NewsIcon},
]

function App() {
    const [userLogged, setUserLogged] = useState<null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const dispatch: any = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log('in')
                setUserLogged(user)
                dispatch(profileThunkCreator( user.displayName,user.email, user.emailVerified, user.photoURL,user.uid ))
                setIsFetching(false)
                return
            }
            // console.log('out')
            setUserLogged(null)
            setIsFetching(false)
            return () => unsubscribe
        })
    }, [])


    if (isFetching) {
        return <Preloader/>
        // <Box sx={{margin: "0 auto"}}> <CircularProgress color="inherit"/> </Box>
    }
    // console.log('userLogged App : ', userLogged)
    // console.log('isFetching' , isFetching)
    return (
        <Box>
            <Header routes={routes} userLogged={userLogged}/>
            {/*<TickerTape colorTheme="dark"></TickerTape>*/}
            {/*<Suspense fallback={<Preloader visible={isFetching} />} >*/}
            <Routes>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/portfolio"} element={<PortfolioManager/>}/>
                <Route path={"/nft"} element={<Nft/>}/>
                <Route path={"/buy-crypto"} element={<PurchaseCrypto/>}/>
                <Route path={"/news"} element={<News/>}/>
                <Route path={"/login"} element={<LoginContainer userLogged={userLogged}/>}/>
                <Route path={"/reset"} element={<ForgotPasswords/>}/>
                <Route path={"/database"} element={<DatabaseTest/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/coin_info/:id?"} element={<CoinContainerDescription/>}/>
            </Routes>
            {/*</Suspense>*/}
        </Box>


    );
}

export default App;

