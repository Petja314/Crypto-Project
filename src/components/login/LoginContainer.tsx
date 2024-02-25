import React, {useEffect, useState} from 'react';
import { Container, Grid, TextField,} from "@mui/material";
import {auth, db} from "../../config/firebase"
import {getDocs, collection} from "firebase/firestore"
import {LoginSection} from "./LoginSection";
import {SignUpSection} from "./SignUpSection";
import {LoginInfoSection} from "./LoginInfoSection";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {actionsAuth} from "../redux/AuthReducer";
export const commonButtonStyles = {
    border: "1px solid #333",
    background: "#171717",
    color: "#fff",
    '&:hover': {
        border: "1px solid #e0f64b",
    },
};

const LoginContainer = ({userLogged} : any) => {
    const [isRegistered, setIsRegistered] = useState<any>(true)
    const usersCollectionRef = collection(db, "users-db")
    const [usersDb, setUsersDb] = useState<any>([])

    if(userLogged )  {
        return <Navigate to="/dashboard" />
    }

    // console.log('log con' , userLogged)





    // console.log('isAuth :' , isAuth.isAuth)
    // console.log('user : :' , isAuth.user)

    // const authMe = useSelector((state : any) => state.auth)

    //Checking if cred. exist
    // const isEmailExists = usersDb.some((item: any) => item.user_email === email)
    // const isUsernameExists = usersDb.some((item: any) => item.username === userName)

    // const getUsersDb = async () => {
    //     try {
    //         const response = await getDocs(usersCollectionRef)
    //         const filterData = response.docs.map((item) => ({...item.data(), id: item.id}))
    //         setUsersDb(filterData)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getUsersDb()
    // }, [])

    // console.log('auth user emailVerified :',  auth?.currentUser?.emailVerified)
    // console.log('auth user name', auth?.currentUser)
    // console.log('filterData' , movieList)
    // console.log('auth', auth?.currentUser?.photoURL)
    // console.log('auth', db)
    // console.log('usersDb', usersDb)

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








export default LoginContainer;
