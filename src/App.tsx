import React, {createRef, lazy, Suspense, useEffect, useState} from 'react';
import './App.css';
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Box, Card, CircularProgress, Container, createTheme, CssBaseline, styled, ThemeProvider} from "@mui/material";
import {lime} from "@mui/material/colors";
import {ReactComponent as PurchaseIcon} from "./assets/images/header-img/credit-card.svg"
import {ReactComponent as PortfolioIcon} from "./assets/images/header-img/database.svg"
import {ReactComponent as DashboardIcon} from "./assets/images/header-img/delicious.svg"
import {ReactComponent as NewsIcon} from "./assets/images/header-img/newspaper.svg"
import {auth} from "./config/firebase";
import {profileThunkCreator} from "./components/redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {CoinContainerDescription} from "./components/coin-info/CoinContainerDescription";
import Preloader, {Loader} from "./commons/preloader/Preloader";
import {appInitActions} from "./components/redux/AppInitialization";
import {RootState} from "./components/redux/ReduxStore";
import FadeTransition from "./utils/FadeTransition";
import Dashboard from './components/dashboard/Dashboard';
import PortfolioManager from './components/portfolio/PortfolioManager';
import News from './components/news/News';
import ForgotPasswords from "./components/login/ForgotPasswords";
import LoginContainer from "./components/login/LoginContainer";
import DexExchange from "./components/dex-exchange/DexExchange";
import DatabaseTest from "./components/database/DatabaseTest";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import styles from "./css/transition/transition.module.css";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./style.css"


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

                    whiteSpace: "nowrap"
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

export const StyledCard = styled(Card)(({theme: any}) => ({
    transition: "transform 0.15s ease-in-out",
    "&:hover": {transform: "scale3d(1.09, 1.09, 1)"},
}))

// const Header = lazy(() => import('./components/header/Header'));
// const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
// const PortfolioManager = lazy(() => import('./components/portfolio/PortfolioManager'));
// const News = lazy(() => import('./components/news/News'));
// const LoginContainer = lazy(() => import('./components/login/LoginContainer'));
// const DatabaseTest = lazy(() => import('./components/database/DatabaseTest'));
// const ForgotPasswords = lazy(() => import('./components/login/ForgotPasswords'));
// const Profile = lazy(() => import('./components/profile/Profile'));
// const DexExchange = lazy(() => import('./components/dex-exchange/DexExchange'));

const routesHeader = [
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard", icon: DashboardIcon},
    {path: '/portfolio', element: <PortfolioManager/>, name: "Portfolio", icon: PortfolioIcon},
    {path: '/dex-exchange', element: <DexExchange/>, name: "DEX Exchange", icon: PurchaseIcon},
    {path: '/news', element: <News/>, name: "News", icon: NewsIcon},
]

function App() {
    const dispatch: any = useDispatch()
    const [userLogged, setUserLogged] = useState<null>(null);
    const [isFetching, setIsFetching] = useState<any>(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log('in')
                setUserLogged(user)
                dispatch(profileThunkCreator(user.displayName, user.email, user.emailVerified, user.photoURL, user.uid))
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
        return <Preloader/>;
    }

    return (
        <Box>
            <Header routes={routesHeader} userLogged={userLogged}/>
            <TransitionGroup>
                <CSSTransition
                    key={location.pathname}
                    timeout={800}
                    classNames={"page"}
                    unmountOnExit
                >
                    <Box >
                        <Routes location={location}>
                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                            <Route path={"/portfolio"} element={<PortfolioManager/>}/>
                            <Route path={"/dex-exchange"} element={<DexExchange/>}/>
                            <Route path={"/news"} element={<News/>}/>
                            <Route path={"/login"} element={<LoginContainer userLogged={userLogged}/>}/>
                            <Route path={"/database"} element={<DatabaseTest/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/coin_info/:id?"} element={<CoinContainerDescription/>}/>
                        </Routes>
                    </Box>
                </CSSTransition>
            </TransitionGroup>
        </Box>
    );
}


// function App() {
//     const [userLogged, setUserLogged] = useState<null>(null)
//     const [isFetching, setIsFetching] = useState(true)
//     // const {isFetching} = useSelector((state: RootState) => state.appInitial)
//     const location = useLocation()
//     const [key,setKey] = useState('')
//
//
//     const dispatch: any = useDispatch()
//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user: any) => {
//             if (user) {
//                 // console.log('in')
//                 setUserLogged(user)
//                 dispatch(profileThunkCreator(user.displayName, user.email, user.emailVerified, user.photoURL, user.uid))
//                 // dispatch(appInitActions.setIsFetchingAC(false))
//                 setIsFetching(false)
//                 return
//             }
//             // console.log('out')
//             setUserLogged(null)
//             // dispatch(appInitActions.setIsFetchingAC(false))
//             setIsFetching(false)
//             return () => unsubscribe
//         })
//     }, [])
//
//     useEffect(() => {
//         setKey(location.pathname)
//     },[location])
//
//
//     if (isFetching) {
//         return <Preloader/>
//     }
//     // console.log('app')
//     // console.log('isFetching' ,isFetching)
//     return (
//         <Box>
//             {/*<Suspense fallback={<Loader visible/>}>*/}
//                 <Header routes={routes} userLogged={userLogged}/>
//                 {/*<TickerTape colorTheme="dark"></TickerTape>*/}
//                 {/*<FadeTransition>*/}
//
//                     <Routes>
//                         <Route path={"/dashboard"} element={<Dashboard/>}/>
//                         <Route path={"/portfolio"} element={<PortfolioManager/>}/>
//                         <Route path={"/dex-exchange"} element={<DexExchange/>}/>
//                         <Route path={"/news"} element={<News/>}/>
//                         <Route path={"/login"} element={<LoginContainer userLogged={userLogged}/>}/>
//                         <Route path={"/reset"} element={<ForgotPasswords/>}/>
//                         <Route path={"/database"} element={<DatabaseTest/>}/>
//                         <Route path={"/profile"} element={<Profile/>}/>
//                         <Route path={"/coin_info/:id?"} element={<CoinContainerDescription/>}/>
//                     </Routes>
//
//                 {/*</FadeTransition>*/}
//             {/*</Suspense>*/}
//         </Box>
//     );
// }

export default App;

