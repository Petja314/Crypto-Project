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
    const [name, setName] = useState<any>('')
    const [newState, setNewState] = useState<any>([
        {id : "" , name : [] , value : []}
    ])
    // console.log('newState : ', newState)
    // console.log('name :' , name)
    // const addTransactionHandler = () => {
    //     setOpenDialog(false)
    // }
    //BUY 0 - SELL - 1
    const tabValueHandler = (event: any, newValue: any) => {
        setTabValue(newValue)
    }

    const addNewValueHandler = (id : any) => {
        const coinId = id
        // console.log('coinId' ,coinId)
        const data = {id : coinId, name : ["btc"] , value : [1000]}
        const isExisting = newState.some((item : any) => item.id === coinId)

        if(!isExisting) {
            const updatedState = newState.map((item : any) => (
               {...item,
                   name : [...item.name ,name],
                   value : data.value
               }
            ))
            setNewState(updatedState)
        }
        else {
            setNewState([...newState,data ])
        }
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

            {/*<input type="text" onChange={(event) => setName(event.target.value)} />*/}
            {/*<Button onClick={() => addNewValueHandler("btc")} >CLICK</Button>*/}


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
                        <TabPanelCoinSearch
                            setOpenDialog={setOpenDialog}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <TabPanelCoinSearch
                            setOpenDialog={setOpenDialog}
                        />
                    </TabPanel>
                </DialogContent>

                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                    {/*<Button autoFocus onClick={addTransactionHandler}>Add Transaction</Button>*/}
                </DialogActions>


            </Dialog>


        </Box>
    );
};

export default AddTransaction;


export const TabPanelCoinSearch = ({setOpenDialog}: any) => {
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

    const selectedCoinHandler = (value: any) => {
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
    // console.log('selectedCoin', selectedCoin)
    return (
        <Paper sx={{
            marginTop: "10px"
        }}>

            <Grid container>
                <Grid item>
                    <Box>
                        <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>Choose Coin</Box>
                        <TextField
                            onClick={() => setIsTableClosed(true)}
                            value={coinValue}
                            onChange={(event) => setCoinValue(event.target.value)}
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
                        setOpenDialog={setOpenDialog}
                    />



                </Grid>
            </Grid>

        </Paper>
    )
}


const PurchaseCoinSection = ({selectedCoin, setOpenDialog}: any) => {
    // console.log('selectedCoin', selectedCoin)
    const selectedCoinId = selectedCoin[0]?.id
    const [quantity, setQuantity] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<any>(0)
    // const [portfolioDataMy, setPortfolioDataSetMy] = useState<any>([])

    const [portfolioDataMy, setPortfolioDataSetMy] = useState<any>([
        {
            id : "",
            icon: "",
            rank: "",
            name: "",
            symbol : "",
            currentCoinPrice: 0,                    //Current coin price
            coinsBoughtAmountHistoryCash: [],       //Coins Bought Amount in Cash History
            coinsBoughtHistoryTokenQuantity : [],   //Coins Bought Quantity History
            totalHoldingCoins: 0,                   //Total Holding Coins in portfolio
            buyingPricesHistory: [],                //Buying prices history in $
            averageBuyingPrice: 0,                  //Average buying price
            profitLoss: 0,                          //PROFIT - LOSS
            totalHoldingCoinAmountCash : 0,         //Total amount of coins in portfolio
        }
    ])

    useEffect(() => {
        if (quantity > 0) {
            calculateTotalPrice()
        }
        if (!quantity) {
            setTotalAmount(0)
        }
    }, [quantity])

    const addTransactionHandler = () => {
        const currentCoinPrice = selectedCoin[0]?.price || 0;
        const quantityNumber = Number(quantity);

        const existingIndex = portfolioDataMy.findIndex((item: any) => item.id === selectedCoinId);

        const updatedPortfolioData = portfolioDataMy.map((item: any, index: any) => {
            if (item.id === selectedCoinId) {
                // Update specific properties for the existing item
                return {
                    ...item,
                    coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalAmount],
                    coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, quantityNumber],
                    totalHoldingCoins: item.totalHoldingCoins <= 0 ? quantityNumber : item.totalHoldingCoins + quantityNumber,
                    totalHoldingCoinAmountCash: item.totalHoldingCoins * currentCoinPrice,
                    buyingPricesHistory: [...item.buyingPricesHistory, totalAmount],
                    averageBuyingPrice: item.totalHoldingCoins <= 0 ? quantityNumber : (item.totalHoldingCoinAmountCash + totalAmount) / (item.totalHoldingCoins + quantityNumber),
                    profitLoss: (currentCoinPrice - item.averageBuyingPrice) * (item.totalHoldingCoins + quantityNumber),
                };
            }
            return item;
        });

        if (existingIndex !== -1) {
            // Item exists, update the existing array
            setPortfolioDataSetMy(updatedPortfolioData);
        } else {
            // Item doesn't exist, add a new object
            const newCoinData = {
                id: selectedCoin[0]?.id || "",
                icon: selectedCoin[0]?.icon || "",
                rank: selectedCoin[0]?.rank || "",
                name: selectedCoin[0]?.name || "",
                symbol: selectedCoin[0]?.symbol || "",
                currentCoinPrice,
                coinsBoughtAmountHistoryCash: [totalAmount],
                coinsBoughtHistoryTokenQuantity: [quantityNumber],
                totalHoldingCoins: quantityNumber,
                totalHoldingCoinAmountCash: quantityNumber * currentCoinPrice,
                buyingPricesHistory: [totalAmount],
                averageBuyingPrice: quantityNumber,
                profitLoss: 0,
            };

            setPortfolioDataSetMy([...portfolioDataMy, newCoinData]);
        }

        console.log('updatedPortfolioData', updatedPortfolioData);
    };




    const calculateTotalPrice = () => {
        const pricePerCoin = selectedCoin[0].price
        const totalSpend = quantity * pricePerCoin
        setTotalAmount(totalSpend)

    }

    if (!selectedCoin || selectedCoin.length <= 0) {
        return null
    }
    console.log('portfolioDataMy' ,portfolioDataMy)
    return (
        <Box>
            <Box>

                {
                    selectedCoin.map((item: any, index: any) => (
                        <Box key={index}>

                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
                                <Avatar sx={{width: "30px", height: "30px", marginRight: "10px"}} src={item.icon}/>
                                <Box sx={{fontWeight: "bold", marginRight: "5px"}}>{item.name}</Box>
                                <Box sx={{color: "#c0c0ce", fontSize: "10px"}} component={"span"}> {item.symbol}</Box>
                            </Box>

                            <Box sx={{marginTop: "10px", display: "flex", gap: 3}}>
                                <Box>
                                    <Typography>Quantity</Typography>
                                    <TextField
                                        type={"number"}
                                        variant="filled"
                                        onChange={(event : any) => setQuantity(event.target.value)}
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

                <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <Button autoFocus onClick={addTransactionHandler}>Add Transaction</Button>
                </Box>

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