import React from 'react';
import {alternativeApi} from "../api/CoinStatApi";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {ThunkAction} from "redux-thunk";

export type fearGreedArray = {
    "value": number,
    "value_classification": string,
    "timestamp": number,
    "time_until_update": number
}

type FearAndGreedType = {
    fearGreedIndexData: fearGreedArray[],
    greedIndex: number
}
const initialState: FearAndGreedType = {
    fearGreedIndexData: [],
    greedIndex: 0
}
export const FearGreedIndexReducer = (state = initialState, action: ActionsFearGreed) => {
    switch (action.type) {
        case "SET_GREED_INDEX" :
            return {
                ...state,
                greedIndex: action.greedIndex
            }
        case "FEAR_GREED_DATA" :
            return {
                ...state,
                fearGreedIndexData: action.fearAndGreedData
            }

        default : {
            return state
        }
    }
};


export type ActionsFearGreed = InferActionsTypes<typeof fearGreedActions>

const fearGreedActions = {
    setGreedIndexAC: (greedIndex: number) => ({
        type: "SET_GREED_INDEX",
        greedIndex
    } as const),
    setFearAndGreedDataAC: (fearAndGreedData: fearGreedArray[]) => ({
        type: "FEAR_GREED_DATA",
        fearAndGreedData
    } as const)
}


type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsFearGreed | any>;
export const fearAndGreedFetchingThunk = () : ThunkType => async (dispatch) => {
    try {
        const response = await alternativeApi.fetchFearGreedIndex()
        const greedIndex = response.data.data[0].value
        const fearAndGreedData = response.data.data
        dispatch(fearGreedActions.setGreedIndexAC(greedIndex))
        dispatch(fearGreedActions.setFearAndGreedDataAC(fearAndGreedData))
    } catch (error) {
        console.error(error)
    }
}
