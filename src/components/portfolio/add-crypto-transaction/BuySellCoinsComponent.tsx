import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/ReduxStore";
import {createNewCoinInPortfolioThunk, deleteCoinFromPortfolioApiFirebase, PortfolioActions, portfolioFirebaseDataType, updatePortfolioThunk,} from "../../../redux/PortfolioReducer";
import {Avatar, Box, Button, Paper, TextField, Typography} from "@mui/material";
import {marketCapListArray} from "../../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/portfolio/add-transaction.module.css"


type BuySellCoinsComponentPropsType = {
    tabValue : number
}
/**
 * BuySellCoinsComponent:
 * Manages the buying and selling of coins within the user portfolio.
 * Features:
 * - Displays selected coin details including name, symbol, quantity, and price per coin.
 * - Allows users to input the quantity of coins they want to buy or sell.
 * - Calculates the total spend or earnings based on the quantity and price per coin.
 * - Provides options to buy or sell coins with corresponding actions.
 * - Handles error messages related to transaction validation and execution.
 */


const BuySellCoinsComponent = ({ tabValue }: BuySellCoinsComponentPropsType) => {
    const dispatch: AppDispatch = useDispatch()
    const {coinQuantity, totalBuyingAmount, errorMessage ,selectedCoinArrayData  , myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)
    const {id, icon, rank, name, symbol, price, totalHoldingCoins} = selectedCoinArrayData[0] || {}; // Selected current coin in search bar

    useEffect(() => {
        //Setting coin quantity based from selectedCoinArrayData and coinQuantity - UseEffect would run every time when the coinMMQ was changed
        if (coinQuantity > 0) {
            calculateTotalPrice()
        }
        if (!coinQuantity) {
            dispatch(PortfolioActions.setTotalBuyingAmountAC(0))
        }
    }, [selectedCoinArrayData, coinQuantity])
    const calculateTotalPrice = () => {
        //Calculating the total price of selected coin
        const totalSpend = coinQuantity * price
        const totalSpendResult = Math.round(totalSpend * 100) / 100
        dispatch(PortfolioActions.setTotalBuyingAmountAC(totalSpendResult))
    }
    const isExistCoinID = myCurrentPortfolioDataFB.some((item : portfolioFirebaseDataType): boolean => item.id === id);
    const coinQuantityCheckHandler = () => {
        if (coinQuantity <= 0) {
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The coin quantity must be greater than 0!"));
            return false //validation was not successful
        }
        return true // validation passed
    }
    const BuyCoinHandler = () => {
        // Function to create coin or add new coin to the portfolio
        if(!coinQuantityCheckHandler()){
            return;
        }
        //Checking if the selected coin exist in portfolio (myCurrentPortfolioData)
        if (isExistCoinID) {
            // Coin already exists, update the existing data
            dispatch(updatePortfolioThunk(id, price, totalBuyingAmount, coinQuantity));
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("PortfolioManager was successfully updated"));
        } else {
            // Coin doesn't exist, add a new object
            dispatch(createNewCoinInPortfolioThunk(id, icon, rank, name, symbol, price, totalBuyingAmount, coinQuantity));
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The new coin was added to the portfolio"));
        }
    };
    const SellCoinHandler = () => {
        // Function to create coin or add new coin to the portfolio
        if(!coinQuantityCheckHandler()){
            return;
        }
        if (coinQuantity >= totalHoldingCoins) {
            dispatch(deleteCoinFromPortfolioApiFirebase(id));
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The coin was successfully removed from the portfolio"));
            return;
        }
        //Checking if the selected coin exist in portfolio (myCurrentPortfolioData)
        if (isExistCoinID) {
            // Coin already exists, update the existing data
            //Converting the positive number to negative - that formula of update would work correct
            const buyingNegativeNumAmount = totalBuyingAmount * -1;
            const negativeCoinQuantity = coinQuantity * -1;
            dispatch(updatePortfolioThunk(id, price, buyingNegativeNumAmount, negativeCoinQuantity));
        }
    };

    // Checking if selected coin array does exist to prevent the error!
    if (!selectedCoinArrayData || selectedCoinArrayData.length <= 0) {
        return null
    }
    return (
        <Box>
            {
                selectedCoinArrayData.map((item : marketCapListArray, index: number) => (
                    <Box key={index}>
                        <Box className={styles.selectedCoinContent}>
                            <Avatar className={styles.selectedCoinIcon} src={item.icon}/>
                            <Box className={styles.selectedCoinName}>{item.name}</Box>
                            <Box className={styles.selectedCoinSymbol} component={"span"}>{item.symbol}</Box>
                        </Box>

                        <Box className={styles.selectedCoinPurchaseContent}>
                            <Box>
                                <Typography>Quantity</Typography>
                                <TextField
                                    type={"number"}
                                    variant="filled"
                                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                                        const inputValue = Math.max(0, Number(event.target.value));
                                        dispatch(PortfolioActions.setCoinQuantityAC(inputValue))
                                    }}
                                    value={coinQuantity.toString()}
                                />
                            </Box>

                            <Box>
                                <Typography>Price Per Coin</Typography>
                                <TextField disabled variant="filled" value={`${formatCurrency(item.price, "USD", "en")} `}/>
                            </Box>
                        </Box>
                    </Box>
                ))
            }

            <Paper className={styles.paperSelectedCoin}>
                <Box className={styles.errorMessage}>{errorMessage}</Box>
                <Typography>Total Spend</Typography>
                <Box className={styles.buyingAmount}>
                    {formatCurrency(totalBuyingAmount, "USD", "en")}
                </Box>
            </Paper>

            <Box className={styles.purchaseName}>
                {/*Show the button base on dialogs popup tab value */}
                {tabValue === 0 ? (
                    <Button autoFocus onClick={BuyCoinHandler}>Buy</Button>
                ) : (
                    <Button autoFocus onClick={SellCoinHandler}>Sell</Button>
                )}
            </Box>
        </Box>
    )
};



export default React.memo(BuySellCoinsComponent);

