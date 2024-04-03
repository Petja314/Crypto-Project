import {Box, Button, TextField, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import googleIcon from "../../assets/images/icons/google.svg";
import React from "react";
import ForgotPasswords from "./ForgotPasswords";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, loginThunkCreator, logOuThunkCreator, signInWithGoogleThunkCreator} from "../../redux/AuthReducer";
import {commonButtonStyles} from "./LoginContainer";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import styles from "../../css/login/login-section.module.css"


/**
 * Quick Description: LoginSection Component
 * Logging in with existing credentials: username, password.
 * Providing options for login/sign-in with Google based on whether the user is registered or new.
 * Handling errors during the login process.
 * Sending the data to the reducer for future API calls.
 */

type LoginSectionPropsType = {
    setIsRegistered: any
}
const LoginSection = ({setIsRegistered}: LoginSectionPropsType) => {
    // loginError - Displays an error message if there is one during the login process
    const invalidLogin = useSelector((state: RootState) => state.auth.loginError)
    const dispatch: AppDispatch = useDispatch()


    const logIn = async () => {
        dispatch(loginThunkCreator())
    }
    const signInWithGoogle = async () => {
        dispatch(signInWithGoogleThunkCreator())
    }
    const logOutHandler = async () => {
        dispatch(logOuThunkCreator())
    }

    return (
        <Box>
            <Box className={styles.coinBox}>
                <img src={logo} alt=""/>
                <Typography variant='h5' className={styles.coinBoxTitle}>
                    Start Your Crypto Journey Today
                </Typography>
            </Box>

            <Box className={styles.formContainer}>
                <TextField label='Email' type='text'
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               dispatch(actionsAuth.setEmailAC(event.target.value))
                           }}
                />
                <TextField label='Password' type='password'
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               dispatch(actionsAuth.setPasswordAC(event.target.value))
                           }}
                />
                <Box className={styles.errorMessage}>{invalidLogin}</Box>
                <Button onClick={logIn}>Login</Button>
                <Button onClick={logOutHandler} sx={{...commonButtonStyles}}>Log out</Button>
                <Button onClick={signInWithGoogle} startIcon={<img src={googleIcon} alt=""/>} sx={{...commonButtonStyles, marginBottom: "20px"}}>
                    Continue with Google
                </Button>


                <Box>
                    <Typography className={styles.accountText}>Looking for an account?</Typography>
                    <Button
                        onClick={() => setIsRegistered(false)}
                        className={styles.createAccountButton}
                        sx={{...commonButtonStyles}}
                    >
                        Create account
                    </Button>
                    <Typography className={styles.forgotPassword}>
                        Forgot password?
                    </Typography>
                    <ForgotPasswords/>
                </Box>

            </Box>


        </Box>
    )
}

export default React.memo(LoginSection);
