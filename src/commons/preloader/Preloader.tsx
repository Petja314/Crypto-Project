import React from 'react';
import preloader from "../../assets/images/preloader-img/loader.svg"
import {Box, Container, Fade} from "@mui/material";
import "./preloader.css"
const Preloader = ({visible} : any) => {
    return (
        <Container>
            {/*in={visible}*/}
            {/*<Fade timeout={400} >*/}
                <Box className={"container"} >
                    <img  className={"animation"}  src={preloader} alt="preloader"/>
                </Box>
            {/*</Fade>*/}

        </Container>
    );
};

export default Preloader;