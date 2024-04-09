import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, Container, Dialog, DialogTitle, IconButton, MenuItem, Paper, Typography} from "@mui/material";
import tokenList from "./tokenList.json"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CloseIcon from "@mui/icons-material/Close";
import {useAccount, useSendTransaction} from "wagmi";
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";
import {DexUsageInstruction} from "./DexUsageInstruction";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import {
    dexApproveAllowance,
    fetchMoralisData,
    setPricesAC,
    setSelectedTokenOneAC,
    setSelectedTokenTwoAC,
    setTokenOnePriceAC,
    setTokenTwoPriceAC,
    tokenListArrayType
} from "../../redux/DexExchangeReducer";
import {DexWarnings} from "./DexWarnings";
import styles from "../../css/dex/dex.module.css"
import '../../App.css';



/**
 * DexExchange Component:
 * WAGMI: Facilitates the connection between our app and the chosen wallet for transactions, swaps, fetching information, etc.
 * Moralis: API that provides current prices from DEX exchanges on the selected ERC-20 network.
 * 1INCH: API enabling us to swap selected tokens.
 *      Step 1 - Fetch current token prices using Moralis from DEX.
 *      Step 2 - Utilize 1inch API to approve allowances; prior to executing swaps, approval is necessary.
 *      Step 3 - Invoke 1inch API for transaction approval; if the allowance was denied, 1inch requests transaction approval to enable swaps.
 *      Step 4 - Transmit transaction details to MetaMask using WAGMI's sendTransaction hook.
 *      Step 5 - Execute token swaps by calling the 1inch API for selected tokens.
 */
const DexExchange = () => {
    const dispatch: AppDispatch = useDispatch()
    const {selectedTokenOne, selectedTokenTwo, tokenOnePrice, tokenTwoPrice, prices, txDetails} = useSelector((state: RootState) => state.dexReducer)

    //Local state
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





    // @ts-ignore
    return (
        <Container className={styles.container}>
            <ParticleBackgroundAnimation/>

            <Box className={styles.walletBtn}>
                <w3m-button/>
            </Box>


            <Box className={styles.titleMainBox}>
                <Typography variant='h3'>Swap anytime anywhere</Typography>
            </Box>

            {/*STATUS OF SWAP*/}
            <Box className={styles.swapStatus}>
                <DexWarnings/>
            </Box>

            <Paper className={styles.paperSwap}>
                <Typography variant='h5'>Dex Exchange</Typography>
                <Box className={styles.mainExchangeBox}>

                    <Box className={styles.paymentBox}>
                        <Box component='span'>You pay</Box>

                        {/*YOU PAY*/}
                        <Box className={styles.clientPaymentSection}>
                            <input onChange={changeAmount} value={tokenOnePrice === null ? 0 : tokenOnePrice} type={'number'}/>
                            <Box className={styles.clientPaymentContent}
                                 onClick={() => {
                                     setIsDialogOpen(true)
                                     setTabValue(0)
                                 }}
                                 defaultValue={0}
                            >
                                <Avatar src={selectedTokenOne.img}/>
                                <Box className={styles.paymentSelectedToken}>{selectedTokenOne.ticker}</Box>
                                <KeyboardArrowDownIcon/>
                            </Box>
                        </Box>
                    </Box>


                    {/*SWAP BUTTON*/}
                    <IconButton className={styles.swapIconBtn} onClick={swapDialogsAround}>
                        <SwapVerticalCircleIcon sx={{width: "50px", height: "50px"}}/>
                    </IconButton>
                    {/*SWAP BUTTON*/}


                    {/*YOU RECEIVE*/}
                    <Box className={styles.paymentReceiveBox}>
                        <Box component='span'>You receive</Box>
                        <Box className={styles.receivePaymentSection}>
                            <input disabled value={tokenTwoPrice === null ? 0 : tokenTwoPrice} type={'number'}/>
                            <Box
                                className={styles.receiveContentSection}
                                onClick={() => {
                                     setIsDialogOpen(true)
                                     setTabValue(1)
                                 }}
                                 defaultValue={1}
                            >
                                <Avatar src={selectedTokenTwo.img}/>
                                <Box  className={styles.receiveSelectedToken}>{selectedTokenTwo.ticker}</Box>
                                <KeyboardArrowDownIcon/>
                            </Box>
                        </Box>
                    </Box>

                    {/*SWAP BUTTON */}
                    <Button
                        disabled={!address || !tokenOnePrice || tokenOnePrice == 0}
                        className={styles.swapBtn}
                        onClick={() => dispatch(dexApproveAllowance({selectedTokenOne: selectedTokenOne, address: address}))}
                    >
                        Swap
                    </Button>
                </Box>
            </Paper>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className={styles.swapDialogBox}>
                <DialogTitle>Select a token</DialogTitle>
                <IconButton
                    className={styles.dialogCloseBtn}
                    aria-label="close"
                    onClick={() => setIsDialogOpen(false)}
                >
                    <CloseIcon/>
                </IconButton>


                {tokenList.map((item, index: number) => (
                    <MenuItem
                        key={index}
                        className={styles.tokenList}
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
export default React.memo(DexExchange);




