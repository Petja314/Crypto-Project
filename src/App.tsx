import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import {Box, Card, createTheme, styled} from "@mui/material";
import {lime} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./commons/preloader/Preloader";
import Header from "./components/header/Header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "./css/transition/transition.module.css"
import PrivateRoutes from "./Routes/PrivateRoutes";
import {routesNavigation} from "./Routes/navigation";
import {appInitializationThunkCreator} from "./redux/AppInitialization";
import ScrollToTop from "./Routes/ScrollToTop";

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

/**
 * Description: App Component
 * This component serves as the entry point of the application.
 * It initializes the app, displaying a preloader while fetching initialization data.
 * Routes are set up for different components, with private routes displayed based on the user's authentication status.
 * Components are rendered based on whether the user is logged in or not.
 */

function App  () {
    const dispatch: any = useDispatch()
    const location = useLocation();
    const {authUser , isFetching} = useSelector((state : any) => state.appInitialization)

    //Initializing the app
    useEffect( () => {
         dispatch(appInitializationThunkCreator())
    },[dispatch])


    if (!isFetching) {
        //Show the Preloader based on app status - initialized - true/false
        return <Preloader isFetching={true}/>;
    }
    return (
        <Box>
            <ScrollToTop/>
            { authUser && <Header/>}
            <TransitionGroup>
                <CSSTransition
                    // By the location.pathname applying the transition effect
                    key={location.pathname}
                    timeout={1000}
                    classNames={{
                        enter: styles.page_enter,
                        enterActive: styles.page_enter_active,
                        exit: styles.page_exit,
                        exitActive: styles.page_exit_activeT
                    }}
                    unmountOnExit
                >
                    {/*Wrapping the components in Private Routes based on requirement*/}
                    <Routes location={location.pathname}>
                            {
                                routesNavigation.map((routes: any) => (
                                    routes.isPrivate ? (
                                        <Route element={<PrivateRoutes authUser={authUser}/>}>
                                            <Route path={routes.path} element={routes.element}/>
                                        </Route>
                                    ) : (
                                        <Route path={routes.path} element={routes.element}/>
                                    )
                                ))
                            }
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </Box>
    )
}
export default React.memo(App);


