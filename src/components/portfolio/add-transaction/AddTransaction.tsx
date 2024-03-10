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
        {id: "", name: [], value: []}
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

    const addNewValueHandler = (id: any) => {
        const coinId = id
        // console.log('coinId' ,coinId)
        const data = {id: coinId, name: ["btc"], value: [1000]}
        const isExisting = newState.some((item: any) => item.id === coinId)

        if (!isExisting) {
            const updatedState = newState.map((item: any) => (
                {
                    ...item,
                    id: id,
                    name: [...item.name, name],
                    value: data.value
                }
            ))
            console.log('in')
            setNewState(updatedState)
        } else {
            setNewState([...newState, data])
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

            <input type="text" onChange={(event) => setName(event.target.value)}/>
            <Button onClick={() => addNewValueHandler("btc")}>CLICK</Button>


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
    const {fetching, rowsPerPage} = useSelector((state: RootState) => state.marketCoinList) //marketCapList
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
            id: "",
            icon: "",
            rank: "",
            name: "",
            symbol: "",
            currentCoinPrice: 0,                    //Current coin price
            coinsBoughtAmountHistoryCash: [],       //Coins Bought Amount in Cash History
            coinsBoughtHistoryTokenQuantity: [],   //Coins Bought Quantity History
            totalHoldingCoins: 0,                   //Total Holding Coins in portfolio
            buyingPricesHistory: [],                //Buying prices history in $
            averageBuyingPrice: 0,                  //Average buying price
            profitLoss: 0,                          //PROFIT - LOSS
            totalHoldingCoinAmountCash: 0,         //Total amount of coins in portfolio
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

        const coinExists = portfolioDataMy.some((item: any) => item.id === selectedCoinId);

        if (coinExists) {
            // Coin already exists, update the existing entry
            const updatedPortfolioData = portfolioDataMy.map((item: any) => {
                if (item.id === selectedCoinId) {
                    return {
                        ...item,
                        currentCoinPrice: selectedCoin[0].price,
                        coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalAmount],
                        coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, quantityNumber],
                        totalHoldingCoins: item.totalHoldingCoins + quantityNumber,
                        buyingPricesHistory: [...item.buyingPricesHistory, totalAmount],
                        averageBuyingPrice: (item.totalHoldingCoinAmountCash + totalAmount) / (item.totalHoldingCoins + quantityNumber),
                        profitLoss: (currentCoinPrice - item.averageBuyingPrice) * item.totalHoldingCoins,
                        totalHoldingCoinAmountCash: (item.totalHoldingCoins + quantityNumber) * currentCoinPrice,
                    };
                }
                return item;
            });

            setPortfolioDataSetMy(updatedPortfolioData);
        } else {
            // Coin doesn't exist, add a new object
            const newCoinData = {
                id: selectedCoin[0]?.id || "",
                icon: selectedCoin[0]?.icon || "",
                rank: selectedCoin[0]?.rank || "",
                name: selectedCoin[0]?.name || "",
                symbol: selectedCoin[0]?.symbol || "",
                currentCoinPrice: selectedCoin[0]?.price,
                coinsBoughtAmountHistoryCash: [totalAmount],
                coinsBoughtHistoryTokenQuantity: [quantityNumber],
                totalHoldingCoins: quantityNumber,
                totalHoldingCoinAmountCash: quantityNumber * currentCoinPrice,
                buyingPricesHistory: [totalAmount],
                averageBuyingPrice: quantityNumber,
                profitLoss: 0,
            };

            // If there's an initial empty object, replace it; otherwise, add the new entry
            const updatedPortfolioData = portfolioDataMy.length === 1 && portfolioDataMy[0].id === ""
                ? [newCoinData]
                : [...portfolioDataMy ,newCoinData];

            setPortfolioDataSetMy(updatedPortfolioData);
        }
    };


    // const addTransactionHandler = () => {
    //     const currentCoinPrice = selectedCoin[0]?.price || 0;
    //     const quantityNumber = Number(quantity);
    //     console.log('selectedCoinId' , selectedCoinId)
    //     const existingID = portfolioDataMy.some((item: any) => item.id === selectedCoinId);
    //
    //     const updatedPortfolioData = portfolioDataMy.map((item: any, index: any) => {
    //         if (item.id === selectedCoinId) {
    //         // Update specific properties for the existing item
    //         return {
    //             ...item,
    //             id: selectedCoin[0]?.id || "",
    //             icon: selectedCoin[0]?.icon || "",
    //             rank: selectedCoin[0]?.rank || "",
    //             name: selectedCoin[0]?.name || "",
    //             symbol: selectedCoin[0]?.symbol || "",
    //             currentCoinPrice: selectedCoin[0].price,                    //Current coin price
    //             coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalAmount],
    //             coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, quantityNumber],
    //             totalHoldingCoins: item.totalHoldingCoins <= 0 ? quantityNumber : item.totalHoldingCoins + quantityNumber,
    //             buyingPricesHistory: [...item.buyingPricesHistory, totalAmount],
    //             averageBuyingPrice: item.totalHoldingCoins <= 0 ? quantityNumber : (item.totalHoldingCoinAmountCash + totalAmount) / (item.totalHoldingCoins + quantityNumber),
    //             profitLoss: (currentCoinPrice - item.averageBuyingPrice) * (item.totalHoldingCoins + quantityNumber),
    //             totalHoldingCoinAmountCash: item.totalHoldingCoins * currentCoinPrice,
    //         };
    //         }
    //         return item;
    //     });
    //     // -----------------------------------------------------------------------------------------------------------------------
    //     if (existingID) {
    //         setPortfolioDataSetMy(updatedPortfolioData);
    //     }
    //     else {
    //         // Item doesn't exist, add a new object
    //         const newCoinData = {
    //             id: selectedCoin[0]?.id || "",
    //             icon: selectedCoin[0]?.icon || "",
    //             rank: selectedCoin[0]?.rank || "",
    //             name: selectedCoin[0]?.name || "",
    //             symbol: selectedCoin[0]?.symbol || "",
    //             currentCoinPrice : selectedCoin[0]?.price,
    //             coinsBoughtAmountHistoryCash: [totalAmount],
    //             coinsBoughtHistoryTokenQuantity: [quantityNumber],
    //             totalHoldingCoins: quantityNumber,
    //             totalHoldingCoinAmountCash: quantityNumber * currentCoinPrice,
    //             buyingPricesHistory: [totalAmount],
    //             averageBuyingPrice: quantityNumber,
    //             profitLoss: 0,
    //         };
    //         setPortfolioDataSetMy([...portfolioDataMy, newCoinData]);
    //     }
    // };

    // const addTransactionHandler = () => {
    //     const currentCoinPrice = selectedCoin[0]?.price || 0;
    //     const quantityNumber = Number(quantity);
    //
    //     const existingIndex = portfolioDataMy.findIndex((item: any) => item.id === selectedCoinId);
    //
    //     const updatedPortfolioData = portfolioDataMy.map((item: any, index: any) => {
    //         if (item.id === selectedCoinId) {
    //             // Update specific properties for the existing item
    //             return {
    //                 ...item,
    //                 coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalAmount],
    //                 coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, quantityNumber],
    //                 totalHoldingCoins: item.totalHoldingCoins <= 0 ? quantityNumber : item.totalHoldingCoins + quantityNumber,
    //                 totalHoldingCoinAmountCash: item.totalHoldingCoins * currentCoinPrice,
    //                 buyingPricesHistory: [...item.buyingPricesHistory, totalAmount],
    //                 averageBuyingPrice: item.totalHoldingCoins <= 0 ? quantityNumber : (item.totalHoldingCoinAmountCash + totalAmount) / (item.totalHoldingCoins + quantityNumber),
    //                 profitLoss: (currentCoinPrice - item.averageBuyingPrice) * (item.totalHoldingCoins + quantityNumber),
    //             };
    //         }
    //         // console.log('item' , item)
    //         return item;
    //     });
    //
    //     if (existingIndex !== -1) {
    //         // Item exists, update the existing array
    //         setPortfolioDataSetMy(updatedPortfolioData);
    //     } else {
    //         // Item doesn't exist, add a new object
    //         const newCoinData = {
    //             id: selectedCoin[0]?.id || "",
    //             icon: selectedCoin[0]?.icon || "",
    //             rank: selectedCoin[0]?.rank || "",
    //             name: selectedCoin[0]?.name || "",
    //             symbol: selectedCoin[0]?.symbol || "",
    //             currentCoinPrice,
    //             coinsBoughtAmountHistoryCash: [totalAmount],
    //             coinsBoughtHistoryTokenQuantity: [quantityNumber],
    //             totalHoldingCoins: quantityNumber,
    //             totalHoldingCoinAmountCash: quantityNumber * currentCoinPrice,
    //             buyingPricesHistory: [totalAmount],
    //             averageBuyingPrice: quantityNumber,
    //             profitLoss: 0,
    //         };
    //
    //         setPortfolioDataSetMy([...portfolioDataMy, newCoinData]);
    //     }
    //
    //     console.log('updatedPortfolioData', updatedPortfolioData);
    // };


    const calculateTotalPrice = () => {
        const pricePerCoin = selectedCoin[0].price
        const totalSpend = quantity * pricePerCoin
        setTotalAmount(totalSpend)

    }

    if (!selectedCoin || selectedCoin.length <= 0) {
        return null
    }
    console.log('portfolioDataMy', portfolioDataMy)
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
                                        onChange={(event: any) => setQuantity(event.target.value)}
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


const marketCapList = [
        {
            "id": "bitcoin",
            "icon": "https://static.coinstats.app/coins/1650455588819.png",
            "name": "Bitcoin",
            "symbol": "BTC",
            "rank": 1,
            "price": 69793.76049995291,
            "priceBtc": 1,
            "volume": 76269440667.019,
            "marketCap": 1371463516182.7502,
            "availableSupply": 19650231,
            "totalSupply": 21000000,
            "priceChange1h": 0.26,
            "priceChange1d": 2.3,
            "priceChange1w": 12.88,
            "redditUrl": "https://www.reddit.com/r/Bitcoin/",
            "websiteUrl": "https://bitcoin.org",
            "twitterUrl": "https://twitter.com/bitcoin",
            "explorers": [
                "https://mempool.space/",
                "https://blockchair.com/bitcoin/",
                "https://btc.com/",
                "https://btc.tokenview.io/",
                "https://www.oklink.com/btc",
                "https://3xpl.com/bitcoin",
                "https://blockchain.coinmarketcap.com/chain/bitcoin",
                "https://blockexplorer.one/btc/mainnet"
            ]
        },
        {
            "id": "ethereum",
            "icon": "https://static.coinstats.app/coins/1650455629727.png",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": 2,
            "price": 3938.1495032724324,
            "priceBtc": 0.05644908416053941,
            "volume": 26107138413.59229,
            "marketCap": 472978851888.424,
            "availableSupply": 120101802,
            "totalSupply": 120101802,
            "priceChange1h": 0,
            "priceChange1d": 0.78,
            "priceChange1w": 15.34,
            "redditUrl": "https://www.reddit.com/r/ethereum",
            "websiteUrl": "https://www.ethereum.org/",
            "twitterUrl": "https://twitter.com/ethereum",
            "contractAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/",
                "https://ethplorer.io/",
                "https://blockchair.com/ethereum",
                "https://eth.tokenview.io/",
                "https://www.oklink.com/eth",
                "https://3xpl.com/ethereum",
                "https://blockchain.coinmarketcap.com/chain/ethereum"
            ]
        },
        {
            "id": "tether",
            "icon": "https://static.coinstats.app/coins/1650455771843.png",
            "name": "Tether",
            "symbol": "USDT",
            "rank": 3,
            "price": 1.0049057,
            "priceBtc": 0.000014404228784501174,
            "volume": 53304062076.75042,
            "marketCap": 102318124668.913,
            "availableSupply": 101818633001,
            "totalSupply": 101818633001,
            "priceChange1h": 0.11,
            "priceChange1d": 0.26,
            "priceChange1w": 0.42,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://tether.to/",
            "twitterUrl": "https://twitter.com/Tether_to",
            "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7",
                "https://ethplorer.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7",
                "https://explorer.kava.io/token/0x919c1c267bc06a7039e03fcc2ef738525769109c",
                "https://avascan.info/blockchain/c/address/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7/token",
                "https://solscan.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                "https://nearblocks.io/token/usdt.tether-token.near",
                "https://www.omniexplorer.info/asset/31"
            ]
        },
        {
            "id": "binance-coin",
            "icon": "https://static.coinstats.app/coins/1666608145347.png",
            "name": "BNB",
            "symbol": "BNB",
            "rank": 4,
            "price": 532.2985782794635,
            "priceBtc": 0.00762992040268266,
            "volume": 7299428616.3515625,
            "marketCap": 81897409904.55188,
            "availableSupply": 153856150,
            "totalSupply": 153856150,
            "priceChange1h": -0.04,
            "priceChange1d": 9.88,
            "priceChange1w": 28.76,
            "redditUrl": "https://www.reddit.com/r/binance",
            "websiteUrl": "https://www.binance.com",
            "twitterUrl": "https://twitter.com/binance",
            "contractAddress": "BNB",
            "decimals": 18,
            "explorers": [
                "https://bscscan.com",
                "https://explorer.binance.org/",
                "https://binance.mintscan.io/",
                "https://etherscan.io/token/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
                "https://ethplorer.io/address/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
                "https://www.oklink.com/bsc",
                "https://3xpl.com/bnb",
                "https://explorer.energi.network/token/0xc3c19ee91cf3c1f7fbf3716a09d21dc35de0bd6d"
            ]
        },
        {
            "id": "solana",
            "icon": "https://static.coinstats.app/coins/1701234596791.png",
            "name": "Solana",
            "symbol": "SOL",
            "rank": 5,
            "price": 145.3350092169273,
            "priceBtc": 0.0020832190753403107,
            "volume": 3543992042.705611,
            "marketCap": 64418957299.67821,
            "availableSupply": 443244595,
            "totalSupply": 571533728,
            "priceChange1h": -0.18,
            "priceChange1d": -0.07,
            "priceChange1w": 12.63,
            "redditUrl": "https://www.reddit.com/r/solana",
            "websiteUrl": "https://solana.com/",
            "twitterUrl": "https://twitter.com/solana",
            "contractAddress": "0x7dff46370e9ea5f0bad3c4e29711ad50062ea7a4",
            "decimals": 18,
            "explorers": [
                "https://solscan.io/",
                "https://xray.helius.xyz/",
                "https://solana.fm/",
                "https://solanabeach.io/",
                "https://www.oklink.com/sol",
                "https://explorer.solana.com/"
            ]
        },
        {
            "id": "staked-ether",
            "icon": "https://static.coinstats.app/coins/staked-etheruqt.png",
            "name": "Lido Staked Ether",
            "symbol": "STETH",
            "rank": 6,
            "price": 3946.7,
            "priceBtc": 0.05653776423764532,
            "volume": 20810349,
            "marketCap": 38938498312,
            "availableSupply": 9867063,
            "totalSupply": 9867063,
            "priceChange1h": 0.2,
            "priceChange1d": 0.96,
            "priceChange1w": 15.83,
            "redditUrl": "https://www.reddit.com/r/lidofinance/",
            "websiteUrl": "https://www.lido.fi",
            "twitterUrl": "https://twitter.com/lidofinance",
            "contractAddress": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                "https://ethplorer.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                "https://ethereum.dex.guru/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
            ]
        },
        {
            "id": "ripple",
            "icon": "https://static.coinstats.app/coins/XRPdnqGJ.png",
            "name": "XRP",
            "symbol": "XRP",
            "rank": 7,
            "price": 0.6172251466007206,
            "priceBtc": 0.000008847250267546553,
            "volume": 875577673.1871791,
            "marketCap": 33784945260.968338,
            "availableSupply": 54736825690,
            "totalSupply": 99987824103,
            "priceChange1h": -0.45,
            "priceChange1d": -0.49,
            "priceChange1w": -1.14,
            "redditUrl": "https://www.reddit.com/r/ripple",
            "websiteUrl": "https://ripple.com/currency/",
            "twitterUrl": "https://twitter.com/Ripple",
            "contractAddress": "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
            "decimals": 18,
            "explorers": [
                "https://blockchair.com/ripple",
                "https://xrpcharts.ripple.com",
                "https://xrpscan.com/",
                "https://bithomp.com/explorer/"
            ]
        },
        {
            "id": "usd-coin",
            "icon": "https://static.coinstats.app/coins/1650455825065.png",
            "name": "USDC",
            "symbol": "USDC",
            "rank": 8,
            "price": 1,
            "priceBtc": 0.000014325326028744349,
            "volume": 5939038742,
            "marketCap": 30125665783,
            "availableSupply": 30126719082,
            "totalSupply": 30126746190,
            "priceChange1h": 0.1,
            "priceChange1d": 0.07,
            "priceChange1w": 0.01,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://www.circle.com/en/usdc",
            "twitterUrl": "https://twitter.com/circle",
            "contractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                "https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                "https://ethplorer.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                "https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                "https://binplorer.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                "https://explorer.kava.io/token/0xfa9343c3897324496a05fc75abed6bac29f8a40f",
                "https://ftmscan.com/token/0x04068da6c83afcfa0e13ba15a6696662335d5b75",
                "https://explorer.energi.network/token/0xffd7510ca0a3279c7a5f50018a26c21d5bc1dbcf"
            ]
        },
        {
            "id": "cardano",
            "icon": "https://static.coinstats.app/coins/CardanojXddT.png",
            "name": "Cardano",
            "symbol": "ADA",
            "rank": 9,
            "price": 0.7253041260425186,
            "priceBtc": 0.00001039644473094253,
            "volume": 420214128.9251924,
            "marketCap": 25512974634.80806,
            "availableSupply": 35175554252,
            "totalSupply": 45000000000,
            "priceChange1h": -0.69,
            "priceChange1d": -0.74,
            "priceChange1w": -0.32,
            "redditUrl": "https://www.reddit.com/r/cardano",
            "websiteUrl": "https://www.cardano.org/en/home/",
            "twitterUrl": "https://twitter.com/Cardano_CF",
            "contractAddress": "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
            "decimals": 18,
            "explorers": [
                "https://cardanoscan.io/",
                "https://cardanoexplorer.com/",
                "https://blockchair.com/cardano",
                "https://adaex.org/",
                "https://adastat.net/",
                "https://ada.tokenview.io/",
                "https://3xpl.com/cardano"
            ]
        },
        {
            "id": "dogecoin",
            "icon": "https://static.coinstats.app/coins/DogecoinIZai5.png",
            "name": "Dogecoin",
            "symbol": "DOGE",
            "rank": 10,
            "price": 0.1722662010979072,
            "priceBtc": 0.000002469248380670089,
            "volume": 2465351262.4864626,
            "marketCap": 24704464439.826817,
            "availableSupply": 143408656384,
            "totalSupply": 143408786384,
            "priceChange1h": -0.82,
            "priceChange1d": 4.21,
            "priceChange1w": 21.79,
            "redditUrl": "https://www.reddit.com/r/dogecoin/",
            "websiteUrl": "http://dogecoin.com/",
            "twitterUrl": "https://twitter.com/dogecoin",
            "contractAddress": "0xba2ae424d960c26247dd6c32edc70b295c744c43",
            "decimals": 18,
            "explorers": [
                "https://blockchair.com/dogecoin",
                "https://doge.tokenview.io/",
                "https://3xpl.com/dogecoin"
            ]
        },
        {
            "id": "shiba-inu",
            "icon": "https://static.coinstats.app/coins/1646234478930.png",
            "name": "Shiba Inu",
            "symbol": "SHIB",
            "rank": 11,
            "price": 0.00003383,
            "priceBtc": 4.846257795524213e-10,
            "volume": 2157554751,
            "marketCap": 19983837092,
            "availableSupply": 589266323499487,
            "totalSupply": 999982367670093,
            "priceChange1h": -0.9,
            "priceChange1d": -0.96,
            "priceChange1w": 50.17,
            "redditUrl": "https://www.reddit.com/r/SHIBArmy/",
            "websiteUrl": "https://shibatoken.com/",
            "twitterUrl": "https://twitter.com/Shibtoken",
            "contractAddress": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
                "https://ethplorer.io/address/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
                "https://bscscan.com/token/0x2859e4544c4bb03966803b044a93563bd2d0dd4d",
                "https://explorer.energi.network/token/0x7fDb933327aa6989ae706001c2EA54BA5E046e79",
                "https://ethereum.dex.guru/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
            ]
        },
        {
            "id": "avalanche-2",
            "icon": "https://static.coinstats.app/coins/1675667082696.png",
            "name": "Avalanche",
            "symbol": "AVAX",
            "rank": 12,
            "price": 42.89,
            "priceBtc": 0.0006144132333728451,
            "volume": 553383242,
            "marketCap": 16165978969,
            "availableSupply": 377298509,
            "totalSupply": 435988170,
            "priceChange1h": 0.16,
            "priceChange1d": -0.63,
            "priceChange1w": 0.57,
            "redditUrl": "https://www.reddit.com/r/Avax",
            "websiteUrl": "https://www.avax.network",
            "twitterUrl": "https://twitter.com/avax",
            "contractAddress": "0xd26649b3eb22eb275326a8cb052d2f4736c863cf",
            "decimals": 18,
            "explorers": [
                "https://snowtrace.io/",
                "https://explorer.avax.network/",
                "https://avascan.info/",
                "https://www.oklink.com/avax"
            ]
        },
        {
            "id": "polkadot",
            "icon": "https://static.coinstats.app/coins/1641284295533.png",
            "name": "Polkadot",
            "symbol": "DOT",
            "rank": 13,
            "price": 10.364832030199889,
            "priceBtc": 0.00014856857899793482,
            "volume": 300617556.38688815,
            "marketCap": 13880873581.085497,
            "availableSupply": 1339228030,
            "totalSupply": 1420174793,
            "priceChange1h": -0.76,
            "priceChange1d": -4.01,
            "priceChange1w": 12.86,
            "redditUrl": "https://www.reddit.com/r/dot/",
            "websiteUrl": "https://polkadot.network/",
            "twitterUrl": "https://twitter.com/Polkadot",
            "contractAddress": "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
            "decimals": 18,
            "explorers": [
                "https://polkadot.subscan.io/",
                "https://hubble.figment.io/polkadot/chains/polkadot",
                "https://3xpl.com/polkadot",
                "https://www.mintscan.io/secret/address/secret1h5d3555tz37crrgl5rppu2np2fhaugq3q8yvv9"
            ]
        },
        {
            "id": "tron",
            "icon": "https://static.coinstats.app/coins/TRONxJljY.png",
            "name": "TRON",
            "symbol": "TRX",
            "rank": 14,
            "price": 0.13565258324083274,
            "priceBtc": 0.000001944432043931629,
            "volume": 121135871.35896705,
            "marketCap": 11923705872.14397,
            "availableSupply": 87898848568,
            "totalSupply": 87899013576,
            "priceChange1h": 0.02,
            "priceChange1d": -0.12,
            "priceChange1w": -3.29,
            "redditUrl": "https://www.reddit.com/r/Tronix",
            "websiteUrl": "https://tron.network",
            "twitterUrl": "https://twitter.com/trondao",
            "contractAddress": "0x85eac5ac2f758618dfa09bdbe0cf174e7d574d5b",
            "decimals": 18,
            "explorers": [
                "https://tronscan.org/",
                "https://trx.tokenview.io",
                "https://www.oklink.com/trx",
                "https://www.trxplorer.io/"
            ]
        },
        {
            "id": "chainlink",
            "icon": "https://static.coinstats.app/coins/ChainLink0JkIR.png",
            "name": "Chainlink",
            "symbol": "LINK",
            "rank": 15,
            "price": 19.821602826441705,
            "priceBtc": 0.00028412108916048685,
            "volume": 326048893.27790314,
            "marketCap": 11637262444.577442,
            "availableSupply": 587099971,
            "totalSupply": 1000000000,
            "priceChange1h": -0.47,
            "priceChange1d": -0.9,
            "priceChange1w": -3.41,
            "redditUrl": "https://www.reddit.com/r/Chainlink/",
            "websiteUrl": "https://chain.link/",
            "twitterUrl": "https://twitter.com/chainlink",
            "contractAddress": "0x514910771af9ca656af840dff83e8264ecf986ca",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca",
                "https://ethplorer.io/address/0x514910771af9ca656af840dff83e8264ecf986ca",
                "https://arbiscan.io/token/0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
                "https://explorer.chain.link",
                "https://blockscout.com/poa/xdai/tokens/0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2/token-transfers",
                "https://bscscan.com/token/0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
                "https://polygonscan.com/token/0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
                "https://snowtrace.io/token/0x5947bb275c521040051d82396192181b413227a3",
                "https://nearblocks.io/token/514910771af9ca656af840dff83e8264ecf986ca.factory.bridge.near",
                "https://scan.meter.io/address/0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8"
            ]
        },
        {
            "id": "matic-network",
            "icon": "https://static.coinstats.app/coins/1686037797025.png",
            "name": "Polygon",
            "symbol": "MATIC",
            "rank": 16,
            "price": 1.218685424052841,
            "priceBtc": 0.000017468528305087685,
            "volume": 595061402.3928106,
            "marketCap": 11312988016.189302,
            "availableSupply": 9282943566,
            "totalSupply": 10000000000,
            "priceChange1h": 0.64,
            "priceChange1d": 7.25,
            "priceChange1w": 13.34,
            "redditUrl": "https://www.reddit.com/r/maticnetwork/",
            "websiteUrl": "https://polygon.technology/",
            "twitterUrl": "https://twitter.com/0xPolygon",
            "contractAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
                "https://ethplorer.io/address/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
                "https://polygonscan.com/token/0x0000000000000000000000000000000000001010",
                "https://bscscan.com/token/0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
                "https://moonriver.moonscan.io/token/0x682f81e57eaa716504090c3ecba8595fb54561d8",
                "https://moonbeam.moonscan.io/token/0x3405A1bd46B85c5C029483FbECf2F3E611026e45",
                "https://explorer.energi.network/token/0x98997e1651919faeacee7b96afbb3dfd96cb6036",
                "https://www.oklink.com/polygon",
                "https://3xpl.com/polygon",
                "https://binplorer.com/address/0xcc42724c6683b7e57334c4e856f4c9965ed682bd"
            ]
        },
        {
            "id": "wrapped-bitcoin",
            "icon": "https://static.coinstats.app/coins/wrapped-bitcoinoc1.png",
            "name": "Wrapped Bitcoin",
            "symbol": "WBTC",
            "rank": 17,
            "price": 69772,
            "priceBtc": 0.9995066476775507,
            "volume": 198975759,
            "marketCap": 10880828461,
            "availableSupply": 155957,
            "totalSupply": 155957,
            "priceChange1h": 0.16,
            "priceChange1d": 1.96,
            "priceChange1w": 12.85,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://www.wbtc.network/",
            "twitterUrl": "https://twitter.com/WrappedBTC",
            "contractAddress": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
                "https://ethplorer.io/address/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
                "https://blockscout.com/poa/xdai/tokens/0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252/token-transfers",
                "https://scan.tomochain.com/tokens/0x503b2ddc059b81788fd1239561596614b27faade",
                "https://polygonscan.com/token/0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
                "https://nearblocks.io/address/2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near#transaction",
                "https://cronos-explorer.crypto.org/token/0x062e66477faf219f25d27dced647bf57c3107d52",
                "https://snowtrace.io/token/0x50b7545627a5162f82a992c33b87adc75187b218",
                "https://explorer.mainnet.aurora.dev/token/0xF4eB217Ba2454613b15dBdea6e5f22276410e89e",
                "https://moonriver.moonscan.io/token/0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8"
            ]
        },
        {
            "id": "uniswap",
            "icon": "https://static.coinstats.app/coins/1687523907972.png",
            "name": "Uniswap",
            "symbol": "UNI",
            "rank": 18,
            "price": 13.999212660000188,
            "priceBtc": 0.0002006634671865509,
            "volume": 210395154.82841372,
            "marketCap": 10552139867.352547,
            "availableSupply": 753766667,
            "totalSupply": 1000000000,
            "priceChange1h": -0.42,
            "priceChange1d": -1.68,
            "priceChange1w": 9.75,
            "redditUrl": "https://www.reddit.com/r/Uniswap",
            "websiteUrl": "https://uniswap.org/",
            "twitterUrl": "https://twitter.com/Uniswap",
            "contractAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                "https://ethplorer.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                "https://blockscout.com/poa/xdai/tokens/0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74/token-transfers",
                "https://nearblocks.io/token/1f9840a85d5af5bf1d1762f925bdaddc4201f984.factory.bridge.near",
                "https://hecoinfo.com/token/0x22c54ce8321a4015740ee1109d9cbc25815c46e6",
                "https://bscscan.com/token/0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
                "https://polygonscan.com/token/0xb33eaad8d922b1083446dc23f610c2567fb5180f",
                "https://snowtrace.io/token/0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580",
                "https://arbiscan.io/token/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
                "https://avascan.info/blockchain/c/address/0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580/token"
            ]
        },
        {
            "id": "the-open-network",
            "icon": "https://static.coinstats.app/coins/1685602314954.png",
            "name": "Toncoin",
            "symbol": "TON",
            "rank": 19,
            "price": 2.85,
            "priceBtc": 0.000040827179181921396,
            "volume": 63864542,
            "marketCap": 9870908898,
            "availableSupply": 3468494010,
            "totalSupply": 5104012652,
            "priceChange1h": -0.02,
            "priceChange1d": -1.33,
            "priceChange1w": 7.91,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://ton.org/",
            "twitterUrl": "https://twitter.com/ton_blockchain",
            "contractAddress": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
            "decimals": 18,
            "explorers": [
                "https://tonscan.org",
                "https://tonmoon.org/explorer/",
                "https://youton.org/",
                "https://3xpl.com/ton",
                "https://tonapi.io/",
                "https://etherscan.io/token/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
                "https://ethplorer.io/address/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
                "https://bscscan.com/token/0x76a797a59ba2c17726896976b7b3747bfd1d220f",
                "https://binplorer.com/address/0x76a797a59ba2c17726896976b7b3747bfd1d220f"
            ]
        },
        {
            "id": "bitcoin-cash",
            "icon": "https://static.coinstats.app/coins/1646234235578.png",
            "name": "Bitcoin Cash",
            "symbol": "BCH",
            "rank": 20,
            "price": 430.0679541823165,
            "priceBtc": 0.006164555743812037,
            "volume": 896762198.9013705,
            "marketCap": 8457084617.1247425,
            "availableSupply": 19664531,
            "totalSupply": 21000000,
            "priceChange1h": -0.69,
            "priceChange1d": -0.25,
            "priceChange1w": -10.11,
            "redditUrl": "https://www.reddit.com/r/btc",
            "websiteUrl": "https://bch.info/",
            "contractAddress": "0xd4a161eaa78e77eb2af35d8e5bbdcf6af07a6835",
            "decimals": 18,
            "explorers": [
                "https://blockchair.com/bitcoin-cash",
                "https://bch.btc.com/",
                "https://explorer.bitcoin.com/bch",
                "https://bch.tokenview.io/",
                "https://hecoinfo.com/token/0xef3cebd77e0c52cb6f60875d9306397b5caca375",
                "https://www.oklink.com/bch",
                "https://3xpl.com/bitcoin-cash"
            ]
        },
        {
            "id": "internet-computer",
            "icon": "https://static.coinstats.app/coins/internet-computer4kw.png",
            "name": "Internet Computer",
            "symbol": "ICP",
            "rank": 21,
            "price": 14.58,
            "priceBtc": 0.0002088632534990926,
            "volume": 181209964,
            "marketCap": 6724103336,
            "availableSupply": 460190130,
            "totalSupply": 515312572,
            "priceChange1h": -0.17,
            "priceChange1d": -2.98,
            "priceChange1w": 11.61,
            "redditUrl": "https://www.reddit.com/r/dfinity/",
            "websiteUrl": "https://internetcomputer.org/",
            "twitterUrl": "https://twitter.com/dfinity",
            "contractAddress": "ryjl3-tyaaa-aaaaa-aaaba-cai",
            "decimals": 18,
            "explorers": [
                "https://dashboard.internetcomputer.org/canister/ryjl3-tyaaa-aaaaa-aaaba-cai"
            ]
        },
        {
            "id": "litecoin",
            "icon": "https://static.coinstats.app/coins/LitecoinGiD2Q.png",
            "name": "Litecoin",
            "symbol": "LTC",
            "rank": 22,
            "price": 88.05284850962629,
            "priceBtc": 0.0012621416865877867,
            "volume": 547621624.0829476,
            "marketCap": 6541921777.267786,
            "availableSupply": 74295402,
            "totalSupply": 84000000,
            "priceChange1h": -0.67,
            "priceChange1d": 0.24,
            "priceChange1w": -3.57,
            "redditUrl": "https://www.reddit.com/r/litecoin/",
            "websiteUrl": "https://litecoin.com",
            "twitterUrl": "https://twitter.com/LTCFoundation",
            "contractAddress": "0x21a5230038c8c849d2ffb0d3ce762228ed245237",
            "decimals": 18,
            "explorers": [
                "https://blockchair.com/litecoin",
                "https://chainz.cryptoid.info/ltc/",
                "https://bitupper.com/en/explorer/litecoin",
                "https://litecoinblockexplorer.net/",
                "https://ltc.tokenview.io/",
                "https://explorer.energi.network/token/0x21a5230038c8c849d2ffb0d3ce762228ed245237",
                "https://www.oklink.com/ltc",
                "https://3xpl.com/litecoin"
            ]
        },
        {
            "id": "near",
            "icon": "https://static.coinstats.app/coins/1700210628348.png",
            "name": "NEAR Protocol",
            "symbol": "NEAR",
            "rank": 23,
            "price": 5.9853231670323135,
            "priceBtc": 0.00008579308908995996,
            "volume": 373098978.98097426,
            "marketCap": 6219689748.045018,
            "availableSupply": 1039156880,
            "totalSupply": 1180737818,
            "priceChange1h": -2.47,
            "priceChange1d": -3.64,
            "priceChange1w": 41.78,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://near.org/",
            "twitterUrl": "https://twitter.com/nearprotocol",
            "contractAddress": "0x1fa4a73a3f0133f0025378af00236f3abdee5d63",
            "decimals": 18,
            "explorers": [
                "https://nearblocks.io",
                "https://explorer.near.org/"
            ]
        },
        {
            "id": "filecoin",
            "icon": "https://static.coinstats.app/coins/filecoinfjG.png",
            "name": "Filecoin",
            "symbol": "FIL",
            "rank": 24,
            "price": 10.83,
            "priceBtc": 0.0001551432808913013,
            "volume": 491070496,
            "marketCap": 5683757365,
            "availableSupply": 522258502,
            "totalSupply": 1960848632,
            "priceChange1h": -0.59,
            "priceChange1d": -3.88,
            "priceChange1w": 11.45,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://filecoin.io/",
            "twitterUrl": "https://twitter.com/Filecoin",
            "contractAddress": "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
            "decimals": 18,
            "explorers": [
                "https://filfox.info/en",
                "https://filscan.io/#/tipset/chain",
                "https://hecoinfo.com/token/0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
                "https://explorer.energi.network/token/0xf8a425e39af1976e1826f0c8843149afa5e9ec04"
            ]
        },
        {
            "id": "ethereum-classic",
            "icon": "https://static.coinstats.app/coins/ethereum-classicPfU.png",
            "name": "Ethereum Classic",
            "symbol": "ETC",
            "rank": 25,
            "price": 36.63168705461445,
            "priceBtc": 0.0005250753390063531,
            "volume": 258788187.94182435,
            "marketCap": 5346852475.182414,
            "availableSupply": 145962496,
            "totalSupply": 210700000,
            "priceChange1h": -0.29,
            "priceChange1d": -3.27,
            "priceChange1w": 10.1,
            "redditUrl": "https://www.reddit.com/r/EthereumClassic",
            "websiteUrl": "https://ethereumclassic.org",
            "twitterUrl": "https://twitter.com/eth_classic",
            "contractAddress": "0xebc564e6997f11fa7606fd5a84c7082ad53abe4b",
            "decimals": 18,
            "explorers": [
                "https://etc.tokenview.io/",
                "https://expedition.dev/?network=mainnet",
                "https://ethereumclassic.org/development/network-resources",
                "https://blockscout.com/etc/mainnet",
                "https://www.oklink.com/etc"
            ]
        },
        {
            "id": "cosmos",
            "icon": "https://static.coinstats.app/coins/CosmosyqCSZ.png",
            "name": "Cosmos Hub",
            "symbol": "ATOM",
            "rank": 26,
            "price": 13.259359812968395,
            "priceBtc": 0.00019005848238498146,
            "volume": 173654718.34805426,
            "marketCap": 5167014600.138411,
            "availableSupply": 389688090,
            "totalSupply": 389689672,
            "priceChange1h": -0.88,
            "priceChange1d": -4.17,
            "priceChange1w": 12.02,
            "redditUrl": "https://www.reddit.com/r/cosmosnetwork",
            "twitterUrl": "https://twitter.com/cosmos",
            "contractAddress": "0x0eb3a705fc54725037cc9e008bdede697f62f335",
            "decimals": 18,
            "explorers": [
                "https://www.mintscan.io/cosmos",
                "https://cosmos.bigdipper.live/",
                "https://hubble.figment.io/cosmos/chains/cosmoshub-4",
                "https://atomscan.com/",
                "https://bscscan.com/token/0x0eb3a705fc54725037cc9e008bdede697f62f335",
                "https://explorer.energi.network/token/0xd821db2439ecf24e5a623079c783e951646da449",
                "https://evm.explorer.canto.io/token/0xeceeefcee421d8062ef8d6b4d814efe4dc898265",
                "https://evm.evmos.org/token/0xc5e00d3b04563950941f7137b5afa3a534f0d6d6",
                "https://atom.tokenview.io/en",
                "https://binplorer.com/address/0x0eb3a705fc54725037cc9e008bdede697f62f335"
            ]
        },
        {
            "id": "aptos",
            "icon": "https://static.coinstats.app/coins/1669289234156.png",
            "name": "Aptos",
            "symbol": "APT",
            "rank": 27,
            "price": 13.04,
            "priceBtc": 0.00018680225141482629,
            "volume": 167344164,
            "marketCap": 4822941165,
            "availableSupply": 369028973,
            "totalSupply": 1085137670,
            "priceChange1h": 0.18,
            "priceChange1d": -3.41,
            "priceChange1w": 13.05,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://aptosfoundation.org",
            "twitterUrl": "https://twitter.com/Aptos_Network",
            "contractAddress": "0x1::aptos_coin::AptosCoin",
            "decimals": 18,
            "explorers": [
                "https://aptscan.ai/",
                "https://explorer.aptoslabs.com/",
                "https://aptoscan.com/",
                "https://apscan.io",
                "https://www.oklink.com/aptos",
                "https://tracemove.io/coin/0x1::aptos_coin::AptosCoin",
                "https://aptscan.ai/coins/0x1::aptos_coin::AptosCoin"
            ]
        },
        {
            "id": "immutable-x",
            "icon": "https://static.coinstats.app/coins/1674044832607.png",
            "name": "Immutable",
            "symbol": "IMX",
            "rank": 28,
            "price": 3.4,
            "priceBtc": 0.00004870610849773078,
            "volume": 127660446,
            "marketCap": 4713797095,
            "availableSupply": 1389224659,
            "totalSupply": 2000000000,
            "priceChange1h": 0,
            "priceChange1d": -2.59,
            "priceChange1w": 3.84,
            "redditUrl": "https://www.reddit.com/r/ImmutableX/",
            "websiteUrl": "https://imx.community/",
            "twitterUrl": "https://twitter.com/Immutable",
            "contractAddress": "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xf57e7e7c23978c3caec3c3548e3d615c346e79ff",
                "https://ethplorer.io/address/0xf57e7e7c23978c3caec3c3548e3d615c346e79ff"
            ]
        },
        {
            "id": "optimism",
            "icon": "https://static.coinstats.app/coins/1664959117211.png",
            "name": "Optimism",
            "symbol": "OP",
            "rank": 29,
            "price": 4.66,
            "priceBtc": 0.00006675601929394866,
            "volume": 334636669,
            "marketCap": 4683438416,
            "availableSupply": 1006141600,
            "totalSupply": 4294967296,
            "priceChange1h": -0.85,
            "priceChange1d": 2.96,
            "priceChange1w": 17.21,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://app.optimism.io/governance",
            "twitterUrl": "https://twitter.com/Optimism",
            "contractAddress": "0x4200000000000000000000000000000000000042",
            "decimals": 18,
            "explorers": [
                "https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000042",
                "https://www.oklink.com/optimism",
                "https://optimism.dex.guru/token/0x4200000000000000000000000000000000000042"
            ]
        },
        {
            "id": "blockstack",
            "icon": "https://static.coinstats.app/coins/1616753926594.png",
            "name": "Stacks",
            "symbol": "STX",
            "rank": 30,
            "price": 3.24,
            "priceBtc": 0.00004641405633313169,
            "volume": 193256139,
            "marketCap": 4680103966,
            "availableSupply": 1445324561,
            "totalSupply": 1818000000,
            "priceChange1h": 0.53,
            "priceChange1d": 14.69,
            "priceChange1w": 7.44,
            "redditUrl": "https://www.reddit.com/r/stacks",
            "twitterUrl": "https://twitter.com/Stacks",
            "contractAddress": "0x7ffabdada3ea65d32a6ccc7a1f20c0d071286535",
            "decimals": 18,
            "explorers": [
                "https://explorer.stacks.co/"
            ]
        },
        {
            "id": "bittensor",
            "icon": "https://static.coinstats.app/coins/bittensorEHd.png",
            "name": "Bittensor",
            "symbol": "TAO",
            "rank": 31,
            "price": 706.56,
            "priceBtc": 0.010121702358869606,
            "volume": 15795349,
            "marketCap": 4507775047,
            "availableSupply": 6391369,
            "totalSupply": 21000000,
            "priceChange1h": 0.44,
            "priceChange1d": -1.04,
            "priceChange1w": 11.29,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://bittensor.com/",
            "twitterUrl": "https://twitter.com/opentensor",
            "explorers": [
                "https://taostats.io/"
            ]
        },
        {
            "id": "render-token",
            "icon": "https://static.coinstats.app/coins/1666873363778.png",
            "name": "Render",
            "symbol": "RNDR",
            "rank": 32,
            "price": 11.75,
            "priceBtc": 0.00016832258083774608,
            "volume": 651127318,
            "marketCap": 4479724533,
            "availableSupply": 380639862,
            "totalSupply": 531044571,
            "priceChange1h": -1.8,
            "priceChange1d": 5.4,
            "priceChange1w": 52.91,
            "redditUrl": "https://www.reddit.com/r/Rendernetwork",
            "twitterUrl": "https://twitter.com/rendernetwork",
            "contractAddress": "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
                "https://ethplorer.io/address/0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
                "https://polygonscan.com/token/0x61299774020da444af134c82fa83e3810b309991",
                "https://polygon.dex.guru/token/0x61299774020da444af134c82fa83e3810b309991",
                "https://solscan.io/token/rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof"
            ]
        },
        {
            "id": "dai",
            "icon": "https://static.coinstats.app/coins/1579614462667.png",
            "name": "Dai",
            "symbol": "DAI",
            "rank": 33,
            "price": 1.003,
            "priceBtc": 0.00001436830200683058,
            "volume": 241230165,
            "marketCap": 4457477205,
            "availableSupply": 4448592119,
            "totalSupply": 4448592119,
            "priceChange1h": 0.09,
            "priceChange1d": 0.16,
            "priceChange1w": 0.26,
            "redditUrl": "https://www.reddit.com/r/MakerDAO",
            "websiteUrl": "https://makerdao.com/",
            "twitterUrl": "https://twitter.com/MakerDAO",
            "contractAddress": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f",
                "https://ethplorer.io/address/0x6b175474e89094c44da98b954eedeac495271d0f",
                "https://blockchair.com/ethereum/erc-20/token/0x6b175474e89094c44da98b954eedeac495271d0f",
                "https://arbiscan.io/token/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
                "https://polygonscan.com/token/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
                "https://bscscan.com/token/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
                "https://snowtrace.io/token/0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
                "https://avascan.info/blockchain/c/address/0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
                "https://explorer.mainnet.aurora.dev/token/0xe3520349f477a5f6eb06107066048508498a291b/token-transfers",
                "https://moonriver.moonscan.io/token/0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844"
            ]
        },
        {
            "id": "crypto-com-chain",
            "icon": "https://static.coinstats.app/coins/1709639524647.png",
            "name": "Cronos",
            "symbol": "CRO",
            "rank": 34,
            "price": 0.167268,
            "priceBtc": 0.0000023961686341760096,
            "volume": 57190222,
            "marketCap": 4451297593,
            "availableSupply": 26579894218,
            "totalSupply": 30000000000,
            "priceChange1h": -0.01,
            "priceChange1d": 3.27,
            "priceChange1w": 21.69,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://cronos-pos.org/",
            "twitterUrl": "https://twitter.com/cronos_chain",
            "contractAddress": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
                "https://ethplorer.io/address/0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
                "https://cronos.org/explorer",
                "https://crypto.org/explorer/",
                "https://cdoscan.com/",
                "https://www.mintscan.io/crypto-org"
            ]
        },
        {
            "id": "the-graph",
            "icon": "https://static.coinstats.app/coins/the-graphdCm.png",
            "name": "The Graph",
            "symbol": "GRT",
            "rank": 35,
            "price": 0.4656764520381914,
            "priceBtc": 0.000006674964779991692,
            "volume": 435930189.5084756,
            "marketCap": 4385691854.759991,
            "availableSupply": 9417894840,
            "totalSupply": 10788004319,
            "priceChange1h": 2.13,
            "priceChange1d": 19.82,
            "priceChange1w": 42.87,
            "redditUrl": "https://www.reddit.com/r/thegraph",
            "websiteUrl": "https://thegraph.com/",
            "twitterUrl": "https://twitter.com/graphprotocol",
            "contractAddress": "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xc944e90c64b2c07662a292be6244bdf05cda44a7",
                "https://ethplorer.io/address/0xc944e90c64b2c07662a292be6244bdf05cda44a7",
                "https://polygonscan.com/token/0x5fe2b58c013d7601147dcdd68c143a77499f5531",
                "https://arbiscan.io/token/0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
                "https://snowtrace.io/token/0x8a0cac13c7da965a312f08ea4229c37869e85cb9",
                "https://avascan.info/blockchain/c/address/0x8a0cac13c7da965a312f08ea4229c37869e85cb9/token",
                "https://explorer.energi.network/token/0x771513ba693d457df3678c951c448701f2eaaad5",
                "https://nearblocks.io/token/c944e90c64b2c07662a292be6244bdf05cda44a7.factory.bridge.near",
                "https://arbiscan.io/token/0x9623063377ad1b27544c965ccd7342f7ea7e88c7"
            ]
        },
        {
            "id": "hedera-hashgraph",
            "icon": "https://static.coinstats.app/coins/1594379268854.png",
            "name": "Hedera",
            "symbol": "HBAR",
            "rank": 36,
            "price": 0.12736947770687834,
            "priceBtc": 0.0000018257027470859182,
            "volume": 60029955.77776709,
            "marketCap": 4290480583.733141,
            "availableSupply": 33685311905,
            "totalSupply": 50000000000,
            "priceChange1h": -0.46,
            "priceChange1d": -1.66,
            "priceChange1w": 14.02,
            "redditUrl": "https://www.reddit.com/r/Hedera/",
            "websiteUrl": "https://www.hedera.com/",
            "twitterUrl": "https://twitter.com/hedera",
            "contractAddress": "0xc439e2053a97862d84fcf52629330c3e3a2d31f2",
            "decimals": 18,
            "explorers": [
                "https://hashscan.io/",
                "https://explorer.arkhia.io/mainnet/dashboard",
                "https://ledger.hashlog.io/",
                "https://app.dragonglass.me/hedera/home",
                "https://hederaexplorer.io/",
                "https://www.lworks.io/"
            ]
        },
        {
            "id": "okb",
            "icon": "https://static.coinstats.app/coins/OKBPuyWG.png",
            "name": "OKB",
            "symbol": "OKB",
            "rank": 37,
            "price": 69.7145170233872,
            "priceBtc": 0.0009992816766845596,
            "volume": 25954578.7874295,
            "marketCap": 4182871021.403232,
            "availableSupply": 60000000,
            "totalSupply": 235957685,
            "priceChange1h": 1.63,
            "priceChange1d": 15.11,
            "priceChange1w": 19.22,
            "redditUrl": "https://www.reddit.com/r/OKX/",
            "websiteUrl": "https://www.okx.com/okb",
            "twitterUrl": "https://twitter.com/okx",
            "contractAddress": "0x75231f58b43240c9718dd58b4967c5114342a86c",
            "decimals": 18,
            "explorers": [
                "https://www.oklink.com/en/okc/token/0xdf54b6c6195ea4d948d03bfd818d365cf175cfc2",
                "https://ethplorer.io/address/0x75231f58b43240c9718dd58b4967c5114342a86c",
                "https://blockchair.com/ethereum/erc-20/token/0x75231f58b43240c9718dd58b4967c5114342a86c",
                "https://etherscan.io/token/0x75231f58b43240c9718dd58b4967c5114342a86c"
            ]
        },
        {
            "id": "stellar",
            "icon": "https://static.coinstats.app/coins/1594216268358.png",
            "name": "Stellar",
            "symbol": "XLM",
            "rank": 38,
            "price": 0.14225259368482712,
            "priceBtc": 0.0000020390360056918145,
            "volume": 92487128.22796497,
            "marketCap": 4072649086.397336,
            "availableSupply": 28629700035,
            "totalSupply": 50001787029,
            "priceChange1h": -0.14,
            "priceChange1d": 1.03,
            "priceChange1w": 5.65,
            "redditUrl": "https://www.reddit.com/r/stellar",
            "websiteUrl": "https://www.stellar.org/",
            "twitterUrl": "https://twitter.com/stellarorg",
            "contractAddress": "0xc0cd560393a3fad67486b10bbb461ed2a42dd882",
            "decimals": 18,
            "explorers": [
                "https://dashboard.stellar.org/",
                "https://stellar.expert/explorer/public/",
                "https://steexp.com/",
                "https://blockchair.com/stellar",
                "https://explorer.energi.network/token/0xc0cd560393a3fad67486b10bbb461ed2a42dd882"
            ]
        },
        {
            "id": "pepe",
            "icon": "https://static.coinstats.app/coins/1701674792194.png",
            "name": "Pepe",
            "symbol": "PEPE",
            "rank": 39,
            "price": 0.00000854,
            "priceBtc": 1.2233828428547673e-10,
            "volume": 1261383089,
            "marketCap": 3594208191,
            "availableSupply": 420690000000000,
            "totalSupply": 420690000000000,
            "priceChange1h": -1.82,
            "priceChange1d": -1.2,
            "priceChange1w": 59.51,
            "websiteUrl": "https://www.pepe.vip/",
            "twitterUrl": "https://twitter.com/pepecoineth",
            "contractAddress": "0x6982508145454ce325ddbe47a25d4ec3d2311933",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x6982508145454Ce325dDbE47a25d4ec3d2311933",
                "https://ethplorer.io/address/0x6982508145454Ce325dDbE47a25d4ec3d2311933",
                "https://bscscan.com/token/0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00",
                "https://arbiscan.io/token/0x25d887ce7a35172c62febfd67a1856f20faebb00",
                "https://ethereum.dex.guru/token/0x6982508145454ce325ddbe47a25d4ec3d2311933",
                "https://binplorer.com/address/0x25d887ce7a35172c62febfd67a1856f20faebb00"
            ]
        },
        {
            "id": "injective-protocol",
            "icon": "https://static.coinstats.app/coins/1674463669754.png",
            "name": "Injective",
            "symbol": "INJ",
            "rank": 40,
            "price": 40.53,
            "priceBtc": 0.0005806054639450085,
            "volume": 158239067,
            "marketCap": 3588438361,
            "availableSupply": 88392222,
            "totalSupply": 100000000,
            "priceChange1h": -0.25,
            "priceChange1d": -2.03,
            "priceChange1w": -0.89,
            "redditUrl": "https://www.reddit.com/r/injective/",
            "websiteUrl": "https://injective.com",
            "twitterUrl": "https://twitter.com/injective",
            "contractAddress": "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
            "decimals": 18,
            "explorers": [
                "https://explorer.injective.network/",
                "https://ethplorer.io/address/0xe28b3b32b6c345a34ff64674606124dd5aceca30",
                "https://etherscan.io/token/0xe28b3b32b6c345a34ff64674606124dd5aceca30",
                "https://bscscan.com/token/0xa2b726b1145a4773f68593cf171187d8ebe4d495",
                "https://atomscan.com/injective",
                "https://binplorer.com/address/0xa2b726b1145a4773f68593cf171187d8ebe4d495",
                "https://www.mintscan.io/secret/address/secret14706vxakdzkz9a36872cs62vpl5qd84kpwvpew",
                "https://www.mintscan.io/injective"
            ]
        },
        {
            "id": "vechain",
            "icon": "https://static.coinstats.app/coins/1694669539609.png",
            "name": "VeChain",
            "symbol": "VET",
            "rank": 41,
            "price": 0.04809946441283746,
            "priceBtc": 6.894534380832781e-7,
            "volume": 84979948.97124869,
            "marketCap": 3497529314.7536535,
            "availableSupply": 72714516834,
            "totalSupply": 85985041177,
            "priceChange1h": -0.61,
            "priceChange1d": -0.9,
            "priceChange1w": -1.12,
            "redditUrl": "https://www.reddit.com/r/Vechain",
            "websiteUrl": "https://www.vechain.org",
            "twitterUrl": "https://twitter.com/vechainofficial",
            "contractAddress": "0x46209D5e5a49C1D403F4Ee3a0A88c3a27E29e58D",
            "decimals": 18,
            "explorers": [
                "https://vechainstats.com/",
                "https://explore.vechain.org",
                "https://explore.veforge.com/",
                "https://www.vescan.io/",
                "https://explorer.vtho.net/"
            ]
        },
        {
            "id": "kaspa",
            "icon": "https://static.coinstats.app/coins/1653915370818.png",
            "name": "Kaspa",
            "symbol": "KAS",
            "rank": 42,
            "price": 0.149967,
            "priceBtc": 0.0000021483261685527037,
            "volume": 82981902,
            "marketCap": 3441301655,
            "availableSupply": 22964258298,
            "totalSupply": 22964354482,
            "priceChange1h": 0.31,
            "priceChange1d": 2.93,
            "priceChange1w": -10.01,
            "redditUrl": "https://www.reddit.com/r/Kaspa",
            "websiteUrl": "https://kaspa.org/",
            "twitterUrl": "https://twitter.com/KaspaCurrency",
            "explorers": [
                "https://kas.fyi/",
                "https://explorer.kaspa.org/"
            ]
        },
        {
            "id": "mantle",
            "icon": "https://static.coinstats.app/coins/mantleMpO.png",
            "name": "Mantle",
            "symbol": "MNT",
            "rank": 43,
            "price": 1.062,
            "priceBtc": 0.000015213496242526499,
            "volume": 216188555,
            "marketCap": 3433772474,
            "availableSupply": 3231662126,
            "totalSupply": 6219316795,
            "priceChange1h": 0.53,
            "priceChange1d": 1.95,
            "priceChange1w": 18.62,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://www.mantle.xyz/",
            "twitterUrl": "https://twitter.com/0xMantle",
            "contractAddress": "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
                "https://ethplorer.io/address/0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
                "https://explorer.mantle.xyz/token/0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000"
            ]
        },
        {
            "id": "first-digital-usd",
            "icon": "https://static.coinstats.app/coins/first-digital-usdWZz.png",
            "name": "First Digital USD",
            "symbol": "FDUSD",
            "rank": 44,
            "price": 1.004,
            "priceBtc": 0.000014382627332859326,
            "volume": 9425190570,
            "marketCap": 3300420858,
            "availableSupply": 3291239553,
            "totalSupply": 3291239553,
            "priceChange1h": 0.18,
            "priceChange1d": 0.01,
            "priceChange1w": 0.35,
            "websiteUrl": "https://firstdigitallabs.com/",
            "twitterUrl": "https://twitter.com/FDLabsHQ",
            "contractAddress": "0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409",
                "https://ethplorer.io/address/0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
                "https://bscscan.com/token/0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
                "https://binplorer.com/address/0xc5f0f7b66764f6ec8c8dff7ba683102295e16409"
            ]
        },
        {
            "id": "arbitrum",
            "icon": "https://static.coinstats.app/coins/1687522892460.png",
            "name": "Arbitrum",
            "symbol": "ARB",
            "rank": 45,
            "price": 2.1,
            "priceBtc": 0.00003008318466036313,
            "volume": 521287817,
            "marketCap": 3041668715,
            "availableSupply": 1451000000,
            "totalSupply": 10000000000,
            "priceChange1h": 0.13,
            "priceChange1d": -1.33,
            "priceChange1w": 1.08,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://arbitrum.io/",
            "twitterUrl": "https://twitter.com/arbitrum",
            "contractAddress": "0x912ce59144191c1204e64559fe8253a0e49e6548",
            "decimals": 18,
            "explorers": [
                "https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548",
                "https://etherscan.io/token/0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
                "https://ethplorer.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1",
                "https://nova.arbiscan.io/token/0xf823c3cd3cebe0a1fa952ba88dc9eef8e0bf46ad",
                "https://www.oklink.com/arbitrum",
                "https://3xpl.com/arbitrum-one",
                "https://nova.dex.guru/token/0xf823c3cd3cebe0a1fa952ba88dc9eef8e0bf46ad",
                "https://arbitrum.dex.guru/token/0x912ce59144191c1204e64559fe8253a0e49e6548"
            ]
        },
        {
            "id": "lido-dao",
            "icon": "https://static.coinstats.app/coins/lido-daokvE.png",
            "name": "Lido DAO",
            "symbol": "LDO",
            "rank": 46,
            "price": 3.34,
            "priceBtc": 0.00004784658893600612,
            "volume": 82649158,
            "marketCap": 2980727812,
            "availableSupply": 891688737,
            "totalSupply": 1000000000,
            "priceChange1h": -0.34,
            "priceChange1d": -1.73,
            "priceChange1w": 0.39,
            "redditUrl": "https://www.reddit.com/r/lidofinance",
            "websiteUrl": "https://stake.lido.fi/",
            "twitterUrl": "https://twitter.com/lidofinance",
            "contractAddress": "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
            "decimals": 18,
            "explorers": [
                "https://etherscan.io/token/0x5a98fcbea516cf06857215779fd812ca3bef1b32",
                "https://ethplorer.io/address/0x5a98fcbea516cf06857215779fd812ca3bef1b32",
                "https://polygonscan.com/token/0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
                "https://arbiscan.io/token/0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60",
                "https://optimistic.etherscan.io/token/0xfdb794692724153d1488ccdbe0c56c252596735f",
                "https://ethereum.dex.guru/token/0x5a98fcbea516cf06857215779fd812ca3bef1b32",
                "https://polygon.dex.guru/token/0xc3c7d422809852031b44ab29eec9f1eff2a58756",
                "https://optimism.dex.guru/token/0xfdb794692724153d1488ccdbe0c56c252596735f"
            ]
        },
        {
            "id": "theta-token",
            "icon": "https://static.coinstats.app/coins/theta-tokenrot.png",
            "name": "Theta Network",
            "symbol": "THETA",
            "rank": 47,
            "price": 2.975959922514516,
            "priceBtc": 0.00004265714442400464,
            "volume": 89156715.95957932,
            "marketCap": 2975959922.514516,
            "availableSupply": 1000000000,
            "totalSupply": 1000000000,
            "priceChange1h": -0.92,
            "priceChange1d": -4.98,
            "priceChange1w": 27.98,
            "redditUrl": "https://www.reddit.com/r/theta_network/",
            "websiteUrl": "https://www.thetatoken.org/",
            "twitterUrl": "https://twitter.com/Theta_Network",
            "contractAddress": "0x65622f8e8b569ade3f684b5f2a189f78f98a75b0",
            "decimals": 18,
            "explorers": [
                "https://explorer.thetatoken.org",
                "https://explorer.energi.network/token/0x65622f8e8b569ade3f684b5f2a189f78f98a75b0",
                "https://etherscan.io/token/0x3883f5e181fccaF8410FA61e12b59BAd963fb645",
                "https://ethplorer.io/address/0x3883f5e181fccaf8410fa61e12b59bad963fb645"
            ]
        },
        {
            "id": "fetch-ai",
            "icon": "https://static.coinstats.app/coins/1622462709278.png",
            "name": "Fetch.ai",
            "symbol": "FET",
            "rank": 48,
            "price": 2.81,
            "priceBtc": 0.000040254166140771616,
            "volume": 628055733,
            "marketCap": 2932418363,
            "availableSupply": 1043462805,
            "totalSupply": 1152997575,
            "priceChange1h": -0.66,
            "priceChange1d": -2.99,
            "priceChange1w": 53.56,
            "redditUrl": "https://www.reddit.com/r/FetchAI_Community/",
            "websiteUrl": "https://fetch.ai/",
            "twitterUrl": "https://twitter.com/fetch_ai",
            "contractAddress": "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
            "decimals": 18,
            "explorers": [
                "https://explore.fetch.ai/",
                "https://www.mintscan.io/fetchai/",
                "https://etherscan.io/token/0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
                "https://bscscan.com/token/0x031b41e504677879370e9dbcf937283a8691fa7f",
                "https://ethplorer.io/address/0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
                "https://atomscan.com/fetchai",
                "https://binplorer.com/address/0x031b41e504677879370e9dbcf937283a8691fa7f"
            ]
        },
        {
            "id": "celestia",
            "icon": "https://static.coinstats.app/coins/celestiaq2H.png",
            "name": "Celestia",
            "symbol": "TIA",
            "rank": 49,
            "price": 16.44,
            "priceBtc": 0.0002355083599125571,
            "volume": 135575776,
            "marketCap": 2790140171,
            "availableSupply": 169536678,
            "totalSupply": 1028493151,
            "priceChange1h": -0.08,
            "priceChange1d": -4.22,
            "priceChange1w": 0.39,
            "redditUrl": "https://www.reddit.com",
            "websiteUrl": "https://celestia.org/",
            "twitterUrl": "https://twitter.com/CelestiaOrg",
            "contractAddress": "ibc/D79E7D83AB399BFFF93433E54FAA480C191248FC556924A2A8351AE2638B3877",
            "decimals": 18,
            "explorers": [
                "https://celenium.io/",
                "https://celestiascan.com",
                "https://celestia.explorers.guru/",
                "https://explorer.modular.cloud/",
                "https://www.mintscan.io/celestia",
                "https://www.mintscan.io/secret/address/secret1s9h6mrp4k9gll4zfv5h78ll68hdq8ml7jrnn20"
            ]
        },
        {
            "id": "arweave",
            "icon": "https://static.coinstats.app/coins/1673529124946.png",
            "name": "Arweave",
            "symbol": "AR",
            "rank": 50,
            "price": 41.68,
            "priceBtc": 0.0005970795888780644,
            "volume": 142152088,
            "marketCap": 2735162250,
            "availableSupply": 65454186,
            "totalSupply": 65454186,
            "priceChange1h": -0.49,
            "priceChange1d": -3.4,
            "priceChange1w": 38.07,
            "websiteUrl": "https://arweave.org/",
            "twitterUrl": "https://twitter.com/arweaveteam",
            "explorers": [
                "https://viewblock.io/arweave"
            ]
        }
]