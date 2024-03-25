import React from 'react';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {coinStatApi} from "../api/CoinStatApi";

export type newsDataType = {
    imgUrl: string,
    shareURL: string,
    title: string,
    description: string,
    source: string
}
type initialStateNewsType = {
    newsData: newsDataType[],
    type: string,
    currentPage: number,
    isLoading: boolean
}

export const fetchCryptoNewsThunk = createAsyncThunk(
    "news/fetchCryptoNewsThunk",
    async ({type, currentPage}: { type: string, currentPage: number }, thunkAPI) => {
        try {
            const response = await coinStatApi.cryptoNews(type, currentPage, 20)
            // console.log('response', response)
            thunkAPI.dispatch(setCurrentPageAC(currentPage + 1))
            thunkAPI.dispatch(setIsLoadingAC(false))
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)
const initialState: initialStateNewsType = {
    newsData: [],
    type: "bullish",
    currentPage: 1,
    isLoading: true
}

const NewsSliceReducer = createSlice({
    name: "news slice",
    initialState,
    reducers: {
        setNewsDataAC: (state, action) => {
            state.newsData = [...state.newsData, ...action.payload]
        },
        clearNewsDataAC: (state) => {
            state.newsData = []
        },
        setCurrentPageAC: (state, action) => {
            state.currentPage = action.payload
        },
        setIsLoadingAC: (state, action) => {
            state.isLoading = action.payload
        },
        setTypeAC: (state, action) => {
            state.type = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoNewsThunk.fulfilled, (state, action) => {
            const filteredData = action.payload.map((item : newsDataType) => {
                return {
                    imgUrl: item.imgUrl,
                    shareURL: item.shareURL,
                    title: item.title,
                    description: item.description,
                    source: item.source
                }
            })
            state.newsData = [...state.newsData, ...filteredData]
        })
    }
})

export const {
    setNewsDataAC,
    clearNewsDataAC,
    setCurrentPageAC,
    setIsLoadingAC,
    setTypeAC,
} = NewsSliceReducer.actions;

export default NewsSliceReducer.reducer