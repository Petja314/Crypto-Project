import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import tokenList from "./tokenList.json"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CloseIcon from "@mui/icons-material/Close";
import {TypingEffects} from "../../utils/TypingEffects";
import axios from "axios";
import {BaseError, useAccount, useSendTransaction, useWaitForTransactionReceipt} from "wagmi";
import {Alert} from "@mui/lab";


const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjhhNGNlNzY1LTU3YTctNDRhMy1hZTkyLTRjZmVmOWVhYTE2MiIsIm9yZ0lkIjoiMzgzNTAwIiwidXNlcklkIjoiMzk0MDU2IiwidHlwZUlkIjoiMmIwNjFlMDItNDdiOS00NmE0LTgzZjgtMDAzZmMwMWNiMjE4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3ODY0MzksImV4cCI6NDg2NjU0NjQzOX0.BVCxqr5Tvzzm4vxQOtMEaWFQk5uRdJyUUvJRcrt9Tb8"


type txType = {
    to: any,
    data: any,
    value: any
}

const PurchaseCrypto = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedTokenOne, setSelectedTokenOne] = useState<any>(tokenList[2]);
    const [selectedTokenTwo, setSelectedTokenTwo] = useState<any>(tokenList[1]);
    const [tokenOnePrice, setTokenOnePrice] = useState<any>(null)
    const [tokenTwoPrice, setTokenTwoPrice] = useState<any>(null)
    const [prices, setPrices] = useState<any>([])
    const [tabValue, setTabValue] = useState(0)
    const [txDetails, setTxDetails] = useState<any>({
        to: null,
        data: null,
        value: null
    })
    const {address, isConnecting, isDisconnected} = useAccount()
    const {
        error,
        data: hash,
        isPending,
        sendTransaction
    } = useSendTransaction()
    const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash})
    const [showAlertTime, setShowAlertTime] = useState(true)
    const fetchMoralisDataApi = async (addressOne: any, addressTwo: any) => {
        try {
            const response = await axios.get(`http://localhost:3001/tokenPrice?addressOne=${addressOne}&addressTwo=${addressTwo}`, {
                headers: {
                    apiKey: apiKey
                }
            })
            setPrices(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const changeAmount = (event: any) => {
        setTokenOnePrice(event.target.value)
        if (event.target.value && prices) {
            setTokenTwoPrice((event.target.value * prices.ratio).toFixed(2))
        } else {
            setTokenTwoPrice(null)
        }
    }


    const dexSwapApiCall = async () => {
        debugger
        const response = await axios.get(`http://localhost:3001/swapCoinDex`, {
            params: {
                selectedTokenOne: selectedTokenOne.address,
                selectedTokenTwo: selectedTokenTwo.address,
                tokenOnePrice: tokenOnePrice.padEnd(selectedTokenOne.decimals + tokenOnePrice?.length, '0'),
                address: address
            }
        });
        // console.log('Swap response : ', response.data);
        setTxDetails(response.data.tx);
    }

    const dexApproveAllowanceApi = async () => {
        // Make a GET request to check allowance
        const allowance = await axios.get(`http://localhost:3001/dexApproveAllowance`, {
            params: {
                tokenAddress: selectedTokenOne.address,
                walletAddress: address
            }
        });
        if (allowance.data.allowance === "0") {
            // If allowance is 0, initiate approval process

            setTimeout(async () => {
                const approve = await axios.get(`http://localhost:3001/approveTransactionDex`, {
                    params: {
                        tokenAddress: selectedTokenOne.address
                    }
                });
                setTxDetails(approve.data);
                console.log('not approved')
                return;
            }, 1000) //1RPS BY API
        }
        await dexSwapApiCall()
    }


    useEffect(() => {
        // fetchMoralisDataApi(selectedTokenOne.address, selectedTokenTwo.address)
    }, [selectedTokenOne, selectedTokenTwo])

    useEffect(() => {
        if (txDetails.to && address) { // && isConnecting
            sendTransaction({
                // from: address,
                to: txDetails.to,
                data: txDetails.data,
                value: txDetails.value,
            })

        }
    }, [txDetails])


    useEffect(() => {
        if (isConnecting || isDisconnected || error || hash || isConfirming || isConfirmed) {
            setShowAlertTime(true);
            const timer = setTimeout(() => {
                setShowAlertTime(false);
            }, 5000);
            return () => {
                clearTimeout(timer);
                console.log("Timer cleared"); // Check if this is logged to ensure the cleanup function is triggered
            };
        }
    }, [isConnecting, isDisconnected, error, hash, isConfirming, isConfirmed]);

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
        fetchMoralisDataApi(selectedTokenTwo.address, selectedTokenOne.address)
    }

    return (
        <Container sx={{marginTop: "50px", marginBottom: "50px"}}>

            <Box sx={{float: "right"}}>
                <w3m-button/>
            </Box>

            <Typography variant='h4' sx={{color: "#fff", width: "300px", height: "100px", textAlign: "center", margin: "0 auto", marginBottom: "50px"}}>
                <TypingEffects
                    speed={60}
                    text={"Swap anytime, anywhere."}
                />
            </Typography>

            {/*STATUS OF SWAP*/}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                    marginBottom: "30px"
                }}>
                {showAlertTime && (
                    <>
                        {error && (
                            <Alert severity="error">Error: {(error as BaseError).shortMessage || error.message}</Alert>
                        )}
                        {hash && (
                            <Alert severity="success"> Transaction Hash: {hash}</Alert>
                        )}
                        {isConfirming && (
                            <Alert severity="info">Waiting for confirmation...</Alert>
                        )}
                        {isConfirmed && (
                            <Alert severity="success">Transaction confirmed.</Alert>
                        )}
                        {isConnecting && (
                            <Alert severity="success">Wallet is connected!</Alert>
                        )}
                        {isDisconnected && (
                            <Alert severity="error">Wallet has disconnected!</Alert>
                        )}
                    </>
                )}
            </Box>

            <Paper sx={{borderRadius: "24px", width: "600px", margin: "0 auto", paddingBottom: "30px"}}>
                <Typography variant='h5' sx={{padding: "20px"}}>Dex Exchange</Typography>


                <Box sx={{position: "relative",}}>
                    <Box sx={{borderRadius: "24px", padding: "20px", backgroundColor: "rgb(42,40,40)"}}>
                        <Box component='span' sx={{color: "#9d9191"}}>You pay</Box>

                        {/*YOU PAY*/}
                        <Box sx={{display: "flex",}}>
                            <input
                                onChange={changeAmount}
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
                                disabled
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
                    <Button
                        disabled={!address || !tokenOnePrice || tokenOnePrice == 0}
                        sx={{width: "100%", marginTop: "10px", fontWeight: "bold", paddingTop: "10px", paddingBottom: "10px", fontSize: "22px"}}
                        onClick={() => dexApproveAllowanceApi()}
                    >
                        Swap
                    </Button>

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
