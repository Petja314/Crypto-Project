import React, {useState} from 'react';
import {Box, Grid, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import walleticon from "../../assets/images/image/wallet.webp"
import BackgroundBlock from "../../assets/images/image/block_bg.svg"


const BtcPriceWidget = () => {
    const [currencyValue, setCurrencyValue] = useState<any>(['USD'])
    const currency = ["USD", "GBP", "EURO", "CAD", "AUD"]
    const currencyHandleChange = (event: any) => {
        const selectedValue = event.target?.value
        setCurrencyValue(selectedValue.split(" "))
    }

    // console.log('currencyValue',currencyValue)
    return (
        <Box>

            <Paper sx={{
                borderRadius: '20px',
                marginBottom: "10px",
                backgroundImage: `url(${BackgroundBlock})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: "rgba(255, 255, 255, 0.09)"
            }}>
                <Grid container
                      sx={{position : "relative"}}
                >
                    <Grid item >
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "12px"}}>BTC/USD</Box>
                        <Typography variant='h5'>
                            5320.00
                            <Select
                                sx={{
                                    marginLeft: "10px",
                                    color: "#B8B8B8",
                                    fontSize: "12px",
                                }}
                                onChange={currencyHandleChange}
                                label='currency'
                                value={currencyValue}
                            >
                                {currency.map(item => (
                                    <MenuItem sx={{color: "#B8B8B8", fontSize: "12px"}} value={item}>{item}</MenuItem>
                                ))}

                            </Select>
                        </Typography>
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "12px"}}>1 BTC</Box>


                    </Grid>


                    <Box component='span' sx={{
                        position: "absolute",
                        bottom: -20,
                        right: 0,
                        maxWidth: "140px",
                        width: "100%",
                        height: "auto",
                    }}>
                        <img src={walleticon} alt="WebP Image" style={{ width: "100%", height: "auto" }} />
                    </Box>

                </Grid>

            </Paper>

        </Box>
    );
};

export default BtcPriceWidget;