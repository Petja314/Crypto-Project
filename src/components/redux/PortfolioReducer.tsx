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

// const myPortfolioLS = localStorage.getItem('myPortfolio')
const initialState: any = {
    //TablePanelCoin Search
    myCurrentPortfolioDataFB: [],
    isPortfolioDialogOpen: false,
    totalPageCount: 500,
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
    //     }
    // ]
};

export const PortfolioReducer = (state = initialState, action: any) => {
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
                myCurrentPortfolioDataFB: action.data.updatedPortfolioData,
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

export const PortfolioActions = {
    isPortfolioDialogOpenAC: (isPortfolioDialogOpen: any) =>
        ({
            type: "IS_PORTFOLIO_DIALOG_OPEN",
            isPortfolioDialogOpen,
        }) as const,
    getNewCoinValueAC: (newCoinValue: any) =>
        ({
            type: "GET_COIN_VALUE",
            newCoinValue,
        }) as const,
    setSelectedCoinArrayData: (selectedCoinArrayData: any) =>
        ({
            type: "SET_SELECTED_COIN_ARRAY_DATA",
            selectedCoinArrayData,
        }) as const,
    setTotalBuyingAmountAC: (totalBuyingAmount: any) =>
        ({
            type: "SET_TOTAL_BUYING_AMOUNT_CASH",
            totalBuyingAmount,
        }) as const,
    setCoinQuantityAC: (coinQuantity: any) =>
        ({
            type: "SET_COIN_QUANTITY",
            coinQuantity,
        }) as const,
    createMyPortfolioAC: (data: any) =>
        ({
            type: "CREATE_MY_PORTFOLIO",
            data,
        }) as const,
    // deleteSelectedCoinAC: (id: any) => ({
    //     type: "DELETE_SELECTED_COIN",
    //     id
    // } as const),
    portfolioErrorWarningMessageAC: (errorMessage: any) =>
        ({
            type: "PORTFOLIO_ERROR_MESSAGE",
            errorMessage,
        }) as const,
};

//FIREBASE API
const portfolioCollectionRef = collection(db, "portfolio");
export const createPortfolioApiFirebase =
    (updatedPortfolioData: any) => async (dispatch: any) => {
        console.log("onSubmitPortfolioApi");
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

export const fetchPortfolioDataApiFirebase = () => async (dispatch: any) => {
    try {
        const userId = auth?.currentUser?.uid;
        const portfolioDocRef = doc(portfolioCollectionRef, userId);
        const documentSnapShot = await getDoc(portfolioDocRef);
        if (documentSnapShot) {
            const data = [documentSnapShot.data()];
            dispatch(PortfolioActions.createMyPortfolioAC(data[0])); // getting current portfolio from db
        } else {
            console.log("Your portfolio is empty please add assets");
        }
    } catch (err) {
        console.error(err);
    }
};
const updatePortfolioApiFirebase =
    (updatedPortfolioData: any) => async (dispatch: any) => {
        const userId = auth?.currentUser?.uid;
        const portfolioDocRef = doc(portfolioCollectionRef, userId);
        try {
            await updateDoc(portfolioDocRef, {updatedPortfolioData});
            await dispatch(fetchPortfolioDataApiFirebase());
        } catch (error) {
            console.error(error);
        }
    };
export const deleteCoinFromPortfolioApiFirebase =
    (coinId: any) => async (dispatch: any) => {
        const userId = auth?.currentUser?.uid;
        const portfolioDocRef = doc(portfolioCollectionRef, userId);
        const documentSnapShot = await getDoc(portfolioDocRef);
        if (documentSnapShot) {
            const data = [documentSnapShot.data()];
            const currentPortfolio = data[0]?.updatedPortfolioData;
            const filteredData = currentPortfolio.filter(
                (item: any) => item.id !== coinId,
            );
            const portfolioDocument = doc(portfolioCollectionRef, userId);
            await updateDoc(portfolioDocument, {
                updatedPortfolioData: filteredData,
            });
            await dispatch(fetchPortfolioDataApiFirebase());
        }
    };

export const updatePortfolioThunk =
    (id: any, currentCoinPrice: any, totalBuyingAmount: any, coinQuantity: any) =>
        async (dispatch: any, getState: any) => {
            const {myCurrentPortfolioDataFB} = getState().myPortfolio;
            // Function to update current portfolio with existing coins , checking by id if they exists
            const updatedPortfolioData = myCurrentPortfolioDataFB.map((item: any) => {
                if (item.id === id) {
                    // checking if selected coin does exist in current portfolio
                    return {
                        ...item,
                        price: currentCoinPrice,
                        coinsBoughtAmountHistoryCash: [
                            ...item.coinsBoughtAmountHistoryCash,
                            totalBuyingAmount,
                        ],
                        coinsBoughtHistoryTokenQuantity: [
                            ...item.coinsBoughtHistoryTokenQuantity,
                            coinQuantity,
                        ],
                        totalHoldingCoins: calculateTotalHoldingCoins(
                            item.totalHoldingCoins,
                            coinQuantity,
                        ),
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
                        userId: auth?.currentUser?.uid,
                    };
                }
                return item;
            });
            dispatch(updatePortfolioApiFirebase(updatedPortfolioData));
        };

export const createNewCoinInPortfolioThunk =
    (
        id: any,
        icon: any,
        rank: any,
        name: any,
        symbol: any,
        currentCoinPrice: any,
        totalBuyingAmount: any,
        coinQuantity: any,
    ) =>
        async (dispatch: any, getState: any) => {
            const {myCurrentPortfolioDataFB} = getState().myPortfolio;
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
                userId: auth?.currentUser?.uid,
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
            dispatch(createPortfolioApiFirebase(updatedPortfolioData)); // fb api
        };
