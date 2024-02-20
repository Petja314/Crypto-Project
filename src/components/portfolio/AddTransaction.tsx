import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import ShopIcon from '@mui/icons-material/Shop';
import PropTypes from 'prop-types';
import {tableDataPortfolio} from "./PortfolioTable";

const AddTransaction = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [tabValue, setTabValue] = useState<any>(0)

    const addTransactionHandler = () => {
        setOpenDialog(false)
    }
    const tabValueHandler = (event: any, newValue: any) => {
        setTabValue(newValue)
    }


    // console.log('tabValue', tabValue)
    return (
        <Box>
            <Button
                sx={{
                    padding: 0
                }}
                onClick={() => setOpenDialog(true)}
            >
                +
            </Button>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Add transaction</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenDialog(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <DialogContent>
                    <Tabs
                        variant="fullWidth"
                        value={tabValue}
                        onChange={tabValueHandler}
                    >
                        <Tab icon={<ShopIcon/>} label='Buy'/>
                        <Tab icon={<SellIcon/>} label='Sell'/>
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <TabPanelContent/>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <TabPanelContent/>
                    </TabPanel>
                </DialogContent>

                <DialogActions sx={{ display: "flex",justifyContent: "center" }} >
                    <Button autoFocus onClick={addTransactionHandler}>Add Transaction</Button>
                </DialogActions>

            </Dialog>


        </Box>
    );
};

export default AddTransaction;


export const TabPanelContent = () => {
    const [selectCoin, setSelectCoin] = useState([])
    const selectCoinHandler = (event: any) => {
        const selectedValue = event.target.value
        setSelectCoin(selectedValue.split(' '))
    }

    return (
        <Paper sx={{
            marginTop: "10px"
        }}>

            <Grid container>
                <Grid item>
                    <Box>
                        <Box
                            sx={{
                                textAlign: "center",
                                margin: "10px 0px 10px 0px"

                            }}
                        >Choose Coin</Box>
                        <Select
                            value={selectCoin}
                            onChange={selectCoinHandler}
                            label='add coin'
                            sx={{
                                width: "100%"
                            }}
                        >
                            {
                                tableDataPortfolio.map(item => (
                                    <MenuItem sx={{color: "#B8B8B8", fontSize: "12px"}} value={item.name}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </Box>


                    <Box
                        sx={{
                            marginTop: "15px",
                            display: "flex",
                            gap: 3
                        }}
                    >
                        <Box>
                            <Typography>Quantity</Typography>
                            <TextField variant="filled"/>
                        </Box>
                        <Box>
                            <Typography>Price Per Coin</Typography>
                            <TextField variant="filled"/>
                        </Box>
                    </Box>

                    <Box
                    >
                        <Paper sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.16)",
                            display: "flex-column",
                            textAlign: "center",
                            marginTop: "20px"
                        }}>
                            <Typography>Total Spend</Typography>

                            <Box
                                sx={{
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                    fontSize: "20px"
                                }}
                            >4529.32$</Box>

                        </Paper>
                    </Box>

                </Grid>
            </Grid>

        </Paper>
    )
}


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