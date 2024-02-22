import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../config/firebase";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {Dashboard} from "@mui/icons-material";


export const SignUpSection = ({
                                  email,
                                  setEmail,
                                  password,
                                  setPassword,
                                  setIsRegistered,
                                  commonButtonStyles,
                                  usersCollectionRef,
                                  usersDb,
                                  isEmailExists
                              }: any) => {
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState("")
    const [accountCreateError, setAccountCreateError] = useState('')
    // USER DATA BASE
    const [userName, setUserName] = useState('')

    const signIn = async () => {
        const isUsernameExists = usersDb.some((item: any) => item.username === userName)
        if (isUsernameExists) {
            setAccountCreateError('username already exist')
            return
        }
        else if ( userName === "") {
            setAccountCreateError('Create User name')
            return
        }
       else if (isEmailExists) {
            setAccountCreateError('Email already exist')
            return
        }
        else if (password !== confirmPassword) {
            setAccountCreateError('Password are not matching')
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await addDoc(usersCollectionRef,
                {
                    user_email: auth?.currentUser?.email,
                    username: userName,
                    user_id: auth?.currentUser?.uid
                })
            // navigate("/dashboard")
        } catch (error: any) {
            const errorCode = error.code;
            console.log('errorCode', errorCode)
            console.log('error', error)
            if (errorCode) {
                setAccountCreateError('Invalid email or password')
            }
        }
    }

    // console.log('userExistError', accountCreateError)
    // console.log('auth user name :')
    // console.log('current users-db collection :' , usersDb)
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
