import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./commons/preloader/Preloader";
import Header from "./components/header/Header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TransitionCss from "./css/transition/transition.module.css"
import PrivateRoutes from "./Routes/PrivateRoutes";
import {routesNavigation, RoutesNavigationType} from "./Routes/navigation";
import {appInitializationThunkCreator} from "./redux/AppInitialization";
import ScrollToTop from "./Routes/ScrollToTop";
import {AppDispatch, RootState} from "./redux/ReduxStore";

/**
 * Description: App Component
 * This component serves as the entry point of the application.
 * It initializes the app, displaying a preloader while fetching initialization data.
 * Routes are set up for different components, with private routes displayed based on the user's authentication status.
 * Components are rendered based on whether the user is logged in or not.
 */

function App() {
    const dispatch: AppDispatch = useDispatch()
    const location = useLocation();
    const {authUser, isFetching} = useSelector((state: RootState) => state.appInitialization)


    //Initializing the app
    useEffect(() => {
        dispatch(appInitializationThunkCreator())
    }, [dispatch])


    if (!isFetching) {
        //Show the Preloader based on app status - initialized - true/false
        return <Preloader isFetching={true}/>;
    }
    return (
        <Box>
            <ScrollToTop/>
            {authUser &&
                <Header/>
            }
            <TransitionGroup>
                <CSSTransition
                    // By the location.pathname applying the transition effect
                    key={location.pathname}
                    timeout={1000}
                    classNames={{
                        enter: TransitionCss.page_enter,
                        enterActive: TransitionCss.page_enter_active,
                        exit: TransitionCss.page_exit,
                        exitActive: TransitionCss.page_exit_activeT,
                    }}
                    unmountOnExit
                >
                    {/*Wrapping the components in Private Routes based on requirement*/}
                    <Routes location={location.pathname}>

                        {
                            routesNavigation.map((routes: RoutesNavigationType, index: number) => (
                                    routes.isPrivate ? (
                                        <Route key={index} element={<PrivateRoutes authUser={authUser}/>}>
                                            <Route path={routes.path} element={routes.element}/>
                                        </Route>
                                    ) : (
                                        <Route key={routes.name} path={routes.path} element={routes.element}/>
                                    )
                                )
                            )
                        }
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </Box>
    )
}

export default React.memo(App);


