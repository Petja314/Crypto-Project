import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

export const SignUpSection = ({
                                  email,
                                  setEmail,
                                  password,
                                  setPassword,
                                  setIsRegistered,
                                  commonButtonStyles
                              }: any) => {
    const [userExistError,setUserExistError ] = useState('')


    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error : any) {
            const errorCode = error.code;
            if ( errorCode) {
                setUserExistError('Email already exist')
            }
        }
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
                        setEmail(event.target.value)
                    }}
                    label='Email'
                    type='text'
                />
                <TextField
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    label='Password'
                    type='password'
                />
                <Box sx={{color : "red", textAlign : "center"}}>{userExistError}</Box>
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
