import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import ShopIcon from '@mui/icons-material/Shop';
import PropTypes from 'prop-types';
import {TabPanelCoinSearch} from "./TabPanelCoinSearch";
import {PortfolioActions} from "../../redux/PortfolioReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";

const AddTransactionContainer = () => {
    const dispatch: any = useDispatch()
    const {marketCapList} = useSelector((state: RootState) => state.marketCoinList) //List of all coins from market cap
    const {myCurrentPortfolioDataFB, isPortfolioDialogOpen} = useSelector((state: RootState) => state.myPortfolio)
    const [tabValue, setTabValue] = useState<any>(0)
    const tabValueHandler = (event: any, newValue: any) => {
        setTabValue(newValue)
    }






    return (
        <Box>
            <Dialog open={isPortfolioDialogOpen} onClose={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(false))}>
                <DialogTitle>Add transaction</DialogTitle>
                <IconButton  aria-label="close"
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

                    <TabPanel value={tabValue} index={0}>
                        <TabPanelCoinSearch
                            tabValue={tabValue}
                            portfolioData={marketCapList} //marketCapList - list from the api to select and add new coins
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <TabPanelCoinSearch
                            tabValue={tabValue}
                            portfolioData={myCurrentPortfolioDataFB} // myCurrentPortfolioDataFB - list from current portfolio
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


