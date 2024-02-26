// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import noAvatar from "../../assets/images/image/blankAvatar.jpg"
import {storage} from "../../config/firebase";
import {StyledBadge, UserAvatar} from "../header/UserAvatar";
import {useSelector} from "react-redux";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {auth} from "../../config/firebase";
import {getAuth, deleteUser, updateProfile} from "firebase/auth";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import Avatar1 from "../../assets/images/profile_avatars/avatar-1.png"


export const ProfileAvatarUpload = ({userProfile}: any) => {
    const userImg = userProfile[0].photoURL
    const [openAvatarEdit, setOpenAvatarEdit] = useState(false)
    //UPLOAD IMG
    const [newImage, setNewImage] = useState<any>(null)
    const [url, setUrl] = useState<any>(null)
    const fileInput = useRef<any>(null)

    //
    useEffect(() => {
        if (newImage) {
            handleSubmit()
        }
    }, [newImage])

    const handleUploadClick = () => {
        fileInput?.current?.click()
    }
    const changeImageHandler = (event: any) => {
        const selectedFile = event.target?.files[0]
        if (selectedFile) {
            console.log('selected')
            // setNewImage(URL.createObjectURL(selectedFile))
            setNewImage(selectedFile)
        }
    }
    const handleSubmit = () => {
        const imageRef = storageRef(storage, `user_avatar/image_${uuidv4()}`)
        uploadBytes(imageRef, newImage).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
            }).catch(error => {
                console.error(error)
            })
            setNewImage(null)
        })
    }

    const saveProfileAvatarFirebase = async () => {
        const user: any = auth.currentUser
        try {
            await updateProfile(user, {
                photoURL: url
            })
        } catch (error) {
            console.error(error)
        } finally {
            setOpenAvatarEdit(false)
        }
    }

    const getValue = (event : any) => {
        console.log('event : ' , event.target.src)
        setNewImage(event.target.src)
        // handleSubmit()
    }

    // console.log('newImage :' ,newImage)
    console.log('url :' ,url)
    // console.log('openAvatarEdit :', openAvatarEdit)
    return (
        <Box>
            <Box onClick={() => setOpenAvatarEdit(true)} sx={{position: "absolute", top: "-35px", left: "40%", cursor: "pointer"}}>
                <Avatar sx={{width: "130px", height: "130px"}} src={userImg ? userImg : noAvatar} alt='avatar'/>
            </Box>


            <Dialog open={openAvatarEdit}>
                <DialogTitle variant='h6'>Add Custom Avatar</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenAvatarEdit(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>

                    <Box sx={{display: "flex", justifyContent: "center", gap: 3}}>
                        <Avatar sx={{width: "130px", height: "130px"}} src={url ? url : userImg} alt='avatar'/>
                        <Box>
                            <Typography mb={3}>Let's face it, we're all good lookin' people 😎 so upload your best profile photo. </Typography>
                            <input type="file" onChange={changeImageHandler} style={{display: "none"}} ref={fileInput}/>
                            <Button startIcon={<CloudUploadIcon/>} onClick={handleUploadClick}>Upload</Button>
                        </Box>
                    </Box>


                    <Box>
                        <Typography mt={3} mb={3} variant='h6'>Default Avatars : </Typography>
                        <Box mb={3} sx={{display: "flex", gap: 3, justifyContent: "space-around" }}>
                            <Avatar onClick={getValue} sx={{width: "80px", height: "80px"}} src={Avatar1}/>
                            <Avatar sx={{width: "80px", height: "80px"}}/>
                            <Avatar sx={{width: "80px", height: "80px"}}/>
                            <Avatar sx={{width: "80px", height: "80px"}}/>
                        </Box>
                    </Box>

                    <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                        <Button sx={{width : "100%"}} autoFocus onClick={saveProfileAvatarFirebase}>Save</Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>


        </Box>
    )
}