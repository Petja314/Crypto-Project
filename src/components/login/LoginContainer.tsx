import React, {useState} from 'react';
import {Container, Grid,} from "@mui/material";
import {LoginSection} from "./LoginSection";
import {SignUpSection} from "./SignUpSection";
import {LoginInfoSection} from "./LoginInfoSection";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../redux/ReduxStore";


// Quick Description: LoginContainer Component
// Displaying the login description.
// Showing the login option or sign-up option based on whether the user is registered or not.
// Navigating to the dashboard after successful login.

const LoginContainer = () => {
    const {authUser} = useSelector((state : RootState) => state.appInitialization)
    // isRegistered - Determines whether to display the Sign In or Login component based on the user's registration status
    const [isRegistered, setIsRegistered] = useState<any>(true)
    //Navigation to the dashboard after success login into the account
    if(authUser)  {
        return <Navigate to="/dashboard" />
    }

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{height: '100vh', display: 'flex',}}>

            <Grid container sx={{flex: 1}}>

                <LoginInfoSection/>

                <Grid item  xs={6} sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
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



export const commonButtonStyles = {
    border: "1px solid #333",
    background: "#171717",
    color: "#fff",
    '&:hover': {
        border: "1px solid #e0f64b",
    },
};

export default LoginContainer;
