// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import { updateProfile} from "firebase/auth";
import {auth,  storage} from "../../config/firebase";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";


export type ProfileStateTypes = {
    user: any,
    urlDisplayImage: any,
    openAvatarPopUpWindow: any,
    newName : any,
    newEmail : any,
}


const initialState: ProfileStateTypes = {
    user: [],
    urlDisplayImage: null,
    openAvatarPopUpWindow: false,
    newName : "",
    newEmail : "",
}
export const ProfileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER" : //setting the current auth user
            return {
                ...state,
                user: [...action.user],
            }
        case "SET_USER_IMG_TO_FB" : //setting current avatar photo to the auth user array
            return {
                ...state,
                user: state.user.map((item: any, index: any) => {
                    if (index === 0) {
                        return {
                            ...item,
                            photoURL: action.urlDisplayImage
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
                newName : action.newName
            }
            case "SET_NEW_EMAIL" :
            return {
                ...state,
                newEmail : action.newEmail
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

// export type ActionsAuthType = InferActionsTypes<typeof actionsProfile>
export const actionsProfile = {
    setUserDataAC: (user: any) => ({
        type: "SET_USER",
        user,
    } as const),
    setUserImgToFbAC: (urlDisplayImage: any) => ({
        type: "SET_USER_IMG_TO_FB",
        urlDisplayImage
    } as const),
    setDisplayImageShowAC: (urlDisplayImage: any) => ({
        type: "SET_DISPLAY_IMAGE",
        urlDisplayImage
    } as const),
    openAvatarPopUpWindowAC: (isWindowOpen: boolean) => ({
        type: "SET_OPEN_AVATAR_POPUP_WINDOW",
        isWindowOpen
    } as const),
}

export const profileThunkCreator = (displayName: any, email: any, emailVerified: any, photoURL: any, uid: any) => async (dispatch: any) => {
    const user = {displayName, email, emailVerified, photoURL, uid};
    await dispatch(actionsProfile.setUserDataAC([user])); // Setting the current user auth data in array
}

export const handleSubmitThunk = (newImageFile: any, setNewImageFile: any) => async (dispatch: any, getState: any) => {
    const {user} = getState().userProfile
    const userId = user[0].uid
    // Creating unique folder with user id on backend Firebase + image with unique uuid
    const imageRef = storageRef(storage, `user_avatar_${userId}/image_${uuidv4()}`)
    try {
        await uploadBytes(imageRef, newImageFile) //uploading img to the server
        let urlDisplayImage = await getDownloadURL(imageRef) //able to download the img after it was uploaded to the server
        dispatch(actionsProfile.setDisplayImageShowAC(urlDisplayImage))// dispatch img to state temp. state urlDisplayImage to see the img Preview.
    } catch (error) {
        console.error(error)
    } finally {
        setNewImageFile(null)
    }
}

export const saveProfileAvatarFirebaseThunk = (urlDisplayImage: any) => async (dispatch: any) => {
    const user: any = auth.currentUser
    try {
        await updateProfile(user, {
            photoURL: urlDisplayImage //saving avatar photo to the server
        })
        dispatch(actionsProfile.setUserImgToFbAC(urlDisplayImage))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(actionsProfile.openAvatarPopUpWindowAC(false)) //closing the avatar dialogs window Mui
    }
}




