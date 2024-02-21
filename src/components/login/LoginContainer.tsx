import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import googleIcon from "../../assets/images/icons/google.svg"
import logoBackground from "../../assets/images/login-img/login-background.svg";
import loginImage from "../../assets/images/login-img/slide3.webp";
import {auth, db} from "../../config/firebase"
import {googleProvider} from "../../config/firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth"
import {getDocs, collection} from "firebase/firestore"
import {Link} from "react-router-dom";
import {LoginSection} from "./LoginSection";
import {SignUpSection} from "./SignUpSection";
import {LoginInfoSection} from "./LoginInfoSection";

const commonButtonStyles = {
    border: "1px solid #333",
    background: "#171717",
    color: "#fff",
    '&:hover': {
        border: "1px solid #e0f64b",
    },
};

const LoginContainer = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [movieList, setMovieList] = useState<any>([])
    const [isRegistered, setIsRegistered] = useState<any>(true)
    // pass the function db and collection name "movies"
    const moviesCollectionRef = collection(db, "movies")
    //Error - invalid credentials

    useEffect(() => {
        const getMovieList = async () => {
            // READ THE DATA
            try {
                const data = await getDocs(moviesCollectionRef)
                const filterData = data.docs.map((item) => ({...item.data(), id: item.id}))
                // debugger
                setMovieList(filterData)
                // console.log('run')
                // console.log('data :' , data)
            } catch (error) {
                console.log('error' , error)
            }
        }
        getMovieList()

    }, [])

    // console.log('auth', auth?.currentUser?.email)
    // console.log('auth', auth?.currentUser?.email)
    console.log('filterData' , movieList)
    // console.log('auth', auth?.currentUser?.photoURL)

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
                           commonButtonStyles={commonButtonStyles}
                           email={email}
                           password={password}
                           setEmail={setEmail}
                           setPassword={setPassword}
                           setIsRegistered={setIsRegistered}
                       />
                    ) : (
                        <SignUpSection
                            commonButtonStyles={commonButtonStyles}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            setIsRegistered={setIsRegistered}
                        />
                    )
                    }
                </Grid>
            </Grid>
        </Container>
    )
};








export default LoginContainer;
