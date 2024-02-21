import { signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import googleIcon from "../../assets/images/icons/google.svg";
import React, {useState} from "react";

export const LoginSection = ({
                                 email,
                                 password,
                                 setEmail,
                                 setPassword,
                                 setIsRegistered,
                                 commonButtonStyles
                             } : any) => {

    const [invalidLogin, setInvalidLogin] = useState('')

    const logIn = async () => {
        try {
            let response = await signInWithEmailAndPassword(auth, email, password)
            console.log('response', response)
        } catch (error : any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if ( errorCode ) {
                setInvalidLogin('Invalid login or password')
            }
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }
    const logOutHandler = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Box>
            <Box sx={{maxWidth: "230px", textAlign: "center", margin : "0 auto"}}>
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
                        setEmail(event.target.value)
                    }}
                />
                <TextField
                    label='Password'
                    type='password'
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <Box sx={{color : "red", textAlign : "center"}}>{invalidLogin}</Box>
                <Button onClick={logIn}>Login</Button>
                <Button onClick={logOutHandler} sx={{ ...commonButtonStyles}}>Log out</Button>
                <Button  onClick={signInWithGoogle} startIcon={<img src={googleIcon} alt=""/>} sx={{ ...commonButtonStyles, marginBottom : "100px"}}>
                    Continue with Google
                </Button>
                <Typography sx={{color: "#848484", textAlign: "center", margin: "0 auto", fontSize: "14px"}}>Looking for an account?</Typography>
                <Button
                    onClick={() => setIsRegistered(false)}
                    sx={{ ...commonButtonStyles,marginTop: "10px"}}>
                    Create account
                </Button>
            </Box>
        </Box>
    )
}