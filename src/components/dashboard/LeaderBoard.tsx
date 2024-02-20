import React from "react";
import {Box, Grid, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {ReactComponent as LeaderIcon} from "../../assets/images/icons/icon-cup-dark.svg"


const LeaderBoard = () => {

    const data = [
        {id: 1, name: 'Cryptodeter', increase: 28.3},
        {id: 1, name: 'Codecrypto', increase: 24.6},
        {id: 1, name: 'Merkulove', increase: 64.6},
        {id: 1, name: 'CrTrader', increase: 35.9},
        {id: 1, name: 'Singh', increase: 28.8},
        {id: 1, name: 'Bitcoinbutler', increase: 23.3},
        {id: 1, name: 'Coinunlike', increase: 19.6},
        {id: 1, name: 'Coinfizzle', increase: 14.3},
        {id: 1, name: 'Orchid', increase: 6.35},
        {id: 1, name: 'Coinunlike', increase: 19.6},
        {id: 1, name: 'Coinfizzle', increase: 14.3},
        {id: 1, name: 'Orchid', increase: 6.35},

    ];

    return (
        <Box>


            <Typography variant='h6' sx={{color: "white", marginBottom: "10px"}}>
                <LeaderIcon/>
                Leaderboard
            </Typography>


            {
                data.map(item => (
                    <Paper sx={{borderRadius: '20px', marginBottom: "10px",}}>
                        <Grid container
                              sx={{
                                  alignItems: 'center',
                                  // padding: "5px",

                              }}
                        >
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Skeleton component='span' animation='wave' variant="circular" width={30} height={30} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', backgroundColor: '#e0f64b', color: "black"
                                    }}> {item.id}
                                    </Skeleton>


                                    <Box>{item.name}</Box>
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box> Wallet increase :<Box component='span' sx={{borderRadius: '5px', marginLeft: "5px", padding: "5px", backgroundColor: "#1ABC7B"}}>{item.increase}</Box> </Box>
                            </Grid>

                        </Grid>

                    </Paper>
                ))
            }


        </Box>
    )
}

export default LeaderBoard