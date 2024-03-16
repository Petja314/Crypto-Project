import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import tokenList from "./tokenList.json"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import {actionsProfile} from "../redux/ProfileReducer";
import CloseIcon from "@mui/icons-material/Close";
import {TypingEffects} from "../../utils/TypingEffects";
import WalletIcon from '@mui/icons-material/Wallet';
import axios from "axios";



const PurchaseCrypto = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedTokenOne, setSelectedTokenOne] = useState<any>(tokenList[0]);
    const [selectedTokenTwo, setSelectedTokenTwo] = useState<any>(tokenList[1]);
    const [tokenOnePrice, setTokenOnePrice] = useState(0)
    const [tokenTwoPrice, setTokenTwoPrice] = useState(0)
    const [ratio, setRatio] = useState(0)
    const [tabValue, setTabValue] = useState(0)




    // const response = await axios.get("https://deep-index.moralis.io/api/v2.2/erc20/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/price", {
    const fetchMoralisDataApi = async (addressOne: any, addressTwo: any) => {
        try {
            console.log('in')
            const response = await axios.get(`http://localhost:3001/tokenPrice?addressOne=${addressOne}&addressTwo=${addressTwo}`, {
                headers: {
                    // "X-API-Key": apiKey
                }
            })
            setTokenOnePrice(response.data.tokenOne)
            setTokenTwoPrice(response.data.tokenTwo)
            setRatio(response.data.ratio)
            console.log('response : ', response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMoralisDataApi(selectedTokenOne.address, selectedTokenTwo.address)
    }, [selectedTokenOne, selectedTokenTwo])


    const handleTokenChange = (selectedToken: any) => {
        if (tabValue === 0) {
            // console.log('selected one')
            setSelectedTokenOne(selectedToken)
        }
        if (tabValue === 1) {
            // console.log('selected two')
            setSelectedTokenTwo(selectedToken)
        }
        setIsDialogOpen(false)
    };

    const swapDialogsAround = () => {
        setSelectedTokenOne(selectedTokenTwo)
        setTokenOnePrice(tokenTwoPrice)
        //Swap dialogs around
        setSelectedTokenTwo(selectedTokenOne)
        setTokenTwoPrice(tokenOnePrice)

    }

    // console.log('tabValue' , tabValue)
    // console.log('selectedTokenOne', selectedTokenOne)
    // console.log('selectedTokenTwo', selectedTokenTwo)
    // console.log('tokenList' , tokenList)
    // console.log('tokenOnePrice' , tokenOnePrice)
    // console.log('tokenTwoPrice' , tokenTwoPrice)
    return (
        <Container sx={{marginTop: "50px", marginBottom: "50px"}}>
            <Button sx={{
                borderRadius : "20px",
                padding: "8px 12px 8px 8px",
                fontSize: "13px",
                textTransform: "lowercase",
                float: "right",
                fontWeight: "bold"
            }}>
                <WalletIcon sx={{width: "18px", height: "18px", marginRight: "8px"}}/>
                Connect wallet
            </Button>

            <Typography variant='h4' sx={{color: "#fff", width: "300px", height: "100px", textAlign: "center", margin: "0 auto", marginBottom: "50px"}}>
                <TypingEffects
                    speed={60}
                    text={"Swap anytime, anywhere."}
                />
            </Typography>


            <Paper sx={{borderRadius: "24px", width: "600px", margin: "0 auto", paddingBottom: "30px"}}>
                <Typography variant='h5' sx={{padding: "20px"}}>Dex Exchange</Typography>


                <Box sx={{position: "relative",}}>
                    <Box sx={{borderRadius: "24px", padding: "20px", backgroundColor: "rgb(42,40,40)"}}>
                        <Box component='span' sx={{color: "#9d9191"}}>You pay</Box>

                        {/*YOU PAY*/}
                        <Box sx={{display: "flex",}}>
                            <input
                                onChange={(event: any) => setTokenOnePrice(event.target.value)}
                                value={tokenOnePrice.toFixed(2)}
                                style={{width: "100%", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "30px", color: "#fff"}}
                                type={'number'}/>

                            <Box
                                sx={{
                                    backgroundColor: "rgb(81,82,89)",
                                    height: "50px",
                                    borderRadius: "24px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "4px 8px 4px 4px"
                                }}
                                onClick={() => {
                                    setIsDialogOpen(true)
                                    setTabValue(0)
                                }
                                }
                                defaultValue={0}
                            >
                                <Avatar src={selectedTokenOne.img}/>
                                <Box sx={{fontWeight: "bold", marginLeft: "5px"}}>{selectedTokenOne.ticker}</Box>
                                <KeyboardArrowDownIcon/>
                            </Box>
                        </Box>
                    </Box>


                    {/*SWAP BUTTON*/}
                    <IconButton
                        sx={{color: "#e0f64b", position: "absolute", left: "45%", top: "30%"}}
                        onClick={swapDialogsAround}
                    >
                        <SwapVerticalCircleIcon sx={{width: "50px", height: "50px",}}/>
                    </IconButton>
                    {/*SWAP BUTTON*/}


                    {/*YOU RECEIVE*/}
                    <Box sx={{borderRadius: "24px", padding: "20px", backgroundColor: "rgb(42,40,40)", marginTop: "10px"}}>
                        <Box component='span' sx={{color: "#9d9191"}}>You receive</Box>

                        <Box sx={{display: "flex",}}>
                            <input
                                onChange={(event: any) => setTokenTwoPrice(event.target.value)}
                                value={tokenTwoPrice.toFixed(2)}
                                style={{width: "100%", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "30px", color: "#fff"}}
                                type={'number'}/>


                            <Box sx={{
                                backgroundColor: "rgb(81,82,89)",
                                height: "50px",
                                borderRadius: "24px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "4px 8px 4px 4px"
                            }}
                                 onClick={() => {
                                     setIsDialogOpen(true)
                                     setTabValue(1)
                                 }
                                 }
                                 defaultValue={1}
                            >
                                <Avatar src={selectedTokenTwo.img}/>
                                <Box sx={{fontWeight: "bold", marginLeft: "5px"}}>{selectedTokenTwo.ticker}</Box>
                                <KeyboardArrowDownIcon/>
                            </Box>
                        </Box>
                    </Box>
                    {/*SWAP BUTTON */}
                    <Button sx={{width: "100%", marginTop: "10px", fontWeight: "bold", paddingTop: "10px", paddingBottom: "10px", fontSize: "22px"}}>Swap</Button>
                </Box>
            </Paper>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} sx={{height: "700px", marginTop: "100px"}}>
                <DialogTitle>Select a token</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setIsDialogOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                {tokenList.map((item: any, index: any) => (
                    <MenuItem
                        key={index}
                        sx={{display: "flex", gap: 2, width: "400px", marginTop: "10px"}}
                        onClick={() => handleTokenChange(item)}
                    >
                        <Avatar src={item.img}/>
                        <Box> {item.ticker}</Box>
                    </MenuItem>
                ))}
            </Dialog>


        </Container>
    );
};

export default PurchaseCrypto;
