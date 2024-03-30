import React from 'react';
import preloader from "../../assets/images/preloader-img/loader.svg"
import {Box, Container, Fade} from "@mui/material";
import "./preloader.css"
import styles from "./loader.module.css"


type PreloaderPropsType = {
    isFetching : boolean
}
const Preloader = (props : PreloaderPropsType) => {
    return (
        <Container>
            <Box className={"container"} >
                { props.isFetching ?    <img  className={"animation"}  src={preloader} alt="preloader"/> : null  }
            </Box>
        </Container>
    );
};

export default Preloader;
