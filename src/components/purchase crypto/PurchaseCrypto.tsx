import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import tokenList from "./tokenList.json"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CloseIcon from "@mui/icons-material/Close";
import {TypingEffects} from "../../utils/TypingEffects";
import WalletIcon from '@mui/icons-material/Wallet';
import axios from "axios";
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount, useSendTransaction} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {parseEther} from "viem";






type txType = {
    to:any,
    data:any,
    value:any
}

const PurchaseCrypto = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedTokenOne, setSelectedTokenOne] = useState<any>(tokenList[0]);
    const [selectedTokenTwo, setSelectedTokenTwo] = useState<any>(tokenList[1]);
    const [tokenOnePrice, setTokenOnePrice] = useState<any>(null)
    const [tokenTwoPrice, setTokenTwoPrice] = useState<any>(null)
    const [prices, setPrices] = useState<any>([])
    const [tabValue, setTabValue] = useState(0)
    const [transactionDetails, setTransactionDetails] = useState<any>([])
    const [txDetails, setTxDetails] = useState<any>({
        to:null,
        data:null,
        value:null
    })
    const {open, close} = useWeb3Modal()
    const {address, isConnecting, isDisconnected} = useAccount()
    const {  sendTransaction } = useSendTransaction();
    console.log('price two' , tokenTwoPrice)
    const fetchMoralisDataApi = async (addressOne: any, addressTwo: any) => {
        try {
            const response = await axios.get(`http://localhost:3001/tokenPrice?addressOne=${addressOne}&addressTwo=${addressTwo}`,{
                headers : {
                    apiKey : apiKey
                }
            })
            setPrices(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const changeAmount = (event : any) => {
        console.log('changeAmount')
        setTokenOnePrice(event.target.value)
        if(event.target.value && prices) {
            console.log('in')
            setTokenTwoPrice((event.target.value * prices.ratio).toFixed(2))
        }
        else {
            setTokenTwoPrice(null)
        }
    }
    const dexApproveAllowanceApi = async () => {
            // Make a GET request to your backend API endpoint
            const allowance = await axios.get(`http://localhost:3001/dexApproveAllowance?tokenAddress=${selectedTokenOne.address}&walletAddress=${address}`);
            console.log('Response from backend:', allowance.data.allowance);
            if (allowance.data.allowance === "0") {
                try{
                    setTimeout(async () => {
                        const approve =  await axios.get(`http://localhost:3001/approveTransactionDex?tokenAddress=${selectedTokenOne.address}`)
                        setTransactionDetails(approve.data)
                        setTxDetails(approve.data)
                        return;
                        console.log('approve transaction : ' , approve.data)
                    },1000) // 1RPS by api call
                }
                catch(error) {
                    console.error(error)
                }
            }
            setTimeout(() => {
                console.log('dex swap api called')
                dexSwapApiCall()
            },1000)
    }
    const dexSwapApiCall = async () => {
        const response = await axios
            .get(`http://localhost:3001/swapCoinDex?src=${selectedTokenOne}&dst=${selectedTokenTwo}&amount=${tokenOnePrice}from=${address}`)
        console.log('Swap response : ' , response.data);
    }

    useEffect(() => {
        fetchMoralisDataApi(selectedTokenOne.address, selectedTokenTwo.address)
    }, [selectedTokenOne, selectedTokenTwo])

    useEffect(() => {
        if(txDetails.to ) {
            sendTransaction({
                // from: address,
                // from: "0x3c1c2f918c38BdE38c1018F4Ade2a1159FF1f2d8" ,
                to: txDetails.to,
                data: txDetails.data,
                value: txDetails.value,
            })
        }
    },[txDetails])



    const handleTokenChange = (selectedToken: any) => {
        setPrices(null)
        setTokenOnePrice(null)
        setTokenTwoPrice(null)
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
        setPrices(null)
        setSelectedTokenOne(null)
        setTokenOnePrice(null)

        setSelectedTokenOne(selectedTokenTwo)
        setTokenOnePrice(tokenTwoPrice)
        //Swap dialogs around
        setSelectedTokenTwo(selectedTokenOne)
        setTokenTwoPrice(tokenOnePrice)
        fetchMoralisDataApi(selectedTokenTwo.address , selectedTokenOne.address)
    }

    console.log('token one price,' , tokenOnePrice)
    return (
        // <QueryClientProvider client={queryClient}>
        <Container sx={{marginTop: "50px", marginBottom: "50px"}}>
            <button onClick={() => dexSwapApiCall()}>SWAP</button>
            <Box sx={{float: "right"}}>
                {/*<QueryClientProvider client={queryClient}>*/}
                    <w3m-button/>
                {/*</QueryClientProvider>*/}
            </Box>

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
                                // onChange={(event: any) => setTokenOnePrice(event.target.value)}
                                onChange={changeAmount}
                                // value={tokenOnePrice?.toFixed(2)}
                                value={tokenOnePrice === null ? 0 : tokenOnePrice}
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
                                // onChange={(event: any) => setTokenTwoPrice(event.target.value)}
                                // value={tokenTwoPrice?.toFixed(2)}
                                value={tokenTwoPrice === null ? 0 : tokenTwoPrice}
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
                    <Button sx={{width: "100%", marginTop: "10px", fontWeight: "bold", paddingTop: "10px", paddingBottom: "10px", fontSize: "22px"}}
                    onClick={() => dexApproveAllowanceApi()}
                    >Swap</Button>
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
        // </QueryClientProvider>

    );
};

export default PurchaseCrypto;
