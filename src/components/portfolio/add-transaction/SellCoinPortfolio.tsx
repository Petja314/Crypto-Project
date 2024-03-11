import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Grid, MenuItem, Paper, TextField, Typography} from "@mui/material";
import {createNewCoinInPortfolioThunk, PortfolioActions, updatePortfolioThunk} from "../../redux/PortfolioReducer";
import {formattedPrice} from "../../../commons/formattedPrice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";

export const SellCoinPortfolio = ({setOpenDialog}: any) => {
    const dispatch: any = useDispatch()
    const {totalPageCount, currentPage, newCoinValue, selectedCoinArrayData, myCurrentPortfolioData} = useSelector((state: RootState) => state.myPortfolio)
    const [isTableClosed, setIsTableClosed] = useState(true)


    const selectedCoinHandler = (value: any) => {
        // setSelectedCoinArrayData([value])
        dispatch(PortfolioActions.setSelectedCoinArrayData([value]))
        setIsTableClosed(false)
    }

    const filteredPortfolioData = () => {
        return myCurrentPortfolioData.filter((item: any) => item.name.toUpperCase().includes(newCoinValue.toUpperCase()))
    }
    const portfolioDataArray = filteredPortfolioData()

    // console.log('portfolioDataArray', portfolioDataArray)
    // console.log('newCoinValue' , newCoinValue)
    return (
        <Paper sx={{marginTop: "10px"}}>
            <Grid container>
                <Grid item>
                    <Box>
                        <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>Choose Coin</Box>
                        <TextField
                            onClick={() => setIsTableClosed(true)}
                            value={newCoinValue}
                            // onChange={(event) => setCoinValue(event.target.value)}
                            onChange={(event) => dispatch(PortfolioActions.getNewCoinValueAC(event.target.value))}
                            label='add coin'
                            sx={{width: "100%",}}
                        />
                        {isTableClosed &&
                            portfolioDataArray.map((item: any, index: any) => (
                                <MenuItem
                                    key={index}
                                    sx={{color: "#B8B8B8", fontSize: "12px", display: "flex", justifyContent: "space-between"}}
                                    value={item.name}
                                    onClick={() => selectedCoinHandler(item)}
                                >
                                    <Box sx={{display: "flex"}}>
                                        <Avatar sx={{width: "30px", height: "30px", marginRight: "10px"}} src={item.icon}/>
                                        <Box> {item.name} </Box>
                                    </Box>
                                    <Box>{formattedPrice(item.price)} $ </Box>
                                </MenuItem>
                            ))
                        }
                    </Box>


                    <SellCoinSection
                        selectedCoinArrayData={selectedCoinArrayData}
                    />

                </Grid>
            </Grid>
        </Paper>
    );
};


const SellCoinSection = ({selectedCoinArrayData}: any) => {
    const {id,price,totalHoldingCoins} = selectedCoinArrayData[0] || {}
    // console.log('selectedCoinArrayData[0]', selectedCoinArrayData[0])
    const {coinQuantity,totalBuyingAmount, myCurrentPortfolioData} = useSelector((state : RootState) => state.myPortfolio)
    const dispatch : any = useDispatch()
    const [error, setError] = useState('')


    useEffect(() => {
        //Setting coin quantity based from selectedCoinArrayData and coinQuantity
        if (coinQuantity > 0) {
            calculateTotalPrice()
        }
        if (!coinQuantity) {
            dispatch(PortfolioActions.setTotalBuyingAmountAC(0))
        }
    }, [selectedCoinArrayData,coinQuantity])

    const addTransactionHandler = () => {
        // Function to create coin or add new coin to the portfolio
        if (coinQuantity <= 0) {
            setError('The coin quantity must be greater than 0!')
            return
        }
        else if(coinQuantity > totalHoldingCoins ) {
            setError('Coin quantity must be less than the total holding coins')
            return
        }
        //Checking if the selected coin exist in portfolio (myCurrentPortfolioData)
        const isExistCoinID = myCurrentPortfolioData.some((item: any) => item.id === id);
        if (isExistCoinID) {
            // Coin already exists, update the existing data
            //Converting the positive number to negative - that formula of update would work correct
            const buyingNegativeNumAmount = totalBuyingAmount * -1
            const negativeCoinQuantity  = coinQuantity * -1
            dispatch(updatePortfolioThunk(id, price, buyingNegativeNumAmount, negativeCoinQuantity))
        }
        if (isExistCoinID && coinQuantity >= totalHoldingCoins ) {
            // console.log('in')
            dispatch(PortfolioActions.deleteSelectedCoinAC(id))
            setError('The coin was successfully removed from the portfolio')
        }
    };
    console.log('id' , id)
    // console.log('check' , coinQuantity >= totalHoldingCoins)

    const calculateTotalPrice = () => {
        //Calculating the total price of selected coin
        const totalSpend = coinQuantity * price
        const totalSpendResult = Math.round(totalSpend * 100) / 100
        dispatch(PortfolioActions.setTotalBuyingAmountAC(totalSpendResult))
    }

    // Checking if selected coin array does exist to prevent the error!
    if (!selectedCoinArrayData || selectedCoinArrayData.length <= 0) {
        return null
    }

    return (
        <Box>
            {
                selectedCoinArrayData.map((item: any, index: any) => (
                    <Box key={index}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
                            <Avatar sx={{width: "30px", height: "30px", marginRight: "10px"}} src={item.icon}/>
                            <Box sx={{fontWeight: "bold", marginRight: "5px"}}>{item.name}</Box>
                            <Box sx={{color: "#c0c0ce", fontSize: "10px"}} component={"span"}> {item.symbol}</Box>
                        </Box>

                        <Box sx={{marginTop: "10px", display: "flex", gap: 3}}>
                            <Box>
                                <Typography>Quantity</Typography>
                                <TextField
                                    type={"number"}
                                    variant="filled"
                                    onChange={(event) => {
                                        const inputValue = Math.max(0, Number(event.target.value));
                                        dispatch(PortfolioActions.setCoinQuantityAC(inputValue))
                                    }}
                                    value={coinQuantity.toString()}
                                />
                            </Box>

                            <Box>
                                <Typography>Price Per Coin</Typography>
                                <TextField disabled variant="filled" value={`${formattedPrice(item.price)} $`}/>
                            </Box>
                        </Box>
                    </Box>
                ))
            }

            <Paper sx={{backgroundColor: "rgba(255, 255, 255, 0.16)",display: "flex-column",textAlign: "center",marginTop: "20px"}}>
                <Box sx={{color: "#24de19", fontWeight: "bold", marginBottom: "10px"}}>{error}</Box>
                <Typography>Total Spend</Typography>
                <Box sx={{ marginTop: "10px",fontWeight: "bold",fontSize: "20px"}}>
                    {formattedPrice(totalBuyingAmount)}$
                </Box>
            </Paper>

            <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Button autoFocus onClick={addTransactionHandler}>Sell</Button>
            </Box>
        </Box>
    )
}
