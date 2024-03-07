import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import ShopIcon from '@mui/icons-material/Shop';
import PropTypes from 'prop-types';
import {tableDataPortfolio} from "../PortfolioTable";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import {actionsCryptoTable, getAllCoinsListThunk, marketCapListArray} from "../../redux/CryptoTableReducer";
import {formattedPrice} from "../../../commons/formattedPrice";

const AddTransaction = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [tabValue, setTabValue] = useState<any>(0)

    const addTransactionHandler = () => {
        setOpenDialog(false)
    }
    //BUY 0 - SELL - 1
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
                        <TabPanelCoinSearch/>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <TabPanelCoinSearch/>
                    </TabPanel>
                </DialogContent>

                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                    <Button autoFocus onClick={addTransactionHandler}>Add Transaction</Button>
                </DialogActions>

            </Dialog>


        </Box>
    );
};

export default AddTransaction;


export const TabPanelCoinSearch = () => {
    const dispatch: any = useDispatch()
    const {marketCapList, fetching, rowsPerPage} = useSelector((state: RootState) => state.marketCoinList)
    const totalPageCount = 50
    const currentPage = 1
    const [coinValue, setCoinValue] = useState<any>('')
    const [selectedCoin, setSelectedCoin] = useState<any>([])
    const [isTableClosed, setIsTableClosed] = useState(true)

    useEffect(() => {
        //Fetching coin list data

        if (fetching) {
            dispatch(getAllCoinsListThunk('USD', totalPageCount, currentPage))
            setTimeout(() => {
                dispatch(actionsCryptoTable.setFetchingAC(false))
            }, 1000)
        }

    }, [fetching, rowsPerPage])

    const selectedCoinHandler = (value : any) => {
        setSelectedCoin([value])
        setIsTableClosed(false)
    }

    const filteredPortfolioData = () => {
        const filteredData = marketCapList.filter((item) => item.name.toUpperCase().includes(coinValue.toUpperCase()))
        return filteredData
    }
    const portfolioDataArray = filteredPortfolioData()

    // console.log('coinValue' , coinValue)
    // console.log('marketCapList' , marketCapList)
    // console.log('portfolioDataArray', portfolioDataArray)
    console.log('selectedCoin' , selectedCoin)
    return (
        <Paper sx={{
            marginTop: "10px"
        }}>

            <Grid container>
                <Grid item>
                    <Box>
                        <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>Choose Coin</Box>
                        <TextField
                            onClick={() =>  setIsTableClosed(true)}
                            value={coinValue}
                            onChange={ (event) => setCoinValue(event.target.value) }
                            label='add coin'
                            sx={{width: "100%",}}
                        />

                        {coinValue !== '' && isTableClosed ? (
                            portfolioDataArray.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    sx={{color: "#B8B8B8", fontSize: "12px", display: "flex", justifyContent: "space-between"}}
                                    value={item.name}
                                    onClick={() => selectedCoinHandler(item)}
                                >
                                    <Box sx={{display: "flex"}}>
                                        <Avatar sx={{width: "30px", height: "30px", marginRight: "10px"}} src={item.icon}/>
                                        <Box> {item.name} </Box>
                                    </Box>
                                    <Box>{formattedPrice(item.price)} $ </Box>
                                </MenuItem>
                            ))
                        ) : (
                            ""
                        )
                        }
                    </Box>

                    <PurchaseCoinSection
                        selectedCoin={selectedCoin}
                    />

                </Grid>
            </Grid>

        </Paper>
    )
}


const PurchaseCoinSection = ({selectedCoin} : any) => {
    // console.log('selectedCoin', selectedCoin)
    const [quantity, setQuantity] = useState<any>(null)
    const [totalAmount, setTotalAmount] = useState<any>(0)

    useEffect(() => {
        if (quantity > 0) {
            calculateTotalPrice()
        }
        if(!quantity){
            setTotalAmount(0)
        }
    },[quantity])

    const calculateTotalPrice = () => {
        const pricePerCoin = selectedCoin[0].price
        const totalSpend = quantity * pricePerCoin
        setTotalAmount(totalSpend)

    }

    if (!selectedCoin || selectedCoin.length <= 0) {
        return null
    }
    console.log('quantity' , quantity)
    console.log('totalAmount' , totalAmount)
    return (
        <Box>
            <Box>

                {
                    selectedCoin.map((item:any , index:any)=>  (
                            <Box key={index}>

                                    <Box sx={{display: "flex", justifyContent : "center", alignItems : "center", marginTop : "10px" }}>
                                        <Avatar sx={{width : "30px", height : "30px",marginRight : "10px"}} src={item.icon}/>
                                        <Box sx={{fontWeight: "bold", marginRight : "5px"}}>{item.name}</Box>
                                        <Box sx={{color: "#c0c0ce", fontSize: "10px"}} component={"span"}> {item.symbol}</Box>
                                    </Box>

                                <Box sx={{marginTop: "10px", display: "flex", gap: 3}} >
                                    <Box>
                                        <Typography>Quantity</Typography>
                                        <TextField
                                            type={"number"}
                                            variant="filled"
                                            onChange={(event) => setQuantity(event.target.value)}
                                            value={quantity}
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

                <Paper sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.16)",
                    display: "flex-column",
                    textAlign: "center",
                    marginTop: "20px"
                }}>
                    <Typography>Total Spend</Typography>
                    <Box sx={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}
                    >{formattedPrice(totalAmount)}$</Box>
                </Paper>
            </Box>
        </Box>
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