import React, {useState} from 'react';
import {Box, Button, Checkbox, Container, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionsProfile, deleteUserAccountThunk, updateUserDetailsFirebaseThunk} from "../../redux/ProfileReducer";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import styles from "../../css/profile/profile.module.css"


/**
 * Quick Description: Profile Component
 * Displays the current user details including ID, name, and email.
 * Provides functionality to change the user's name and email.
 * Offers an option to delete the user account, with confirmation required.
 * Saves the updated profile information to the database.
 */

const Profile = () => {
    const dispatch: AppDispatch = useDispatch()
    const {notification, user} = useSelector((state: RootState) => state.userProfile)
    //Check box state to confirm the account delete (confirm delete acc.)
    const [checked, setChecked] = useState<boolean>(false)
    //State to track if the delete button was clicked to show the checkbox (confirm delete acc.)
    const [deleteButtonClicked, setDeleteButtonClicked] = useState<boolean>(false);
    const handleAccountDeleteConformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }
    //Delete user account handles
    const deleteUserAccount = () => {
        setDeleteButtonClicked(true)
        dispatch(deleteUserAccountThunk(checked))
    }
    return (
        <Container className={styles.profileContainer}>
            <Paper className={styles.paperProfile}>

                {/*UPLOAD USER AVATAR*/}
                <ProfileAvatarUpload user={user}/>
                <Box className={styles.profileBoxContent}>

                    <Box className={styles.profileWrapper}>
                        <Typography mb={5} variant="h5">
                            User Profile
                        </Typography>

                        {
                            user.map((item, index: number) => (
                                <Box key={index} className={styles.profileUserSection}>
                                    <Box sx={{}}>
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
                                                onChange={(event) => dispatch(actionsProfile.setNewNameAC(event.target.value))}
                                                placeholder={"Choose your own nickname"}
                                                defaultValue={item.displayName}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography>Email:</Typography>
                                            <TextField
                                                fullWidth
                                                onChange={(event) => dispatch(actionsProfile.setNewEmailAC(event.target.value))}
                                                placeholder={"Change your email"}
                                                defaultValue={item.email}
                                            />
                                        </Box>
                                    </Box>

                                    <Box>
                                    </Box>


                                    <Button onClick={() => dispatch(updateUserDetailsFirebaseThunk())}>
                                        Save
                                    </Button>

                                    <Button onClick={deleteUserAccount}>
                                        Delete Account
                                    </Button>
                                    <Box className={styles.notification}>
                                        {notification}
                                    </Box>
                                    {deleteButtonClicked &&
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleAccountDeleteConformation}
                                        />
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

            </Paper>
        </Container>
    );
};

export default React.memo(Profile);




