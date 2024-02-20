import React from 'react';
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import walleticon from "../../assets/images/image/wallet.webp";

const QuickActions = () => {
    return (
        <Box>

            <Paper>
                <Grid container>
                    <Typography variant='h6' sx={{color : "#fff"}}>Quick Actions</Typography>

                    <Box>
                        {/*<img src={walleticon} alt="WebP Image" style={{ width: "100%", height: "auto" }} />*/}
                    </Box>

                    <Grid item>
                        <Button>Deposit</Button>
                    </Grid>
                </Grid>
            </Paper>


        </Box>
    );
};

export default QuickActions;