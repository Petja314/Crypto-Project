import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {PortfolioActions} from "../../redux/PortfolioReducer";
import {Avatar, Box, CircularProgress, Grid, MenuItem, Paper, TextField} from "@mui/material";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {RootState} from "../../redux/ReduxStore";

export const SearchCoin = ({ portfolioData, newCoinValue}: any) => {
    const dispatch: any = useDispatch();
    const {fetching} = useSelector((state: RootState) => state.marketCoinList);
    const [isTableClosed, setIsTableClosed] = useState(true);
    const selectedCoinHandler = (value: any) => {
        dispatch(PortfolioActions.setSelectedCoinArrayData([value]));
        setIsTableClosed(false);
    };
    const filteredPortfolioDataHandler = () => {
        //Filter selected coin lists data to make a search functionality
        return portfolioData.filter((item: any) => item.name.toUpperCase().includes(newCoinValue.toUpperCase()));
    };
    const filteredPortfolioData = filteredPortfolioDataHandler();
    return (
        <Paper sx={{marginTop: "10px"}}>
            {/*<Grid container>*/}
            {/*    <Grid item>*/}
                    <Box>
                        <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>
                            Choose Coin
                        </Box>
                        <TextField
                            onClick={() => setIsTableClosed(true)}
                            value={newCoinValue}
                            onChange={(event) => dispatch(PortfolioActions.getNewCoinValueAC(event.target.value))}
                            label="add coin"
                            sx={{width: "100%"}}
                        />
                        {newCoinValue !== "" && isTableClosed &&
                            filteredPortfolioData.map((item: any, index: any) => (
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
                                    <Box>{formattedPrice(item.price)} $ </Box>
                                    {fetching &&
                                        <CircularProgress/>
                                    }
                                </MenuItem>
                            ))}
                    </Box>

            {/*    </Grid>*/}
            {/*</Grid>*/}
        </Paper>
    );
};
