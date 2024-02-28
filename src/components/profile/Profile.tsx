import React, {useState} from 'react';
import {Box, Button, Checkbox, Container, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ProfileAvatarUpload} from "./ProfileAvatarUpload";
import {actionsProfile, deleteUserAccountThunk, updateUserDetailsFirebaseThunk} from "../redux/ProfileReducer";
import { RootState} from "../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";

const Profile = () => {
    const dispatch: ThunkDispatch<RootState, void, any>  = useDispatch()
    const {notification, user} = useSelector((state: RootState) => state.userProfile)
    const [checked, setChecked] = useState<boolean>(false)
    const [deleteButtonClicked, setDeleteButtonClicked] = useState<boolean>(false);
    const handleAccountDeleteConformation = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }
    const deleteUserAccount = async () => {
        setDeleteButtonClicked(true)
        await dispatch(deleteUserAccountThunk(checked))
    }
    return (
        <Box mt={12} sx={{display: "flex"}}>

            <Container>
                <Paper sx={{maxWidth: "600px", width: "100%", position: "relative", margin: "0 auto"}}>
                    <Box>


                        <ProfileAvatarUpload user={user}/>

                        <Box mt={5} p={10}>
                            <Typography mb={5} variant="h5" sx={{textAlign: "center"}}>User Profile</Typography>
                            <Box sx={{display: "flex", gap: 2, flexDirection: "column"}}>

                                {
                                    user.map((item, index: number) => (
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
                                            <Box>
                                            </Box>

                                            <Box sx={{display: "flex", flexDirection: "column", width: "250px", margin: "0 auto"}}>
                                                <Button sx={{marginTop: "20px"}}
                                                        onClick={() =>
                                                            dispatch(updateUserDetailsFirebaseThunk())
                                                        }>Save</Button>
                                                <Button sx={{marginTop: "20px"}} onClick={deleteUserAccount}>Delete Account</Button>

                                                <Box mt={4} sx={{color: "green"}}>
                                                    {notification}
                                                </Box>
                                                {deleteButtonClicked &&
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={handleAccountDeleteConformation}
                                                    />
                                                }
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



