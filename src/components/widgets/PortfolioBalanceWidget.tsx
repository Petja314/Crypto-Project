import React, {useEffect, useState} from 'react';
import {Box, Grid, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import walleticon from "../../assets/images/image/wallet.webp"
import BackgroundBlock from "../../assets/images/image/block_bg.svg"
import {useDispatch, useSelector} from "react-redux";
import {formattedPrice} from "../../commons/functions/formattedPrice";
import {coinStatApi, exchangeCurrencyApi} from "../api/CoinStatApi";
import {fetchPortfolioDataApiFirebase} from "../redux/PortfolioReducer";


const PortfolioBalanceWidget = () => {
    const dispatch : any = useDispatch()
    const {myCurrentPortfolioDataFB} = useSelector((state: any) => state.myPortfolio)
    const totalPortfolioValue = myCurrentPortfolioDataFB.reduce((accum: any, value: any) => accum + value.totalHoldingCoinAmountCash, 0)
    const [currencyValue, setCurrencyValue] = useState<any>(['USD'])
    const currency = ["USD", "GBP", "EUR", "CAD", "AUD"]
    const [exchangingRate, setExchangingRate] = useState<any>([])
    const [btcPrice, setBtcPrice] = useState<any>(null)


    const portfolioBalanceCurrency = totalPortfolioValue * exchangingRate[0]
    const btcInPortfolio = portfolioBalanceCurrency / btcPrice
    const btcFormattedPrice = btcInPortfolio.toFixed(5)

    const currencyHandleChange = (event: any) => {
        const selectedValue = event.target?.value
        setCurrencyValue(selectedValue.split(" "))
    }

    const fetchExchangeApi = async () => {
        try {
            let response = await exchangeCurrencyApi.fetchCurrencyRate(currencyValue)
            const currentExchangeValue = Object.values(response.data.data)
            setExchangingRate(currentExchangeValue)
        }
        catch(error){
            console.error(error)
        }
    }

    const fetchCurrentBtcPrice = async () => {
        try {
            const response = await coinStatApi.coinDetails("bitcoin", "usd")
            // console.log('response :' , response.data.price)
            setBtcPrice(response.data.price)
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        dispatch(fetchPortfolioDataApiFirebase());
        fetchExchangeApi()
        fetchCurrentBtcPrice()
    },[currencyValue])

    // console.log('currencyValue',currencyValue)
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
                <Grid container
                      sx={{position : "relative"}}
                >
                    <Grid item >
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "15px"}}>Portfolio Balance</Box>
                        <Typography variant='h5'>
                            {formattedPrice(portfolioBalanceCurrency)}
                            <Select
                                sx={{marginLeft: "10px",color: "#B8B8B8", fontSize: "12px",}}
                                onChange={currencyHandleChange}
                                label='currency'
                                value={currencyValue}
                            >
                                {currency.map((item , index) => (
                                    <MenuItem  key={index} sx={{color: "#B8B8B8", fontSize: "12px"}} value={item}>{item}</MenuItem>
                                ))}

                            </Select>
                        </Typography>
                        <Box component='span' sx={{color: "#B8B8B8", fontSize: "12px"}}>{Number(btcFormattedPrice)} BTC</Box>


                    </Grid>


                    <Box component='span' sx={{position: "absolute",bottom: -20,right: 0, maxWidth: "140px",width: "100%",height: "auto",}}>
                        <img src={walleticon} alt="WebP Image" style={{ width: "100%", height: "auto" }} />
                    </Box>

                </Grid>

            </Paper>

        </Box>
    );
};

export default PortfolioBalanceWidget;