import React, {useState} from "react";
import {
    calculateAverageBuyingPrice,
    calculateProfitLoss,
    calculateTotalHoldingCoinAmountCash,
    calculateTotalHoldingCoins,
} from "../portfolio/portfolio-calculation-functions/PurchaseCoinsFunctions";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import {auth, db, googleProvider, storage} from "../../config/firebase";
import {ActionsCryptoTable, actionsCryptoTable, marketCapListArray} from "./CryptoTableReducer";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {ThunkAction} from "redux-thunk";

export type portfolioFirebaseDataType = {
    id: string,
    icon: string,
    rank: number | string,
    name: string,
    symbol: string,
    price: number,                               //Current coin price
    coinsBoughtAmountHistoryCash: number[],      //Coins Bought Amount in Cash History
    coinsBoughtHistoryTokenQuantity: number [],   //Coins Bought Quantity History
    totalHoldingCoins: number,                   //Total Holding Coins in portfolio
    buyingPricesHistory: number[],               //Buying prices history in $
    averageBuyingPrice: number,                  //Average buying price
    profitLoss: number,                          //PROFIT - LOSS
    totalHoldingCoinAmountCash: number,          //Total amount of coins in portfolio
    userId: string                             //Signed in user ID
}
export type CurrentPortfolioType = {
    myCurrentPortfolioDataFB: portfolioFirebaseDataType[],
    isPortfolioDialogOpen: boolean,
    totalPageCount: number,
    currentPage: number,
    newCoinValue: string,
    //PurchaseCoinSection
    selectedCoinArrayData: marketCapListArray[],
    coinQuantity: number,
    totalBuyingAmount: number,
    errorMessage: string,
}
// const myPortfolioLS = localStorage.getItem('myPortfolio')
const initialState: CurrentPortfolioType = {
    //TablePanelCoin Search
    myCurrentPortfolioDataFB: [],
    isPortfolioDialogOpen: false,
    totalPageCount: 50,
    currentPage: 1,
    newCoinValue: "",
    //PurchaseCoinSection
    selectedCoinArrayData: [],
    coinQuantity: 0,
    totalBuyingAmount: 0,
    errorMessage: "",
    // myCurrentPortfolioData: myPortfolioLS
    //     ?JSON.parse(myPortfolioLS)
    //     :[{
    //         id: "",
    //         icon: "",
    //         rank: "",
    //         name: "",
    //         symbol: "",
    //         price: 0,                                //Current coin price
    //         coinsBoughtAmountHistoryCash: [],       //Coins Bought Amount in Cash History
    //         coinsBoughtHistoryTokenQuantity: [],    //Coins Bought Quantity History
    //         totalHoldingCoins: 0,                   //Total Holding Coins in portfolio
    //         buyingPricesHistory: [],                //Buying prices history in $
    //         averageBuyingPrice: 0,                  //Average buying price
    //         profitLoss: 0,                          //PROFIT - LOSS
    //         totalHoldingCoinAmountCash: 0,          //Total amount of coins in portfolio
    //         userId :  auth.currentUser.uid          //Signed in user ID
    //     }
    // ]
};

export const PortfolioReducer = (state = initialState, action: ActionsPortfolioTypes) => {
    switch (action.type) {
        case "IS_PORTFOLIO_DIALOG_OPEN":
            return {
                ...state,
                isPortfolioDialogOpen: action.isPortfolioDialogOpen,
            };
        case "GET_COIN_VALUE":
            return {
                ...state,
                newCoinValue: action.newCoinValue,
            };
        case "SET_SELECTED_COIN_ARRAY_DATA":
            return {
                ...state,
                selectedCoinArrayData: action.selectedCoinArrayData,
            };
        case "SET_TOTAL_BUYING_AMOUNT_CASH":
            return {
                ...state,
                totalBuyingAmount: action.totalBuyingAmount,
            };
        case "SET_COIN_QUANTITY":
            return {
                ...state,
                coinQuantity: action.coinQuantity,
            };
        case "CREATE_MY_PORTFOLIO":
            return {
                ...state,
                myCurrentPortfolioDataFB: action.data,
            };
        // const newPortfolioState = {
        //     ...state,
        // myCurrentPortfolioData: action.myCurrentPortfolioData
        // myCurrentPortfolioDataFB: action.data.updatedPortfolioData
        // }
        // localStorage.setItem('myPortfolio', JSON.stringify(action.myCurrentPortfolioData))
        // return newPortfolioState
        // case "DELETE_SELECTED_COIN" :
        //     const filteredArray = state.myCurrentPortfolioData.filter((item: any) => item.id !== action.id)
        //     // localStorage.setItem('myPortfolio', JSON.stringify(filteredArray))
        //     return {
        //         ...state,
        //         myCurrentPortfolioData: filteredArray
        //     }
        case "PORTFOLIO_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
};

export type ActionsPortfolioTypes = InferActionsTypes<typeof PortfolioActions>

export const PortfolioActions = {
    isPortfolioDialogOpenAC: (isPortfolioDialogOpen: boolean) =>
        ({
            type: "IS_PORTFOLIO_DIALOG_OPEN",
            isPortfolioDialogOpen,
        }) as const,
    getNewCoinValueAC: (newCoinValue: string) =>
        ({
            type: "GET_COIN_VALUE",
            newCoinValue,
        }) as const,
    setSelectedCoinArrayData: (selectedCoinArrayData: marketCapListArray[]) =>
        ({
            type: "SET_SELECTED_COIN_ARRAY_DATA",
            selectedCoinArrayData,
        }) as const,
    setTotalBuyingAmountAC: (totalBuyingAmount: number) =>
        ({
            type: "SET_TOTAL_BUYING_AMOUNT_CASH",
            totalBuyingAmount,
        }) as const,
    setCoinQuantityAC: (coinQuantity: number) =>
        ({
            type: "SET_COIN_QUANTITY",
            coinQuantity,
        }) as const,
    createMyPortfolioAC: (data: portfolioFirebaseDataType[]) => //portfolioFirebaseDataType[]
        ({
            type: "CREATE_MY_PORTFOLIO",
            data,
        }) as const,
    // deleteSelectedCoinAC: (id: any) => ({
    //     type: "DELETE_SELECTED_COIN",
    //     id
    // } as const),
    portfolioErrorWarningMessageAC: (errorMessage: string) =>
        ({
            type: "PORTFOLIO_ERROR_MESSAGE",
            errorMessage,
        }) as const,
};


type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsPortfolioTypes | any>;

//FIREBASE API
const portfolioCollectionRef = collection(db, "portfolio"); //Collection name
export const createPortfolioApiFirebase = (updatedPortfolioData: portfolioFirebaseDataType[]): ThunkType => async (dispatch) => {
    //Creating portfolio in firebase with unique document id for each user
    try {
        if (auth.currentUser) {
            const customDocumentNaming = auth.currentUser.uid;
            const profileDocRef = doc(portfolioCollectionRef, customDocumentNaming);
            await setDoc(profileDocRef, {updatedPortfolioData}); // create a new portfolio data
            dispatch(fetchPortfolioDataApiFirebase()); //fetching the data from db to the redux
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchPortfolioDataApiFirebase = (): ThunkType => async (dispatch) => {
    //Fetching current user portfolio from firebase
    try {
        const DocumentId = auth?.currentUser?.uid;
        const portfolioDocRef = doc(portfolioCollectionRef, DocumentId); //Collection name && unique document naming
        const documentSnapShot = await getDoc(portfolioDocRef);
        if (documentSnapShot) {
            // const data = [documentSnapShot.data()];
            const data = documentSnapShot.data()
            if (data) {
                dispatch(PortfolioActions.createMyPortfolioAC(data.updatedPortfolioData)); // getting current portfolio from data base
            }
        } else {
            console.log("Your portfolio is empty please add assets");
        }
    } catch (err) {
        console.error(err);
    }
};
const updatePortfolioApiFirebase = (updatedPortfolioData: portfolioFirebaseDataType[]): ThunkType => async (dispatch) => {
    //Updating current user portfolio via firebase
    const DocumentId = auth?.currentUser?.uid;
    const portfolioDocRef = doc(portfolioCollectionRef, DocumentId);
    try {
        await updateDoc(portfolioDocRef, {updatedPortfolioData});
        await dispatch(fetchPortfolioDataApiFirebase()); //After update fetch the latest portfolio data from db
    } catch (error) {
        console.error(error);
    }
};
export const deleteCoinFromPortfolioApiFirebase = (coinId: string): ThunkType => async (dispatch) => {
    //Deleting object of selected coin from portfolio
    const userId = auth?.currentUser?.uid;
    const portfolioDocRef = doc(portfolioCollectionRef, userId);
    const documentSnapShot = await getDoc(portfolioDocRef);
    if (documentSnapShot) {
        const data = [documentSnapShot.data()];
        const currentPortfolio = data[0]?.updatedPortfolioData;
        const filteredData = currentPortfolio.filter((item: portfolioFirebaseDataType) => item.id !== coinId);
        const portfolioDocument = doc(portfolioCollectionRef, userId);
        await updateDoc(portfolioDocument, {updatedPortfolioData: filteredData,});
        await dispatch(fetchPortfolioDataApiFirebase());
    }
};

//Local Project Thunk Creators
//Logic is separated from the API call to make the code maintainable
export const updatePortfolioThunk = (id: string, currentCoinPrice: number, totalBuyingAmount: number, coinQuantity: number): ThunkType => async (dispatch, getState) => {
    const {myCurrentPortfolioDataFB} = getState().myPortfolio;
    const userId = auth?.currentUser?.uid || '';
    // Function to update current portfolio with existing coins , checking by id if they exists
    const updatedPortfolioData = myCurrentPortfolioDataFB.map((item: portfolioFirebaseDataType) => {
        if (item.id === id) {
            // checking if selected coin does exist in current portfolio
            return {
                ...item,
                price: currentCoinPrice,
                coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalBuyingAmount,],
                coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, coinQuantity,],
                totalHoldingCoins: calculateTotalHoldingCoins(item.totalHoldingCoins, coinQuantity),
                buyingPricesHistory: [...item.buyingPricesHistory, totalBuyingAmount],
                averageBuyingPrice: calculateAverageBuyingPrice(
                    item.totalHoldingCoinAmountCash,
                    totalBuyingAmount,
                    item.totalHoldingCoins,
                    coinQuantity,
                ),
                profitLoss: calculateProfitLoss(
                    currentCoinPrice,
                    item.averageBuyingPrice,
                    item.totalHoldingCoins,
                ),
                totalHoldingCoinAmountCash: calculateTotalHoldingCoinAmountCash(
                    item.totalHoldingCoins,
                    coinQuantity,
                    currentCoinPrice,
                ),
                userId: userId,
            };
        }
        //If exists return the portfolio data
        return item;
    });
    dispatch(updatePortfolioApiFirebase(updatedPortfolioData)); //Dispatch the updated portfolio data to the firebase thunk for an api call!
};


export const createNewCoinInPortfolioThunk = (id: string, icon: string, rank: number | string, name: string, symbol: string, currentCoinPrice: number, totalBuyingAmount: number, coinQuantity: number,): ThunkType =>
    async (dispatch, getState) => {
        const {myCurrentPortfolioDataFB} = getState().myPortfolio;
        const userId = auth?.currentUser?.uid || ''
        console.log('rank', rank)
        //Function to create a new coin in portfolio if it does not exist
        const newCoinData = {
            id: id || "",
            icon: icon || "",
            rank: rank || "",
            name: name || "",
            symbol: symbol || "",
            price: currentCoinPrice,
            coinsBoughtAmountHistoryCash: [totalBuyingAmount],
            coinsBoughtHistoryTokenQuantity: [coinQuantity],
            totalHoldingCoins: coinQuantity,
            totalHoldingCoinAmountCash: coinQuantity * currentCoinPrice,
            buyingPricesHistory: [totalBuyingAmount],
            averageBuyingPrice: currentCoinPrice,
            profitLoss: 0,
            userId: userId,
        };
        // If there's an initial empty object, replace it; otherwise, add the new data
        const updatedPortfolioData =
            myCurrentPortfolioDataFB.length === 1 &&
            myCurrentPortfolioDataFB[0].id === ""
                ? [newCoinData] //Create the new data instead of initial empty object
                : [...myCurrentPortfolioDataFB, newCoinData]; //Create the new object to the existing data ,bitcoin,zen,xrp...
        //SET CREATED ARRAY [{...}]
        // setMyCurrentPortfolioData(updatedPortfolioData);
        // dispatch(PortfolioActions.createMyPortfolioAC(updatedPortfolioData))
        dispatch(createPortfolioApiFirebase(updatedPortfolioData)); // Dispatch data for the firebase thunk for an API call!
    };
