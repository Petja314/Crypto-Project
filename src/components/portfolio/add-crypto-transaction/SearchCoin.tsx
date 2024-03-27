import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {PortfolioActions, portfolioFirebaseDataType} from "../../redux/PortfolioReducer";
import {Avatar, Box, CircularProgress, Grid, MenuItem, Paper, TextField} from "@mui/material";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import {marketCapListArray} from "../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";

type SearchCoinPropsType = {
    portfolioData: any ,//marketCapListArray[] | portfolioFirebaseDataType[] ,
    newCoinValue: string
}

export const SearchCoin = ({portfolioData, newCoinValue}: SearchCoinPropsType) => {
    const dispatch: AppDispatch = useDispatch();
    const {fetching} = useSelector((state: RootState) => state.marketCoinList);
    const [isTableClosed, setIsTableClosed] = useState(true);
    const selectedCoinHandler = (value: marketCapListArray) => {
        // console.log('[value] :' , [value])
        dispatch(PortfolioActions.setSelectedCoinArrayData([value]));
        setIsTableClosed(false);
    };
    const filteredPortfolioDataHandler = () => {
        //Filter selected coin lists data to make a search functionality
        return portfolioData.filter((item : any) => item.name.toUpperCase().includes(newCoinValue.toUpperCase()));
    };
    const filteredPortfolioData = filteredPortfolioDataHandler();
    return (
        <Paper sx={{marginTop: "10px"}}>
            <Box>
                <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>
                    Choose Coin
                </Box>
                <TextField
                    onClick={() => setIsTableClosed(true)}
                    value={newCoinValue}
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => dispatch(PortfolioActions.getNewCoinValueAC(event.target.value))}
                    label="add coin"
                    sx={{width: "100%"}}
                />
                {newCoinValue !== "" && isTableClosed &&
                    filteredPortfolioData.map((item : marketCapListArray, index: number) => (
                        <MenuItem
                            key={index}
                            sx={{color: "#B8B8B8", fontSize: "12px", display: "flex", justifyContent: "space-between"}}
                            value={item.name}
                            onClick={() => selectedCoinHandler(item)}
                        >
                            <Box sx={{display: "flex"}}>
                                <Avatar
                                    sx={{width: "30px", height: "30px", marginRight: "10px"}}
                                    src={item.icon}
                                />
                                <Box> {item.name} </Box>
                            </Box>
                            <Box>{formatCurrency(item.price, "USD", "en")} $ </Box>
                            {fetching &&
                                <CircularProgress/>
                            }
                        </MenuItem>
                    ))}
            </Box>
        </Paper>
    );
};
