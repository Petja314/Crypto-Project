import React from 'react';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import tokenList from "../dex-exchange/tokenList.json";
import axios from "axios";


export type tokenPricesType = {
    ratio: number,
    tokenOne: number,
    tokenTwo: number
}
export type tokenListArrayType = {
    ticker: string,
    img: string,
    name: string,
    address: string,
    decimals: number
}
export type txDetailsType = {
    to: null | string,
    data: null | string,
    value: null | string
}

export type DexInitialState = {
    selectedTokenOne: tokenListArrayType
    selectedTokenTwo: tokenListArrayType,
    tokenOnePrice: null,
    tokenTwoPrice: null,
    prices: tokenPricesType | null,
    //Store transaction details from api call and send it to the metamask
    txDetails: any
}

export const fetchMoralisData = createAsyncThunk(
    'moralis/fetchMoralisData',
    async ({addressOne, addressTwo}: any) => {
        try {
            const response = await axios.get(`http://localhost:3001/tokenPrice?addressOne=${addressOne}&addressTwo=${addressTwo}`)
            return response.data
        } catch (error) {
            console.error('Error fetching Moralis data:', error)
            throw error;
        }

    }
)
export const dexApproveAllowance = createAsyncThunk(
    "dex/dexApproveAllowance ",
    async ({selectedTokenOne, address}: { selectedTokenOne: tokenListArrayType, address: any | any }, thunkAPI) => {
        // Utilize 1inch API to approve allowances; prior to executing swaps, approval is necessary.
        try {
            const allowance = await axios.get(`http://localhost:3001/dexApproveAllowance`, {
                params: {
                    tokenAddress: selectedTokenOne.address,
                    walletAddress: address
                }
            });
            if (allowance.data.allowance === "0") {
                await thunkAPI.dispatch(dexApproveTransaction({address}))
                return; //exit
            }
        } catch (error) {
            console.error('Error fetching 1inch approval allowance:', error)
            throw error;
        }
        //If the transaction was approved or allowance was given to the address , process to the swap
        setTimeout(async () => {
            console.log('in')
            await thunkAPI.dispatch(dexSwapCall({address}))
        }, 1000) // 1 RPS BY THE 1INCH API DOCS.

    }
)

const dexApproveTransaction = createAsyncThunk(
    "dex/dexApproveTransaction",
    async ({address}: { address: string | any }, thunkAPI: any) => { //_ unused argument
        //Invoke 1inch API for transaction approval; if the allowance was denied, 1inch requests transaction approval to enable swaps.
        const {selectedTokenOne} = thunkAPI.getState().dexReducer
        try {
            const approve = await axios.get(`http://localhost:3001/approveTransactionDex`, {
                params: {
                    tokenAddress: selectedTokenOne.address
                }
            });
            //Set transaction details
            return approve.data;
        } catch (error) {
            console.error('Error fetching 1inch approve transaction:', error)
            throw error;
        }
    }
)


const dexSwapCall = createAsyncThunk(
    "swap/dexSwapCall",
    async ({address}: { address: string | any }, thunkAPI: any) => {
        // debugger
        //ADDRESS NOT FROM INITIAL STATE
        const {selectedTokenOne, selectedTokenTwo, tokenOnePrice} = thunkAPI.getState().dexReducer
        try {
            //Execute token swaps by calling the 1inch API for selected tokens.
            const response = await axios.get(`http://localhost:3001/swapCoinDex`, {
                params: {
                    selectedTokenOne: selectedTokenOne.address,
                    selectedTokenTwo: selectedTokenTwo.address,
                    tokenOnePrice: tokenOnePrice.padEnd(selectedTokenOne.decimals + tokenOnePrice?.length, '0'),
                    address: address
                }
            });
            return response.data.tx
        } catch (error) {
            console.error('Error fetching 1inch token swap:', error)
            throw error;
        }
    }
)


const initialState: DexInitialState = {
    selectedTokenOne: tokenList[2],
    selectedTokenTwo: tokenList[1],
    tokenOnePrice: null,
    tokenTwoPrice: null,
    prices: null,
    //Store transaction details from api call and send it to the metamask
    txDetails: {to: null, data: null, value: null}
}

// Define a generic type for actions
interface MyAction<T = any> {
    type: string;
    payload?: T;
}

const dexExchangeSlice = createSlice({
    name: "dex toolkit",
    initialState,
    reducers: {
        setSelectedTokenOneAC(state, action) {
            state.selectedTokenOne = action.payload
        },
        setSelectedTokenTwoAC(state, action) {
            state.selectedTokenTwo = action.payload
        },
        setTokenOnePriceAC(state, action) {
            state.tokenOnePrice = action.payload
        },
        setTokenTwoPriceAC(state, action) {
            state.tokenTwoPrice = action.payload
        },
        setPricesAC(state, action) {
            state.prices = action.payload
        },
        setTxDetailsAC(state, action) {
            // debugger
            state.txDetails = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoralisData.fulfilled, (state, action) => {
            state.prices = action.payload
        })
        builder.addCase(dexApproveTransaction.fulfilled, (state, action) => {
            state.txDetails = action.payload
        })
        builder.addCase(dexSwapCall.fulfilled, (state, action) => {
            state.txDetails = action.payload
        })

    }
})
export const {
    setSelectedTokenOneAC,
    setSelectedTokenTwoAC,
    setTokenOnePriceAC,
    setTokenTwoPriceAC,
    setPricesAC,
    setTxDetailsAC,

} = dexExchangeSlice.actions
export default dexExchangeSlice.reducer;
