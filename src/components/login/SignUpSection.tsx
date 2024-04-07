import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, signInThunkCreator} from "../../redux/AuthReducer";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import styles from "../../css/login/sign-up.module.css"
import {commonButtonStyles} from "../../mui/MuiTheme";


/**
 * Quick Description: SignUpSection Component
 * Creating a new username, email, and password and handling the login process.
 * Checking for password matching and handling errors.
 * Sending the data to the reducer for future API calls.
 */

type SignUpSectionPropsType = {
    setIsRegistered: (isRegistered : boolean) => void
}

const SignUpSection = ({ setIsRegistered}: SignUpSectionPropsType) => {
    const dispatch : AppDispatch = useDispatch()
    //Conformation password handler
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    //Setting the new username
    const [userName, setUserName] = useState<string>('')
    const {signInError, password} = useSelector((state : RootState) => state.auth)

    const signIn = async () => {
        //Checking if username was empty during the registration process
        if ( userName === "") {
            //Exit the reg. process if username was empty
            dispatch(actionsAuth.setSignInErrorAC('Create User name'))
            return
        }
        else if (password !== confirmPassword) {
            //Exit the reg. process if password was not matched
            dispatch(actionsAuth.setSignInErrorAC('Password are not matching'))
            return
        }
        //Sending the new username
        dispatch(signInThunkCreator(userName))
    }

    return (
        <Box className={styles.signUpWrapper}>

            <Typography variant='h5' className={styles.createAccTitle}>
                Create Personal Account
            </Typography>

            <Box className={styles.signUpBoxContent}>
                <TextField label='User name' type='text'
                    onChange={(event) => {setUserName(event.target.value)}}
                />
                <TextField label='Email'  type='text'
                    onChange={(event) => {dispatch(actionsAuth.setEmailAC(event.target.value))}}
                />
                <TextField  label='Password'  type='password'
                    onChange={(event) => {dispatch(actionsAuth.setPasswordAC(event.target.value))}}
                />
                <TextField label='Confirm Password'  type='password'
                    onChange={(event) => {setConfirmPassword(event.target.value)}}
                />
                <Box className={styles.error}>
                    {signInError}
                </Box>

                <Button className={styles.createPersonalAcc} onClick={signIn}>
                    Create Personal Account
                </Button>

                <Typography className={styles.exitDialogTitle}>
                    Not looking for an account?
                </Typography>

                <Button
                    onClick={() => setIsRegistered(true)}
                    sx={{...commonButtonStyles}}>Sign In
                </Button>

            </Box>


        </Box>
    )
}


export default React.memo(SignUpSection);


