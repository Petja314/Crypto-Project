import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import tokenList from "./tokenList.json"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CloseIcon from "@mui/icons-material/Close";
import {BaseError, useAccount, useSendTransaction, useWaitForTransactionReceipt} from "wagmi";
import {Alert} from "@mui/lab";
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";
import titleBG from "../../assets/images/image/titleBackground.svg"
import {DexUsageInstruction} from "./DexUsageInstruction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import {
    dexApproveAllowance,
    fetchMoralisData,
    setPricesAC,
    setSelectedTokenOneAC,
    setSelectedTokenTwoAC,
    setTokenOnePriceAC,
    setTokenTwoPriceAC,
    tokenListArrayType
} from "../redux/DexExchangeReducer";
import {DexWarnings} from "./DexWarnings";
import styles from "../../css/transition/transition.module.css";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useLocation} from "react-router-dom";


// WAGMI: Facilitates the connection between our app and the chosen wallet for transactions, swaps, fetching information, etc.
// Moralis: API that provides current prices from DEX exchanges on the selected ERC-20 network.
// 1INCH: API enabling us to swap selected tokens.
//Step 1 - Fetch current token prices using Moralis from DEX.
//Step 2 - Utilize 1inch API to approve allowances; prior to executing swaps, approval is necessary.
//Step 3 - Invoke 1inch API for transaction approval; if the allowance was denied, 1inch requests transaction approval to enable swaps.
//Step 4 - Transmit transaction details to MetaMask using WAGMI's sendTransaction hook.
//Step 5 - Execute token swaps by calling the 1inch API for selected tokens.

const DexExchange = () => {
    const location = useLocation();
    const dispatch: any = useDispatch()
    const {selectedTokenOne, selectedTokenTwo, tokenOnePrice, tokenTwoPrice, prices, txDetails} = useSelector((state: RootState) => state.dexReducer)
    //local state
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [tabValue, setTabValue] = useState<number>(0)
    //Wagmi Hooks - wallet connection
    const {address} = useAccount()
    const {data: hash, sendTransaction} = useSendTransaction()

    useEffect(() => {
        //Step 1 - Fetch current token prices using Moralis from DEX.
        dispatch(fetchMoralisData({addressOne: selectedTokenOne.address, addressTwo: selectedTokenTwo.address}))
        // fetchMoralisDataApi(selectedTokenOne.address, selectedTokenTwo.address)
    }, [selectedTokenOne, selectedTokenTwo])

    useEffect(() => {
        //Transmit transaction details to MetaMask using WAGMI's sendTransaction hook.
        if (txDetails.to && address) {
            sendTransaction({
                to: txDetails.to,
                data: txDetails.data,
                value: txDetails.value
            })

        }
    }, [txDetails])

    const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Change the selected token amount
        dispatch(setTokenOnePriceAC(event.target.value))
        // setTokenOnePrice(event.target.value)
        if (event.target.value && prices) {
            const price: number = Number(event.target.value)
            const priceWithRatio = price * prices.ratio
            dispatch(setTokenTwoPriceAC(priceWithRatio.toFixed(2)))
        } else {
            dispatch(setTokenTwoPriceAC(null))
        }
    }
    const handleTokenChange = (selectedToken: tokenListArrayType) => {
        //Set the selected tokens to the input
        dispatch(setPricesAC(null))
        dispatch(setTokenOnePriceAC(null))
        dispatch(setTokenTwoPriceAC(null))
        if (tabValue === 0) {
            // console.log('selected one')
            dispatch(setSelectedTokenOneAC(selectedToken))
            // setSelectedTokenOne(selectedToken)
        }
        if (tabValue === 1) {
            // console.log('selected two')
            dispatch(setSelectedTokenTwoAC(selectedToken))
        }
        setIsDialogOpen(false)
    };
    const swapDialogsAround = () => {
        //Swap button , allows us to swap around selected tokens
        dispatch(setPricesAC(null))
        dispatch(setSelectedTokenOneAC(null))
        dispatch(setTokenOnePriceAC(null))

        dispatch(setSelectedTokenOneAC(selectedTokenTwo))
        dispatch(setTokenOnePriceAC(tokenTwoPrice))
        //Swap dialogs around
        dispatch(setSelectedTokenTwoAC(selectedTokenOne))
        dispatch(setTokenTwoPriceAC(tokenOnePrice))
        dispatch(fetchMoralisData({addressOne: selectedTokenOne.address, addressTwo: selectedTokenTwo.address}))

    }

    console.log('location.pathname :', location.pathname)

    return (
            <Container sx={{marginTop: "50px", marginBottom: "50px", position: "relative"}}>
                <ParticleBackgroundAnimation/>

                <Box sx={{float: "right"}}>
                    <w3m-button/>
                </Box>

                <Box sx={{
                    padding: "20px",
                    backgroundImage: `url(${titleBG})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "20px",
                    width: "25%",
                    margin: "0 auto"
                }}>
                    <Typography variant='h3' sx={{color: "#e0f64b", fontWeight: "bold", textAlign: "center",}}>
                        Swap anytime anywhere
                    </Typography>
                </Box>

                {/*STATUS OF SWAP*/}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                        marginBottom: "30px",
                        marginTop: "20px",
                        height: "50px",
                        maxHeight: "100%"
                    }}>
                    <DexWarnings/>
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
                            onClick={() => dispatch(dexApproveAllowance({selectedTokenOne: selectedTokenOne, address: address}))}
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
                <DexUsageInstruction/>
            </Container>
    );
};

export default DexExchange;


