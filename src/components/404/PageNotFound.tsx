import React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import styles from "../../css/404/page-not-found.module.css"

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <Container>

            <Box className={styles.notFoundWrapper}>
                <Typography className={styles.notFoundTitle}>Oops!</Typography>
                <Typography className={styles.pageNotExistTitle}>4<span style={{color: "#B8B8B8"}}>0</span>4</Typography>

                <Box className={styles.notFoundDescription}>
                    The page you are looking for might have been removed had its name changed or is temporarily unavailable.
                </Box>

                <Button className={styles.notFoundBtn} onClick={() => navigate("/dashboard")}>
                    GO TO HOMEPAGE
                </Button>

            </Box>
        </Container>
    );
};

export default PageNotFound;