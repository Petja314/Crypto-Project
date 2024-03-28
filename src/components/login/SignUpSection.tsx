import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth, db} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, signInThunkCreator} from "../../redux/AuthReducer";
import {commonButtonStyles} from "./LoginContainer";
import {RootState} from "../../redux/ReduxStore";

// Quick Description: SignUpSection Component
// Creating a new username, email, and password and handling the login process.
// Checking for password matching and handling errors.
// Sending the data to the reducer for future API calls.


const SignUpSection = ({ setIsRegistered}: any) => {
    const dispatch : any = useDispatch()
    //Conformation password handler
    const [confirmPassword, setConfirmPassword] = useState("")
    //Setting the new username
    const [userName, setUserName] = useState('')
    const {signInError, password} = useSelector((state : RootState) => state.auth)

    const signIn = async () => {
        //Checking if username was empty during the registration process
        if ( userName === "") {
            //Exit the reg. process if username was empty
            dispatch(actionsAuth.setSignInErrorAC('Create User name'))
            return
        }
        else if (password !== confirmPassword) {
            //Exit the reg. process if password was not matched
            dispatch(actionsAuth.setSignInErrorAC('Password are not matching'))
            return
        }
        //Sending the new username
        dispatch(signInThunkCreator(userName))
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px"
        }}>


            <Typography variant='h5' sx={{color: "#fff", fontWeight: "bold", textAlign: "center", maxWidth: "250px", margin: "0 auto"}}>Create Personal Account</Typography>
            <Box sx={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "350px",
                width: "100%"
            }}>
                <TextField
                    onChange={(event) => {
                        setUserName(event.target.value)
                    }}
                    label='User name'
                    type='text'
                />
                <TextField
                    onChange={(event) => {
                        dispatch(actionsAuth.setEmailAC(event.target.value))
                    }}
                    label='Email'
                    type='text'
                />
                <TextField
                    onChange={(event) => {
                        dispatch(actionsAuth.setPasswordAC(event.target.value))
                    }}
                    label='Password'
                    type='password'
                />
                <TextField
                    onChange={(event) => {
                        setConfirmPassword(event.target.value)
                    }}
                    label='Confirm Password'
                    type='password'
                />
                <Box sx={{color: "red", textAlign: "center"}}>{signInError}</Box>
                <Button sx={{marginBottom: "70px"}} onClick={signIn}>Create Personal Account</Button>

                <Typography sx={{color: "#848484", textAlign: "center", maxWidth: "250px", margin: "0 auto", fontSize: "14px"}}>Not looking for an account?</Typography>

                <Button
                    onClick={() => setIsRegistered(true)}
                    sx={{...commonButtonStyles}}>Sign In
                </Button>

            </Box>


        </Box>
    )
}


export default React.memo(SignUpSection);


