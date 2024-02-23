import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth, db} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, signInThunkCreator} from "../redux/AuthReducer";
import {commonButtonStyles} from "./LoginContainer";


export const SignUpSection = ({ setIsRegistered}: any) => {

    const dispatch : any = useDispatch()
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userName, setUserName] = useState('')
    const accountCreateError = useSelector((state : any) => state.auth.signInError)
    const password = useSelector((state : any) => state.auth.password)

    const signIn = async () => {
        if ( userName === "") {
            dispatch(actionsAuth.setSignInErrorAC('Create User name'))
            return
        }
        else if (password !== confirmPassword) {
            dispatch(actionsAuth.setSignInErrorAC('Password are not matching'))
            return
        }
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
                <Box sx={{color: "red", textAlign: "center"}}>{accountCreateError}</Box>
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
