import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import ShopIcon from '@mui/icons-material/Shop';
import PropTypes from 'prop-types';
import {TabPanelCoinSearch} from "./TabPanelCoinSearch";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {PortfolioActions} from "../../redux/PortfolioReducer";
import {useDispatch} from "react-redux";
import {SellCoinPortfolio} from "./SellCoinPortfolio";
const AddTransactionContainer = ({coinId} : any) => {
    const dispatch : any = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)
    const [tabValue, setTabValue] = useState<any>(0)
    const tabValueHandler = (event: any, newValue: any) => {
        setTabValue(newValue)
    }



    return (
        <Box>
            {/*//BUTTONS FROM THE TABLE*/}
            <Box sx={{display : "flex",gap : 2}}>
                <Button  sx={{padding: 0 }} onClick={() => setOpenDialog(true)}>
                    <AddCircleOutlineIcon/>
                </Button>

                <Button
                    onClick={() => dispatch(PortfolioActions.deleteSelectedCoinAC(coinId))}
                        sx={{padding: 0  }}>
                    <DeleteIcon/>
                </Button>
            </Box>

            <Dialog open={openDialog}  onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add transaction</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenDialog(false)}
                    sx={{position: 'absolute',right: 8,top: 8,color: (theme) => theme.palette.grey[500],}}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>
                    <Tabs variant="fullWidth" value={tabValue} onChange={tabValueHandler}>
                        <Tab icon={<ShopIcon/>} label='Buy'/>
                        <Tab icon={<SellIcon/>} label='Sell'/>
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <TabPanelCoinSearch setOpenDialog={setOpenDialog}/>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                         <SellCoinPortfolio setOpenDialog={setOpenDialog}  />
                        {/*<TabPanelCoinSearch setOpenDialog={setOpenDialog}/>*/}
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


