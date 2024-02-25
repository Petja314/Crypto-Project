// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import React, {useRef, useState} from 'react';
import {Avatar, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {StyledBadge, UserAvatar} from "../header/UserAvatar";
import {useSelector} from "react-redux";
import noAvatar from "../../assets/images/image/blankAvatar.jpg"
import {auth, storage} from "../../config/firebase";
import {getAuth, deleteUser,updateProfile} from "firebase/auth";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";

const Profile = () => {
    console.log('uuidv4()' , uuidv4())
    // console.log('uid :', `image${uuidv4()}`)
    const userProfile = useSelector((state: any) => state.userProfile.user)
    const [newName, setNewName] = useState<any>('')
    const [newEmail, setNewEmail] = useState<any>('')
    //UPLOAD IMG
    const [newImage, setNewImage] = useState<any>(null)
    const [url, setUrl] = useState<any>(null)
    const fileInput = useRef<any>(null)
    const userImg = userProfile[0].photoURL



    const changeNameHandler = async (event: any) => {
        const nameValue = event.target.value
        setNewName(nameValue)
    }
    const changeEmailHandler = (event: any) => {
        const emailValue = event.target.value
        setNewEmail(emailValue)
    }

    // UPLOAD IMAGE
    const handleUploadClick = () => {
        fileInput?.current?.click()
    }
    const changeImageHandler =  (event : any) =>  {
        const selectedFile = event.target?.files[0]
        if (selectedFile  ) {
            setNewImage(selectedFile)
        }
    }
    const handleSubmit = () => {
        const imageRef = storageRef(storage,`image_${uuidv4()}`)
        uploadBytes(imageRef, newImage).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
            }).catch(error => {
                console.error(error)
            })
            setNewImage(null)
        })
    }


    const deleteUserAccount = async  () => {
        const user : any = auth.currentUser
        try{
            await deleteUser(user)
            alert("Your account was successfully deleted!")
        }
        catch(error) {
            console.error(error)
        }
    }

    const saveChangesFirebase = async () => {
        const user : any = auth.currentUser
        // debugger
        updateProfile(user, {
            displayName: newName,
            photoURL: url
        }).then(() => {
            alert(' Profile updated!')
            // Profile updated!
            // ...
        }).catch((error) => {
            console.log(error)
            // An error occurred
            // ...
        });
    }

    // console.log('url' , url)
    return (
        <Box mt={12} sx={{display: "flex"}}>

            <Container>
                <Paper sx={{maxWidth: "600px", width: "100%", position: "relative", margin: "0 auto"}}>
                    <Box>
                        <input type="file" onChange={changeImageHandler} style={{display : "none"}} ref={fileInput} />
                        <Box onClick={handleUploadClick} sx={{position: "absolute", top: "-35px", left: "40%" , cursor : "pointer" }}>
                            {/* border : "1px solid red"*/}
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                variant="dot"
                            >
                                <Avatar sx={{width: "130px", height: "130px"}} src={userImg ? userImg : noAvatar} alt='avatar'/>
                            </StyledBadge>
                        </Box>

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

                                            <Box sx={{display : "flex", flexDirection : "column" , width : "250px", margin : "0 auto"}}>
                                                <Button sx={{marginTop: "20px"}} onClick={saveChangesFirebase}>Save</Button>
                                                <Button sx={{marginTop: "20px"}} onClick={deleteUserAccount}>Delete Account</Button>
                                                <Button sx={{marginTop: "20px"}} onClick={handleSubmit}>UPLOAD PHOTO</Button>
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