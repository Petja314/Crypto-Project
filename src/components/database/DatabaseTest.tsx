import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import {collection, getDocs, getDoc, addDoc,setDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {auth, db, googleProvider, storage} from "../../config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {ref,uploadBytes} from "firebase/storage"

const DatabaseTest = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        }
    }
    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }
    const logOutHandler = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }


    console.log('id', auth?.currentUser?.uid)
    console.log('currentUser', auth?.currentUser?.email)
    // console.log('auth', auth?.currentUser?.photoURL)
    return (
        <Box>
            <Container>
                <MovieDbComponent/>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "30px",
                        gap: 2,
                        width: "300px",
                        margin: "0 auto",

                    }}
                >
                    <TextField
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        label='Email'
                        type='text'
                    />
                    <TextField
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        label='Password'
                        type='password'
                    />
                    <Box>
                        My current email : {auth?.currentUser?.email}
                    </Box>
                    <Button onClick={logIn}>Login</Button>
                    <Button onClick={logOutHandler}>Log out</Button>
                    <Box sx={{display: "flex", gap: 2, flexDirection: "column"}}>
                        <Typography variant='h6'>Create an account</Typography>
                        <Button onClick={signIn}>Sign in</Button>
                        <Button onClick={signInWithGoogle}>Sign In With Google </Button>
                    </Box>
                </Box>


            </Container>

        </Box>
    );
};


const MovieDbComponent = () => {
    const [movieList, setMovieList] = useState<any>([])
    const [addMovieTitle, setAddMovieTitle] = useState<any>("")
    const [addMovieDate, setAddMovieDate] = useState<any>(0)
    const [isOscar, setIsOscar] = useState<boolean>(false)
    // UPDATE TITLE
    const [updateTitle , setUpdateTitle] = useState('')
    //FILE UPLOAD
    const [fileUpload, setFileUpload] = useState<any>(null)

    // pass the function db and collection name "movies"
    const moviesCollectionRef = collection(db, "movies" )
    const getMovieList = async () => {
        try {
            // Ensure user is authenticated before accessing Firestore
            if (!auth.currentUser ||  !auth?.currentUser?.uid) {
                console.error("User not authenticated.");
                return;
            }
            // Read data from Firestore

            // Version 1
            const userId =  auth?.currentUser?.uid
            const movieDocRef = doc(db, 'movies' ,userId )
            const docSnapshot  = await getDoc(movieDocRef);
            // console.log('data' , data._document.data.value.mapValue.field)
            // console.log('data' , docSnapshot )
            if(docSnapshot) {
                const data =[docSnapshot.data()];
                // console.log('filterData' , data)
                setMovieList(data);
            }
            else {
                console.log('Doc. does not exists')
            }



            // const data = await getDocs(moviesCollectionRef);
            // console.log('data' , data.docs)
            // const filterData = data.docs.map((item : any) => ({...item.data(), id: item.id}));
            // console.log('filterData', filterData);
            // setMovieList(filterData);
        }
        catch (error) {
            console.error("Error fetching movie list:", error);
        }
    }

    useEffect(() => {
        getMovieList()

    }, [])

    const onSubmitMovie = async () => {
        try {
            // Ensure auth.currentUser is not null before accessing its properties
            if (auth.currentUser) {
                const customDocName = auth.currentUser.uid;
                const movieDocRef=doc(moviesCollectionRef,customDocName)
                await setDoc(movieDocRef, {
                    title: addMovieTitle,
                    releaseDate: addMovieDate,
                    receivedOscar: isOscar,
                    userId: auth.currentUser.uid,
                    userEmail: auth.currentUser.email
                });

                getMovieList();
            } else {
                // Handle the case where auth.currentUser is null
                console.error("User is not authenticated.");
            }
        } catch (error) {
            console.error(error);
        }
    };


    // const onSubmitMovie = async () => {
    //     try {
    //         // Ensure auth.currentUser is not null before accessing its properties
    //         if (auth.currentUser) {
    //             await addDoc(moviesCollectionRef, {
    //                 title: addMovieTitle,
    //                 releaseDate: addMovieDate,
    //                 receivedOscar: isOscar,
    //                 userId: auth.currentUser.uid,
    //                 userEmail: auth.currentUser.email
    //             });
    //
    //             getMovieList();
    //         } else {
    //             // Handle the case where auth.currentUser is null
    //             console.error("User is not authenticated.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const deleteMovie = async (id: any) => {
        const movieDoc = doc(db, "movies",id)
        await deleteDoc(movieDoc)
        getMovieList()
    }


    const updateMovieTitle = async (id : any) => {
        // debugger
        console.log('id' , id)
        const movieDoc = doc(db, "movies",id)
        console.log('updateMovieTitle ID : ', updateMovieTitle)
        try {
            await updateDoc(movieDoc, {title : updateTitle} )
            getMovieList()
        }
        catch(error) {
            console.error(error)
        }
    }

    const fileUploadHandler = async () => {
        if (!fileUpload) return
        const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`)
        try{
            await uploadBytes(filesFolderRef,fileUpload)
        }
        catch (error) {
            console.error(error)
        }
    }
    // console.log('auth' , auth?.currentUser)
    // console.log('isOscar', isOscar)
    // console.log('isOscar', updateTitle)
    // console.log('movieList', movieList)
    return (
        <Box>
            <Typography>Create a movie</Typography>
            <TextField
                label='Movie title...'
                onChange={(event) => {
                    setAddMovieTitle(event.currentTarget.value)
                }}
            />
            <TextField
                label='Movie Date...'
                type='number'
                onChange={(event) => {
                    setAddMovieDate(Number(event.currentTarget.value))
                }}
            />
            <FormControlLabel
                label="Received an Oscar"
                control={
                    <Checkbox
                        onChange={(event) => {
                            setIsOscar(event.target.checked)
                        }}
                    />
                }
            />
            <Button onClick={onSubmitMovie}>Submit Movie</Button>

            <Box sx={{marginTop: "20px", marginBottom: "20px"}}>
                {
                    movieList.map((item: any) => (
                        <Box key={item.userId} sx={{border: "1px solid red"}}>
                            {/*<Box>Id : {item.id} </Box>*/}
                            <Box sx={{color: item.receivedOscar ? "green" : "red"}}>Title : {item.title}</Box>
                            <Box>Oscar :{item.releaseDate} </Box>
                            {/*<Box>Oscar : {item.receivedOscar}</Box>*/}
                            <Button onClick={()  => deleteMovie(item.userId)}>Delete Movie</Button>
                            <TextField  onChange={(event : any) => setUpdateTitle(event.currentTarget.value)} label='input title...'/>
                            <Button onClick={() => updateMovieTitle(item.userId)} >Update title</Button>
                        </Box>
                    ))
                }

                <Box sx={{
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    maxWidth : "300px",
                    border : "1px solid green",
                    margin : "30px 0px 30px 0px",
                    paddingTop : "50px"
                }} >
                    <Box>
                        <input
                            onChange={(event) => { // @ts-ignore
                                setFileUpload(event.target.files[0]) }}
                            type='file'/>
                    </Box>
                    <Button  sx={{width : "150px" , padding : "10px", marginTop : "30px"}} onClick={fileUploadHandler} >Upload File</Button>
                </Box>

            </Box>

        </Box>
    )
}



const EditMovieList = () => {
    return (
        <Box>

        </Box>
    )
}

export default DatabaseTest;