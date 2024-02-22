import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {commonButtonStyles} from "./LoginContainer";
import {auth, db} from "../../config/firebase"
import {sendPasswordResetEmail} from "firebase/auth"

const ForgotPasswords = () => {
    const [openResetPw, setOpenResetPw] = useState(false)
    const [resetEmailValue, setResetEmailValue] = useState('')
    const [resetConformationText, setResetConformationText] = useState('')
    const restorePasswordHandler = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmailValue)
            setResetConformationText('Password reset successfully,check your email')
            // alert("check your email")
        } catch (error : any) {
            const errorCode = error.code
            if ( errorCode ) {
                setResetConformationText('Incorrect Password')
            }
        }
    }

    return (
        <Box>

            <Button
                onClick={() => setOpenResetPw(true)}
                sx={{...commonButtonStyles, maxWidth: "300px", width: "100%", marginTop : "5px"}}
            >
                Forgot password
            </Button>

            <Dialog
                sx={{textAlign: "center"}}
                open={openResetPw}
                onClose={() => setOpenResetPw(false)}
            >
                <DialogTitle>Restore password</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenResetPw(false)}
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

                    <TextField
                        label='Email'
                        type='text'
                        onChange={(event) => {
                            setResetEmailValue(event.target.value)
                        }}
                    />
                    <Typography sx={{ color : resetConformationText.length === 18 ?  "red" : "green" , marginTop : "10px"}}>{resetConformationText}</Typography>
                </DialogContent>

                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                    <Button autoFocus onClick={restorePasswordHandler}>Reset</Button>
                </DialogActions>

            </Dialog>
        </Box>
    );
};

export default ForgotPasswords;