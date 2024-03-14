import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import React, {useEffect, useState} from "react";
import {
    actionsCryptoTable,
    getAllCoinsListThunk,
} from "../../redux/CryptoTableReducer";
import {Avatar, Box, Grid, MenuItem, Paper, TextField} from "@mui/material";
import {
    createNewCoinInPortfolioThunk,
    deleteCoinFromPortfolioApiFirebase,
    PortfolioActions,
    updatePortfolioThunk,
} from "../../redux/PortfolioReducer";
import {BuySellCoinsComponent} from "./BuySellCoinsComponent";
import {SearchCoin} from "./SearchCoin";

export const TabPanelCoinSearch = ({portfolioData, tabValue}: any) => {
    const dispatch: any = useDispatch();
    const {fetching, rowsPerPage} = useSelector((state: RootState) => state.marketCoinList,);
    const {coinQuantity, totalBuyingAmount, totalPageCount, currentPage, newCoinValue, selectedCoinArrayData, myCurrentPortfolioDataFB,} = useSelector((state: RootState) => state.myPortfolio);
    const {id, icon, rank, name, symbol, price, totalHoldingCoins} = selectedCoinArrayData[0] || {}; // Selected current coin in search bar

    useEffect(() => {
        //Fetching coin list data
        if (fetching) {
            dispatch(getAllCoinsListThunk("USD", totalPageCount, currentPage));
            setTimeout(() => {
                dispatch(actionsCryptoTable.setFetchingAC(false));
            }, 1000);
        }
    }, [fetching, rowsPerPage]);

    //Checking if coin exist in current Data Base
    const isExistCoinID = myCurrentPortfolioDataFB.some((item: any) => item.id === id);
    const BuyCoinHandler = () => {
        // Function to create coin or add new coin to the portfolio
        if (coinQuantity <= 0) {
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The coin quantity must be greater than 0!"));
            return;
        }
        //Checking if the selected coin exist in portfolio (myCurrentPortfolioData)
        if (isExistCoinID) {
            // Coin already exists, update the existing data
            dispatch( updatePortfolioThunk(id, price, totalBuyingAmount, coinQuantity));
            dispatch( PortfolioActions.portfolioErrorWarningMessageAC("PortfolioComponent was successfully updated"));
        } else {
            // Coin doesn't exist, add a new object
            dispatch(createNewCoinInPortfolioThunk(id, icon, rank, name, symbol, price, totalBuyingAmount, coinQuantity,),);
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The new coin was added to the portfolio",),
            );
        }
    };
    const SellCoinHandler = () => {
        // Function to create coin or add new coin to the portfolio
        if (coinQuantity <= 0) {
            dispatch(PortfolioActions.portfolioErrorWarningMessageAC("The coin quantity must be greater than 0!"));
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

    return (
        <Paper sx={{marginTop: "10px"}}>
            <Grid container>
                <Grid item>
                    <SearchCoin
                        fetching={fetching}
                        newCoinValue={newCoinValue}
                        portfolioData={portfolioData}
                    />
                    <BuySellCoinsComponent
                        price={price}
                        selectedCoinArrayData={selectedCoinArrayData}
                        BuyCoinHandler={BuyCoinHandler}
                        SellCoinHandler={SellCoinHandler}
                        tabValue={tabValue}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};
