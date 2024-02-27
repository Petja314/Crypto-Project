// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import {auth, storage} from "../../config/firebase";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import {deleteUser, verifyBeforeUpdateEmail, signOut, updateProfile, User} from "firebase/auth";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {ThunkAction} from "redux-thunk";

export type UserAuthArrayDetailsType = {
    displayName: string,
    email: string,
    emailVerified: string,
    photoURL: string | null,
    uid: string
}
export type ProfileStateTypes = {
    user: UserAuthArrayDetailsType[],
    urlDisplayImage: null | string,
    openAvatarPopUpWindow: boolean,
    newName: string,
    newEmail: string,
    notification: string
}


const initialState: ProfileStateTypes = {
    user: [],
    urlDisplayImage: null,
    openAvatarPopUpWindow: false,
    newName: "",
    newEmail: "",
    notification: ""
}
export const ProfileReducer = (state = initialState, action: ActionsProfileTypes) => {
    switch (action.type) {
        case "SET_USER" : //setting the current auth user
            return {
                ...state,
                user: [...action.user],
            }
        case "SET_USER_IMG_TO_FB" : //setting current avatar photo to the auth user array
            return {
                ...state,
                user: state.user.map((item: UserAuthArrayDetailsType, index: number) => {
                    if (index === 0) {
                        return {
                            ...item,
                            photoURL: action.photoURL
                        }
                    }
                    return item
                })
            }
        case "SET_DISPLAY_IMAGE" : //setting the temp. display img to show the preview. img
            return {
                ...state,
                urlDisplayImage: action.urlDisplayImage
            }
        case "SET_NEW_USERNAME" :
            return {
                ...state,
                newName: action.newName
            }
        case "SET_NEW_EMAIL" :
            return {
                ...state,
                newEmail: action.newEmail
            }
        case "SET_NOTIFICATION" :
            return {
                ...state,
                notification: action.notification
            }
        case "SET_OPEN_AVATAR_POPUP_WINDOW" : // managing the dialogs popup window
            return {
                ...state,
                openAvatarPopUpWindow: action.isWindowOpen
            }
        default :
            return state
    }
};

export type ActionsProfileTypes = InferActionsTypes<typeof actionsProfile>
export type ActionsAuthType = ReturnType<typeof actionsProfile[keyof typeof actionsProfile]>;
export const actionsProfile = {
    setUserDataAC: (user: UserAuthArrayDetailsType[]) => ({
        type: "SET_USER",
        user,
    } as const),
    setUserImgToFbAC: (photoURL: string | null) => ({ //ACTION TO SAVE THE IMAGE IN FIREBASE STORAGE
        type: "SET_USER_IMG_TO_FB",
        photoURL
    } as const),
    setDisplayImageShowAC: (urlDisplayImage: null | string) => ({ //ACTION TO SEE THE TEMP. IMAGE FOR A PREVIEW IN DIALOG POPUP
        type: "SET_DISPLAY_IMAGE",
        urlDisplayImage
    } as const),
    openAvatarPopUpWindowAC: (isWindowOpen: boolean) => ({
        type: "SET_OPEN_AVATAR_POPUP_WINDOW",
        isWindowOpen
    } as const),
    setNewEmailAC: (newEmail: string) => ({
        type: "SET_NEW_EMAIL",
        newEmail
    } as const),
    setNewNameAC: (newName: string) => ({
        type: "SET_NEW_USERNAME",
        newName
    } as const),
    setNotificationAC: (notification: string) => ({
        type: "SET_NOTIFICATION",
        notification
    } as const),
}

// type ThunkType = ThunkAction<Promise<void>, ProfileStateTypes, unknown, any >
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsProfileTypes | any>;

export const profileThunkCreator = (displayName: string, email: string, emailVerified: string, photoURL: string, uid: string): ThunkType => async (dispatch) => {
    const user = {displayName, email, emailVerified, photoURL, uid};
     dispatch(actionsProfile.setUserDataAC([user])); // Setting the current user auth data in array
}

export const handleSubmitThunk = (newImageFile: null | File, setNewImageFile: any): ThunkType => async (dispatch, getState) => {
    const {user} = getState().userProfile
    if (newImageFile) {  // Check if newImageFile is not null
        const userId = user[0].uid;
        // Creating a unique folder with user id on backend Firebase + image with a unique uuid
        const imageRef = storageRef(storage, `user_avatar_${userId}/image_${uuidv4()}`);

        try {
            await uploadBytes(imageRef, newImageFile); // Uploading the image to the server
            let urlDisplayImage: string = await getDownloadURL(imageRef); // Able to download the image after it was uploaded to the server
            dispatch(actionsProfile.setDisplayImageShowAC(urlDisplayImage)); // Dispatching the image to the temporary state urlDisplayImage to see the image preview.
        } catch (error) {
            console.error(error);
        } finally {
            setNewImageFile(null);
        }
    }
}

export const saveProfileAvatarFirebaseThunk = (photoURL: string | null): ThunkType => async (dispatch) => {
    console.log('photoURL', photoURL)
    const user: User | null = auth.currentUser
    try {
        if (user !== null) {
            await updateProfile(user, {
                photoURL: photoURL //saving avatar photo to the server
            })
        }
        dispatch(actionsProfile.setUserImgToFbAC(photoURL))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(actionsProfile.openAvatarPopUpWindowAC(false)) //closing the avatar dialogs window Mui
    }
}


export const deleteUserAccountThunk = (checked: boolean): ThunkType => async (dispatch) => {
    const user: User | null = auth.currentUser
    dispatch(actionsProfile.setNotificationAC('After an account has been deleted, it cannot be recovered. Are you sure you want to proceed with the deletion?'))
    if (checked === true && user !== null) {
        try {
            await deleteUser(user)
            alert("Your account was successfully deleted!")
        } catch (error: any) {
            const errorCode = error.code
            dispatch(actionsProfile.setNotificationAC(errorCode))
        }
        return
    }
}

export const updateUserDetailsFirebaseThunk = (): ThunkType => async (dispatch) => {
    const user: User | null = auth.currentUser
    try {
        if (user !== null) {
            await dispatch(updateUserNameFirebase(user))
            await dispatch(updateEmailFirebase(user))
        }
    } catch (error: any) {
        const errorCode = error.code
        dispatch(actionsProfile.setNotificationAC(errorCode))
        console.error(error)
    }
}


export const updateEmailFirebase = (user: User | null): ThunkType => async (dispatch, getState) => {
    const {newEmail} = getState().userProfile
    try {
        if (newEmail.length > 0 && user !== null) {
            console.log('in email')
            await verifyBeforeUpdateEmail(user, newEmail);
            alert('The email was successfully updated , please verify your email to sign in!')
            await signOut(auth)
        }
        return;
    } catch (error: any) {
        console.log('err', error.message)

        const errorCode = error.code
        dispatch(actionsProfile.setNotificationAC(errorCode))
        console.error(error)
    }
}


export const updateUserNameFirebase = (user: User | null): ThunkType => async (dispatch, getState) => {
    const {newName} = getState().userProfile
    try {
        if (newName.length > 0 && user !== null) {
            await updateProfile(user, {
                displayName: newName,
            })
            dispatch(actionsProfile.setNotificationAC('The name was successfully updated!'))

        }
        return;
    } catch (error: any) {
        const errorCode = error.code
        dispatch(actionsProfile.setNotificationAC(errorCode))
        console.error(error)
    }
}

