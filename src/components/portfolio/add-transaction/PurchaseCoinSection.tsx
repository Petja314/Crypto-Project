import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Paper, TextField, Typography} from "@mui/material";
import {formattedPrice} from "../../../commons/formattedPrice";
import {createNewCoinInPortfolioThunk, PortfolioActions, updatePortfolioThunk} from "../../redux/PortfolioReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";

export const PurchaseCoinSection = ({selectedCoinArrayData, setOpenDialog}: any) => {
    const {id,icon,rank,name,symbol,price} = selectedCoinArrayData[0] || {}
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
        //Checking if the selected coin exist in portfolio (myCurrentPortfolioData)
        const isExistCoinID = myCurrentPortfolioData.some((item: any) => item.id === id);

        if (isExistCoinID) {
            // Coin already exists, update the existing data
            // updatePortfolioHandler()
            dispatch(updatePortfolioThunk(id, price, totalBuyingAmount, coinQuantity))
            setError('Portfolio was successfully updated')
        } else {
            // Coin doesn't exist, add a new object
            // createNewCoinInPortfolioHandler()
            dispatch(createNewCoinInPortfolioThunk(id,icon,rank,name,symbol,price,totalBuyingAmount, coinQuantity))
            setError('The new coin was added to the portfolio')
        }
    };


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
                    <Button autoFocus onClick={addTransactionHandler}>Add Transaction</Button>
                </Box>
            </Box>
    )
}
