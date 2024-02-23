import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import googleIcon from "../../assets/images/icons/google.svg";
import React from "react";
import {useNavigate} from "react-router-dom";
import ForgotPasswords from "./ForgotPasswords";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, loginThunkCreator, logOuThunkCreator, signInWithGoogleThunkCreator} from "../redux/AuthReducer";
import {commonButtonStyles} from "./LoginContainer";


export const LoginSection = ({ setIsRegistered , userLogged }: any) => {
    const navigate = useNavigate()
    const invalidLogin = useSelector((state : any) => state.auth.loginError)
    const dispatch : any = useDispatch()

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
            <Box sx={{maxWidth: "230px", textAlign: "center", margin: "0 auto"}}>
                <img src={logo} alt=""/>
                <Typography variant='h5' sx={{color: "#fff", fontWeight: "bold", marginTop: "20px"}}>Start Your Crypto Journey Today</Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                gap: 2,
                maxWidth: "300px",
                width: "100%"
            }}
            >
                <TextField
                    label='Email'
                    type='text'
                    onChange={(event) => {
                        dispatch(actionsAuth.setEmailAC(event.target.value))
                    }}
                />
                <TextField
                    label='Password'
                    type='password'
                    onChange={(event) => {
                        dispatch(actionsAuth.setPasswordAC(event.target.value))

                    }}
                />
                <Box sx={{color: "red", textAlign: "center"}}>{invalidLogin}</Box>
                <Button onClick={logIn}>Login</Button>
                <Button onClick={logOutHandler} sx={{...commonButtonStyles}}>Log out</Button>
                <Button onClick={signInWithGoogle} startIcon={<img src={googleIcon} alt=""/>} sx={{...commonButtonStyles, marginBottom: "100px"}}>
                    Continue with Google
                </Button>


                <Box>
                    <Typography sx={{color: "#848484", textAlign: "center", margin: "0 auto", fontSize: "14px"}}>Looking for an account?</Typography>
                    <Button
                        onClick={() => setIsRegistered(false)}
                        sx={{...commonButtonStyles, maxWidth: "300px", width: "100%", marginTop: "5px", marginBottom: "5px"}}>
                        Create account
                    </Button>
                    <Typography sx={{color: "#848484", textAlign: "center", margin: "0 auto", fontSize: "14px"}}>Forgot password?</Typography>
                    <ForgotPasswords/>
                </Box>

            </Box>


        </Box>
    )
}