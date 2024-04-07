import React, {useState} from 'react';
import {Container, Grid,} from "@mui/material";
import {LoginInfoSection} from "./LoginInfoSection";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../../redux/ReduxStore";
import LoginSection from "./LoginSection";
import SignUpSection from "./SignUpSection";
import styles from "../../css/login/login-container.module.css"


/**
 * Quick Description: LoginContainer Component
 * Displaying the login description.
 * Showing the login option or sign-up option based on whether the user is registered or not.
 * Navigating to the dashboard after successful login.
 */

const LoginContainer = () => {
    const {authUser} = useSelector((state: RootState) => state.appInitialization)
    // isRegistered - Determines whether to display the Sign In or Login component based on the user's registration status
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    //Navigation to the dashboard after success login into the account
    if (authUser) {
        return <Navigate to="/dashboard"/>
    }

    return (
        <Container disableGutters maxWidth={false} className={styles.container}>
            <Grid container className={styles.gridContainer}>
                <LoginInfoSection/>
                <Grid item xs={12} lg={6} className={styles.gridItem}>

                    {isRegistered ? (
                        <LoginSection
                            setIsRegistered={setIsRegistered}
                        />
                    ) : (
                        <SignUpSection
                            setIsRegistered={setIsRegistered}
                        />
                    )
                    }
                </Grid>
            </Grid>
        </Container>
    )
};



export default React.memo(LoginContainer);
