import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {PortfolioActions} from "../../../redux/PortfolioReducer";
import {Avatar, Box, CircularProgress, MenuItem, Paper, TextField} from "@mui/material";
import {AppDispatch, RootState} from "../../../redux/ReduxStore";
import {marketCapListArray} from "../../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/portfolio/add-transaction.module.css"


type SearchCoinPropsType = {
    portfolioData: any, //marketCapListArray[] | portfolioFirebaseDataType[] ,
    newCoinValue: string
}

/**
 * SearchCoin Component:
 * Facilitates searching for coins to add to transactions within the user's portfolio.
 * Features:
 *  - Displays a text field for entering the coin name to search.
 *  - Filters the portfolio data based on the entered coin name for search functionality.
 *  - Allows users to select a coin from the filtered list to add to the transaction.
 */



const SearchCoin = ({portfolioData, newCoinValue}: SearchCoinPropsType) => {
    const dispatch: AppDispatch = useDispatch();
    const {fetching} = useSelector((state: RootState) => state.marketCoinList);
    const [isTableClosed, setIsTableClosed] = useState(true);


    //Dispatching the selected coin value
    const selectedCoinHandler = (value: marketCapListArray) => {
        dispatch(PortfolioActions.setSelectedCoinArrayData([value]));
        setIsTableClosed(false);
    };
    const filteredPortfolioDataHandler = () => {
        //Filter selected coin lists data to make a search functionality
        return portfolioData.filter((item: any) => item.name.toUpperCase().includes(newCoinValue.toUpperCase()));
    };
    const filteredPortfolioData = filteredPortfolioDataHandler();
    return (
        <Paper className={styles.paperSearchCoin}>
            <Box>
                <Box className={styles.searchDialogTitle}>Choose Coin</Box>
                <TextField
                    onClick={() => setIsTableClosed(true)}
                    value={newCoinValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(PortfolioActions.getNewCoinValueAC(event.target.value))}
                    label="add coin"
                    className={styles.searchCoinInput}
                />

                {newCoinValue !== "" && isTableClosed &&
                    filteredPortfolioData.map((item: marketCapListArray, index: number) => (
                        <MenuItem
                            key={index}
                            className={styles.searchCoinMenu}
                            value={item.name}
                            onClick={() => selectedCoinHandler(item)}
                        >
                            <Box className={styles.searchCoinContentBox}>
                                <Avatar className={styles.searchCoinIcon} src={item.icon}/>
                                <Box>{item.name}</Box>
                            </Box>
                            <Box>{formatCurrency(item.price, "USD", "en")}</Box>
                            {fetching &&
                                <CircularProgress/>
                            }
                        </MenuItem>
                    ))
                }
            </Box>
        </Paper>
    );
};

export default React.memo(SearchCoin);
