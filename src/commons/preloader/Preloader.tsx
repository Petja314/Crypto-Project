import React from 'react';
import preloader from "../../assets/images/preloader-img/loader.svg"
import {Box, Container, Fade} from "@mui/material";
import "./preloader.css"
import styles from "./loader.module.css"
// const Preloader = () => {
//     return (
//         <Container>
//                 <Box className={"container"} >
//                     <img  className={"animation"}  src={preloader} alt="preloader"/>
//                 </Box>
//         </Container>
//     );
// };
//
// export default Preloader;
//

const Preloader = (props : any) => {
    return (
        <Container>
            <Box className={"container"} >
                { props.isFetching ?    <img  className={"animation"}  src={preloader} alt="preloader"/> : null  }
            </Box>
        </Container>
    );
};

export default Preloader;




export const Loader = ({visible , isFetching} : any) => {
    console.log('visible' , visible)
    console.log('in')
    return (
        <div className="app">

                { isFetching &&
                    <Fade in={visible} timeout={400}>
                        <div className={styles.container}>
                            <img className={styles.animation} src={preloader} alt="loader" />
                        </div>
                    </Fade>
                }

        </div>
    );
}