import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {auth} from "../../config/firebase"
import {sendPasswordResetEmail} from "firebase/auth"
import styles from "../../css/login/forgot-password.module.css"

/**
 * Quick Description: ForgotPasswords Component
 * This component facilitates the process of resetting passwords for registered users.
 * It sends a new password to the email address associated with the user's account.
 * Error handling is implemented to manage cases where the provided email does not match any record in the db.
 * Once the email is successfully sent, it enables the user to proceed with changing the password.
 */

const ForgotPasswords = () => {
    //openResetPw - state which controls the dialogs open/close status
    const [openResetPw, setOpenResetPw] = useState(false)
    // resetEmailValue - Stores the email to retrieve new credentials for resetting the password.
    const [resetEmailValue, setResetEmailValue] = useState('')
    //Handling the error during the password restore process
    const [resetConformationText, setResetConformationText] = useState('')

    //Sending the new password to the existing email
    const restorePasswordHandler = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmailValue)
            setResetConformationText('Password reset successfully,check your email')
            // alert("check your email")
        } catch (error: any) {
            const errorCode = error.code
            if (errorCode) {
                //Handling the error if the - email is not found in db
                setResetConformationText('Incorrect Email')
            }
        }
    }

    return (
        <Box>
            <Button className={styles.forgotPwBtn} onClick={() => setOpenResetPw(true)}>
                Forgot password
            </Button>

            <Dialog className={styles.dialogContainer} open={openResetPw} onClose={() => setOpenResetPw(false)}>
                <DialogTitle>Restore password</DialogTitle>
                <IconButton className={styles.closeIcon} aria-label="close" onClick={() => setOpenResetPw(false)}>
                    <CloseIcon/>
                </IconButton>

                <DialogContent>
                    <TextField label='Email' type='text'
                               onChange={(event) => {
                                   setResetEmailValue(event.target.value)
                               }}
                    />
                    <Typography sx={{color: resetConformationText.length === 18 ? "red" : "green", marginTop: "10px"}}>
                        {resetConformationText}
                    </Typography>
                </DialogContent>

                <DialogActions className={styles.dialogsActions}>
                    <Button autoFocus onClick={restorePasswordHandler}>Reset</Button>
                </DialogActions>

            </Dialog>
        </Box>
    );
};

export default ForgotPasswords;