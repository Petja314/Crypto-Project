import React, {useEffect, useState} from 'react';
import { Container, Grid,} from "@mui/material";
import {auth, db} from "../../config/firebase"
import {getDocs, collection} from "firebase/firestore"
import {LoginSection} from "./LoginSection";
import {SignUpSection} from "./SignUpSection";
import {LoginInfoSection} from "./LoginInfoSection";
import {Dashboard} from "@mui/icons-material";

export const commonButtonStyles = {
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
    const [isRegistered, setIsRegistered] = useState<any>(true)
    const usersCollectionRef = collection(db, "users-db")
    const [usersDb, setUsersDb] = useState<any>([])

    //Checking if cred. exist
    const isEmailExists = usersDb.some((item: any) => item.user_email === email)

    // console.log('auth', auth?.currentUser)
    // console.log('filterData' , movieList)
    // console.log('auth', auth?.currentUser?.photoURL)

    const getUsersDb = async () => {
        try {
            const response = await getDocs(usersCollectionRef)
            const filterData = response.docs.map((item) => ({...item.data(), id: item.id}))
            setUsersDb(filterData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersDb()
    }, [])

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
                            usersCollectionRef={usersCollectionRef}
                            usersDb={usersDb}
                            isEmailExists={isEmailExists}
                        />
                    )
                    }
                </Grid>
            </Grid>
        </Container>
    )
};








export default LoginContainer;
