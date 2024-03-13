import React from 'react';
import {Box, Button, Grid, IconButton, Paper, Skeleton, Stack, Typography} from "@mui/material";
import btcIcon from "../../assets/images/icons/btc.svg"
import AddTransactionContainer from "../portfolio/portfolio-table/AddTransactionContainer";
import {PortfolioActions} from "../redux/PortfolioReducer";
import {useDispatch} from "react-redux";


const performer = [
    {id: 1, name: "ICP", price: 152, perecentage: 22},
    {id: 2, name: "ZEN", price: 321, perecentage: 50},
]

const Performer = () => {
    const dispatch = useDispatch()
    return (
        <Box>
            <Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🔥 Winner and Looser of 24h</Typography>

            <Box sx={{
                display: "flex",
                gap: 3
            }}>
                {
                    performer.map(item => (
                        <Paper
                            sx={{
                                borderRadius: '20px',
                                width: "200px",
                            }}
                        >
                            <Grid container
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                  }}
                            >
                                <Grid item>
                                    <Box component='span' sx={{color: "#B8B8B8", fontSize: "15px"}}>Best Performer</Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        marginBottom: "10px"
                                    }}>
                                        <img src={btcIcon} alt=""/>
                                        <Box>
                                            <Typography variant='h6'>
                                                {item.name}
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box component='span' sx={{color: "#fff", fontSize: "14px", backgroundColor: "#1ABC7B", padding: "5px",}}>
                                        {`${item.perecentage}%  ${item.price}$`}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                }
            </Box>


            <AddTransactionContainer

            />
            <Button
                onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(true))}
            >
                Add Transaction
            </Button>
        </Box>
    );
};

export default Performer;