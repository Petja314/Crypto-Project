import React, {useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import noAvatar from "../../assets/images/image/blankAvatar.jpg"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar1 from "../../assets/images/profile_avatars/avatar-1.png"
import Avatar2 from "../../assets/images/profile_avatars/avatar-2.png"
import Avatar3 from "../../assets/images/profile_avatars/avatar-3.png"
import Avatar4 from "../../assets/images/profile_avatars/avatar-4.png"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch, useSelector} from "react-redux";
import {actionsProfile, handleSubmitThunk, saveProfileAvatarFirebaseThunk, UserAuthArrayDetailsType} from "../../redux/ProfileReducer";
import {RootState} from "../../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";
import styles from "../../css/profile/profile.module.css"

const default_avatars: string[] = [Avatar1, Avatar2, Avatar3, Avatar4]
type ProfileAvatarUploadPropsType = {
    user: UserAuthArrayDetailsType[]
}


/**
 * Quick Description: ProfileAvatarUpload Component
 * Manages the process of uploading a new avatar image and converting it into a Blob - a data type used to store binary data.
 * Provides the user with the option to select from default avatars if they choose.
 * Submits the blob image to the database to update the user's avatar.
 */

const ProfileAvatarUpload = ({user}: ProfileAvatarUploadPropsType) => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const {urlDisplayImage, openAvatarPopUpWindow} = useSelector((state: RootState) => state.userProfile)
    //UPLOAD IMG
    const [newImageFile, setNewImageFile] = useState<null | File>(null)
    const userImg: string | null = user[0]?.photoURL
    //Store the selected image
    const fileInput: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (newImageFile) {
            dispatch(handleSubmitThunk(newImageFile, setNewImageFile))
        }
    }, [newImageFile])
    const handleUploadClick = () => {
        fileInput?.current?.click()
    }
    const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Getting the img file
        if (event.target && event.target.files) { // checking for typescript
            const selectedFile = event.target?.files[0]
            if (selectedFile) {
                setNewImageFile(selectedFile)
            }
        }

    }

    const getValue = async (event: React.MouseEvent<HTMLImageElement>) => {
        // compiling the src file to the blob , that we can send it to the server - event.target.src - cannot be send to the server
        const selectedSrc = (event.target as HTMLImageElement).src; //event.target.src
        let selectedFile;
        if (selectedSrc) {
            const response = await fetch(selectedSrc)
            const blob = await response.blob()
            selectedFile = new File([blob], 'default_avatar.png', {type: 'image/png'})
            setNewImageFile(selectedFile)
            dispatch(actionsProfile.setDisplayImageShowAC(selectedSrc))
        } else {
            dispatch(actionsProfile.setDisplayImageShowAC(null))
            // setNewImageFile(selectedSrc)
        }
    }

    // console.log('urlDisplayImage' , urlDisplayImage)
    return (
        <Box>
            <Box
                onClick={() => dispatch(actionsProfile.openAvatarPopUpWindowAC(true))}
                className={styles.profileAvatarBoxContent}
            >
                <Box>
                    {/*Showing the current user avatar , if not existed - noAvatar */}
                    <Avatar
                        className={styles.userAvatar}
                        src={userImg ? userImg : noAvatar} alt='avatar'/>{/*userImg - img from the firebase server */}
                    <IconButton className={styles.addPhotoIcon}>
                        <AddAPhotoIcon/>
                    </IconButton>
                </Box>
            </Box>


            <Dialog open={openAvatarPopUpWindow}>
                <DialogTitle variant='h6'>Add Custom Avatar</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(actionsProfile.openAvatarPopUpWindowAC(false))}
                    className={styles.closeIconBtn}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>

                    <Box className={styles.userAvatarSelectBox}>
                        <Avatar
                            className={styles.userAvatar}
                            src={urlDisplayImage || undefined}
                            alt='avatar'
                        /> {/*urlDisplayImage -  Preview src img */}
                        <Box>
                            <Typography mb={3}>Let's face it, we're all good looking people 😎 so upload your best profile photo. </Typography>
                            <input
                                type="file"
                                onChange={changeImageHandler}
                                className={styles.uploadInputField}
                                ref={fileInput}
                            />
                            <Button startIcon={<CloudUploadIcon/>} onClick={handleUploadClick}>Upload</Button>
                        </Box>
                    </Box>

                    <Box>
                        <Typography mt={3} mb={3} variant='h6'>Default Avatars : </Typography>
                        <Box mb={3} className={styles.defaultAvatarSection}>
                            {/*Default avatars to choose option */}
                            {
                                default_avatars.map((item: string, index: number) => (
                                    <Avatar
                                        key={index}
                                        onClick={getValue}
                                        className={styles.defaultAvatars}
                                        src={item}
                                    />
                                ))
                            }
                        </Box>
                    </Box>

                    <DialogActions className={styles.dialogsAvatarAction}>
                        <Button autoFocus onClick={() => dispatch(saveProfileAvatarFirebaseThunk(urlDisplayImage))}>Save</Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>


        </Box>
    )
}

export default React.memo(ProfileAvatarUpload);

