// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import {StyledBadge, UserAvatar} from "../header/UserAvatar";
import {useSelector} from "react-redux";
import {auth, storage} from "../../config/firebase";
import {getAuth, deleteUser, updateProfile} from "firebase/auth";
import {ProfileAvatarUpload} from "./ProfileAvatarUpload";

const Profile = () => {
    const userProfile = useSelector((state: any) => state.userProfile.user)
    const [newName, setNewName] = useState<any>('')
    const [newEmail, setNewEmail] = useState<any>('')

    console.log('userProfile' , userProfile)
    const changeNameHandler = async (event: any) => {
        const nameValue = event.target.value
        setNewName(nameValue)
    }
    const changeEmailHandler = (event: any) => {
        const emailValue = event.target.value
        setNewEmail(emailValue)
    }


    const deleteUserAccount = async () => {
        const user: any = auth.currentUser
        try {
            await deleteUser(user)
            alert("Your account was successfully deleted!")
        } catch (error) {
            console.error(error)
        }
    }

    const saveChangesFirebase = async () => {
        console.log('run')
        const user: any = auth.currentUser
            try {
                console.log('in')
               await updateProfile(user, {
                    displayName: newName,
                } )
            }
            catch(error) {
                console.error(error)
            }
    }
    return (
        <Box mt={12} sx={{display: "flex"}}>

            <Container>
                <Paper sx={{maxWidth: "600px", width: "100%", position: "relative", margin: "0 auto"}}>
                    <Box>


                        <ProfileAvatarUpload userProfile={userProfile}/>

                        <Box mt={5} p={10}>
                            <Typography mb={5} variant="h5" sx={{textAlign: "center"}}>User Profile</Typography>
                            <Box sx={{display: "flex", gap: 2, flexDirection: "column"}}>


                                {
                                    userProfile.map((item: any, index: any) => (
                                        <Box key={index} sx={{maxWidth: "400px", width: "100%"}}>

                                            <Box>
                                                <Typography>User Id:</Typography>
                                                <TextField
                                                    fullWidth
                                                    disabled
                                                    value={item.uid}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography>Display name :</Typography>
                                                <TextField
                                                    fullWidth
                                                    onChange={changeNameHandler}
                                                    placeholder={"Choose your own nickname"}
                                                    defaultValue={item.displayName}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography>Email:</Typography>
                                                <TextField
                                                    fullWidth
                                                    onChange={changeEmailHandler}
                                                    placeholder={"Change your email"}
                                                    defaultValue={item.email}
                                                />
                                            </Box>
                                            <Box>
                                            </Box>

                                            <Box sx={{display: "flex", flexDirection: "column", width: "250px", margin: "0 auto"}}>
                                                <Button sx={{marginTop: "20px"}} onClick={saveChangesFirebase}>Save</Button>
                                                <Button sx={{marginTop: "20px"}} onClick={deleteUserAccount}>Delete Account</Button>
                                            </Box>

                                        </Box>
                                    ))
                                }


                            </Box>
                        </Box>

                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Profile;



