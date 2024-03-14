import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import ShopIcon from '@mui/icons-material/Shop';
import PropTypes from 'prop-types';
import {PortfolioActions, updatePortfolioThunk} from "../../redux/PortfolioReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import {actionsCryptoTable, getAllCoinsListThunk} from "../../redux/CryptoTableReducer";
import {SearchCoin} from "./SearchCoin";
import {BuySellCoinsComponent} from "./BuySellCoinsComponent";

const AddTransactionContainer = () => {
    const dispatch: any = useDispatch()
    const {fetching, rowsPerPage, marketCapList} = useSelector((state: RootState) => state.marketCoinList,);
    const {totalPageCount, currentPage, newCoinValue, myCurrentPortfolioDataFB, isPortfolioDialogOpen,} = useSelector((state: RootState) => state.myPortfolio);
    const [tabValue, setTabValue] = useState<any>(0)

    useEffect(() => {
        //Fetching coin list data
        if (fetching) {
            dispatch(getAllCoinsListThunk("USD", totalPageCount, currentPage));
            setTimeout(() => {
                dispatch(actionsCryptoTable.setFetchingAC(false));
            }, 1000);
        }
    }, [fetching, rowsPerPage]);

    const tabValueHandler = (event: any, newValue: any) => {
        // console.log('tabValueHandler', newValue)
        setTabValue(newValue)
    }

    return (
        <Box>
            <Dialog open={isPortfolioDialogOpen} onClose={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(false))}>
                <DialogTitle>Add transaction</DialogTitle>
                <IconButton aria-label="close"
                            onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(false))}
                            sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>
                    <Tabs variant="fullWidth" value={tabValue} onChange={tabValueHandler}>
                        <Tab icon={<ShopIcon/>} label='Buy'/>
                        <Tab icon={<SellIcon/>} label='Sell'/>
                    </Tabs>

                    {/*TAB PANEL BUY*/}
                    <TabPanel value={tabValue} index={0}>
                        <SearchCoin
                            newCoinValue={newCoinValue}
                            portfolioData={marketCapList}
                        />
                        <BuySellCoinsComponent
                            tabValue={tabValue}
                        />
                    </TabPanel>

                    {/*TAB PANEL SELL*/}
                    <TabPanel value={tabValue} index={1}>
                        <SearchCoin
                            newCoinValue={newCoinValue}
                            portfolioData={myCurrentPortfolioDataFB}
                        />
                        <BuySellCoinsComponent
                            tabValue={tabValue}
                        />
                    </TabPanel>


                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AddTransactionContainer;
export const TabPanel = (props: any) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


