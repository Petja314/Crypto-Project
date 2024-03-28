import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Grid, IconButton, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import walleticon from "../../assets/images/image/wallet.webp"
import BackgroundBlock from "../../assets/images/image/block_bg.svg"
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentBtcPriceThunk, fetchExchangeApiThunk, portfolioBalanceWidgetActions} from "../../redux/PortfolioBalanceWidgetReducer";
import {fetchPortfolioDataApiFirebase, portfolioFirebaseDataType} from "../../redux/PortfolioReducer";
import {RootState} from "../../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";
import {formatCurrency} from "@coingecko/cryptoformat";

/**
 * PortfolioBalanceWidget Component:
 * Displays the overall balance of the user's investment portfolio.
 * Features:
 *  - Fetches portfolio data from the database to calculate the total portfolio value.
 *  - Allows users to select their preferred currency for displaying the portfolio balance.
 *  - Retrieves and displays the current exchange rate for the selected currency.
 *  - Calculates and displays the equivalent amount of Bitcoin (BTC) based on the portfolio balance.
 */

const PortfolioBalanceWidget = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)
    const {currencyValueBalance, currency, exchangingRate, btcPrice} = useSelector((state: RootState) => state.portfolioBalanceWidget)
    //Getting the total sum of current user portfolio
    const totalPortfolioValue = myCurrentPortfolioDataFB.reduce((accum: number, value: portfolioFirebaseDataType) => accum + value.totalHoldingCoinAmountCash, 0)
    //Calculating the total amount in selected currency $ £ ...
    const portfolioBalanceCurrency: number = totalPortfolioValue * exchangingRate[0]
    //Calculating total amount of BTC in portfolio , based on selected currency
    const btcInPortfolio: number = portfolioBalanceCurrency / btcPrice! // - is no null !
    //Final formatted BTC price with correct decimals
    const btcFormattedPrice: string = btcInPortfolio.toFixed(5)
    const currencyHandleChange = (event: SelectChangeEvent) => {
        //Function that get selected currency USD , GBP , AUD ... and setting it into the redux initial State
        const selectedValue: string = event.target?.value
        const selectedValueArray: string[] = selectedValue.split(" ")
        dispatch(portfolioBalanceWidgetActions.balanceCurrencyValue(selectedValueArray))
    }


    useEffect(() => {
        //Fetching portfolio data from DB  , to get the latest total amount in portfolio $
        dispatch(fetchPortfolioDataApiFirebase());
        //Making the api call to get the exchanging rate
        dispatch(fetchExchangeApiThunk(currencyValueBalance))
        //Fetching the selected coin
        dispatch(fetchCurrentBtcPriceThunk())
    }, [currencyValueBalance])


    return (
        <Box>
            {/*sx={{width : "500px"}}*/}
            <Paper sx={{
                borderRadius: '20px',
                marginBottom: "10px",
                backgroundImage: `url(${BackgroundBlock})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: "rgba(255, 255, 255, 0.09)"
            }}>
                <Grid container sx={{position: "relative"}}>
                    <Grid item>
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "15px"}}>Portfolio Balance</Box>
                        <Typography variant='h5'>
                            {formatCurrency(portfolioBalanceCurrency, "", "en")}
                            <Select
                                sx={{marginLeft: "10px", color: "#B8B8B8", fontSize: "12px"}}
                                onChange={currencyHandleChange}
                                label='currency'
                                value={currencyValueBalance[0]}
                            >
                                {currency.map((item, index: number) => (
                                    <MenuItem key={index} sx={{color: "#B8B8B8", fontSize: "12px"}} value={item}>{item}</MenuItem>
                                ))}

                            </Select>
                        </Typography>
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "12px"}}>{Number(btcFormattedPrice)} BTC</Box>
                    </Grid>


                    <Box component='span' sx={{position: "absolute", bottom: -20, right: 0, maxWidth: "140px", width: "100%", height: "auto",}}>
                        <img src={walleticon} alt="WebP Image" style={{width: "100%", height: "auto"}}/>
                    </Box>

                </Grid>
            </Paper>
        </Box>
    );
};

export default React.memo(PortfolioBalanceWidget);
