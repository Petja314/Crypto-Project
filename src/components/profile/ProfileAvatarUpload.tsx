// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import noAvatar from "../../assets/images/image/blankAvatar.jpg"
import {storage} from "../../config/firebase";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {auth} from "../../config/firebase";
import {getAuth, deleteUser, updateProfile} from "firebase/auth";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import Avatar1 from "../../assets/images/profile_avatars/avatar-1.png"
import Avatar2 from "../../assets/images/profile_avatars/avatar-2.png"
import Avatar3 from "../../assets/images/profile_avatars/avatar-3.png"
import Avatar4 from "../../assets/images/profile_avatars/avatar-4.png"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch} from "react-redux";
import {actionsProfile} from "../redux/ProfileReducer";

const default_avatars = [Avatar1, Avatar2, Avatar3, Avatar4]
export const ProfileAvatarUpload = ({userProfile}: any) => {
    const dispatch : any = useDispatch()
    const [openAvatarEdit, setOpenAvatarEdit] = useState(false)
    //UPLOAD IMG
    const [newImage, setNewImage] = useState<any>(null)
    const userImg = userProfile[0].photoURL
    const [urlDisplayImage, setUrlDisplayImage] = useState<any>(null)

    const fileInput = useRef<any>(null)
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
            setNewImage(selectedFile)
        }
    }
    const handleSubmit = () => {
        const imageRef = storageRef(storage, `user_avatar/image_${uuidv4()}`)
        uploadBytes(imageRef, newImage).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrlDisplayImage(url)
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
                    photoURL: urlDisplayImage
                })
                const response = await getAuth().currentUser;
                console.log('response' , response)
                dispatch(actionsProfile.setNewImgAC(urlDisplayImage))
            } catch (error) {
                console.error(error)
            } finally {
                setOpenAvatarEdit(false)
            }
        }



    const getValue = async (event: any) => {
        // compiling the src file to the blob , that we can send it to the server
        const selectedSrc = event.target.src
        let selectedFile;
        if (selectedSrc) {
            const response = await fetch(selectedSrc)
            const blob = await response.blob()
            selectedFile = new File([blob], 'default_avatar.png', {type: 'image/png'})
            setNewImage(selectedFile) // Set the selected default avatar as a file - event.target?.files[0]
            setUrlDisplayImage(selectedSrc) // Set the URL to the selected default avatar
        } else {
            setUrlDisplayImage(null)
            setNewImage(selectedSrc)
        }
    }

    // console.log('newImage :' ,newImage)
    // console.log('url :' ,url)
    // console.log('openAvatarEdit :', openAvatarEdit)
    return (
        <Box>
            <Box onClick={() => setOpenAvatarEdit(true)} sx={{position: "absolute", top: "-35px", left: "40%", cursor: "pointer"}}>
                <Box>

                    <Avatar sx={{width: "130px", height: "130px", border: "1px solid #fff"}} src={userImg ? userImg : noAvatar} alt='avatar'/>
                    <IconButton sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,}} >
                        <AddAPhotoIcon/>
                    </IconButton>
                </Box>
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
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>

                    <Box sx={{display: "flex", justifyContent: "center", gap: 3}}>
                        <Avatar sx={{width: "130px", height: "130px",  border: "1px solid #fff"}} src={userImg ? urlDisplayImage : noAvatar} alt='avatar'/>
                        <Box>
                            <Typography mb={3}>Let's face it, we're all good lookin' people 😎 so upload your best profile photo. </Typography>
                            <input type="file" onChange={changeImageHandler} style={{display: "none"}} ref={fileInput}/>
                            <Button startIcon={<CloudUploadIcon/>} onClick={handleUploadClick}>Upload</Button>
                        </Box>
                    </Box>


                    <Box>
                        <Typography mt={3} mb={3} variant='h6'>Default Avatars : </Typography>
                        <Box mb={3} sx={{display: "flex", gap: 3, justifyContent: "space-around"}}>
                            {
                                default_avatars.map(item => (
                                    <Avatar
                                        onClick={getValue}
                                        sx={{
                                            width: "80px",
                                            height: "80px",
                                            border: "1px solid #fff",
                                            '&:hover': {
                                                backgroundColor: '#171717'
                                            },
                                        }} src={item}/>
                                ))
                            }
                        </Box>
                    </Box>

                    <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                        <Button sx={{width: "100%"}} autoFocus onClick={saveProfileAvatarFirebase}>Save</Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>


        </Box>
    )
}