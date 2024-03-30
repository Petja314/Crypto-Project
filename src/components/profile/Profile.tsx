import React, {useState} from 'react';
import {Box, Button, Checkbox, Container, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionsProfile, deleteUserAccountThunk, updateUserDetailsFirebaseThunk} from "../../redux/ProfileReducer";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import ProfileAvatarUpload from "./ProfileAvatarUpload";


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
            <Container sx={{marginTop : "100px", marginBottom : "70px"}}>
                <Paper sx={{maxWidth: "600px", width: "100%", position: "relative", margin: "0 auto" }}>

                        {/*UPLOAD USER AVATAR*/}
                        <ProfileAvatarUpload user={user}/>
                        {/*//p={10}*/}
                        <Box  sx={{
                            padding : {xs : "10px" , xl : "50px"},
                            display : "flex",
                            justifyContent : "center"
                        }} >

                            <Box sx={{display: "flex", gap: 2, flexDirection: "column" , marginTop : "80px"}}>
                                <Typography mb={5} variant="h5" sx={{textAlign: "center"}}>User Profile</Typography>

                                {
                                    user.map((item, index: number) => (
                                        <Box key={index} sx={{maxWidth: "400px", width: "100%", }}>


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


                                                <Button sx={{marginTop: "20px", width : "100%"}} onClick={() => dispatch(updateUserDetailsFirebaseThunk())}>Save</Button>
                                                <Button sx={{marginTop: "20px", width : "100%"}} onClick={deleteUserAccount}>Delete Account</Button>
                                                <Box mt={4} sx={{color: "green"}}> {notification} </Box>
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




