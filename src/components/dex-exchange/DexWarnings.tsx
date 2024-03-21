import React, {useEffect, useState} from "react";
import {BaseError, useAccount, useSendTransaction, useWaitForTransactionReceipt} from "wagmi";
import {Box} from "@mui/material";
import {Alert} from "@mui/lab";

export const DexWarnings = () => {
    const [showAlertTime, setShowAlertTime] = useState(true)
    //Wagmi hook sendTransaction creating, signing , sending transactions to the network
    const {error, data: hash, sendTransaction} = useSendTransaction()
    //Wagmi hook when transaction has been completed gives us info about current status , success, loading..
    const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash})
    //Set the timeframe to show notifications for 5 seconds (error, warnings, transaction details)
    //Wagmi hook useAccount gives us details about status and connected address
    const {isConnecting, isDisconnected} = useAccount()


    useEffect(() => {
        //Set the time duration to show the notifications
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

    return (
        <Box>
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
                        <Alert severity="error">Wallet is disconnected!</Alert>
                    )}
                </>
            )}
        </Box>
    )
}
