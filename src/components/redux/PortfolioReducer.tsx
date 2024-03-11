import React, {useState} from 'react';
import {calculateAverageBuyingPrice, calculateProfitLoss, calculateTotalHoldingCoinAmountCash, calculateTotalHoldingCoins} from "../portfolio/add-transaction/PurchaseCoinsFunctions";


const myPortfolioLS = localStorage.getItem('myPortfolio')
const initialState : any = {
    //TablePanelCoin Search
    totalPageCount: 50,
    currentPage: 1,
    newCoinValue: '',
    selectedCoinArrayData: [],
    //PurchaseCoinSection
    coinQuantity: 0,
    totalBuyingAmount: 0,
    // error: '',
    myCurrentPortfolioData: myPortfolioLS
        ?JSON.parse(myPortfolioLS)
        :[{
            id: "",
            icon: "",
            rank: "",
            name: "",
            symbol: "",
            price: 0,                    //Current coin price
            coinsBoughtAmountHistoryCash: [],       //Coins Bought Amount in Cash History
            coinsBoughtHistoryTokenQuantity: [],    //Coins Bought Quantity History
            totalHoldingCoins: 0,                   //Total Holding Coins in portfolio
            buyingPricesHistory: [],                //Buying prices history in $
            averageBuyingPrice: 0,                  //Average buying price
            profitLoss: 0,                          //PROFIT - LOSS
            totalHoldingCoinAmountCash: 0,          //Total amount of coins in portfolio
        }
    ]
}



export const PortfolioReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "GET_COIN_VALUE" :
            return {
                ...state,
                newCoinValue: action.newCoinValue
            }
        case "SET_SELECTED_COIN_ARRAY_DATA" :
            return {
                ...state,
                selectedCoinArrayData: action.selectedCoinArrayData
            }
        case "SET_TOTAL_BUYING_AMOUNT_CASH" :
            return {
                ...state,
                totalBuyingAmount: action.totalBuyingAmount
            }
        case "SET_COIN_QUANTITY" :
            return {
                ...state,
                coinQuantity: action.coinQuantity
            }
        case "CREATE_MY_PORTFOLIO" :
            const newPortfolioState = {
                ...state,
                myCurrentPortfolioData: action.myCurrentPortfolioData
            }
            localStorage.setItem('myPortfolio', JSON.stringify(action.myCurrentPortfolioData))
            return newPortfolioState
        case "DELETE_SELECTED_COIN" :
            const filteredArray = state.myCurrentPortfolioData.filter((item : any) => item.id !== action.id)
            localStorage.setItem('myPortfolio', JSON.stringify(filteredArray))
            return {
                ...state,
                myCurrentPortfolioData :  filteredArray
            }
        default :
            return state
    }
};

export const PortfolioActions = {
    getNewCoinValueAC: (newCoinValue: any) => ({
        type: "GET_COIN_VALUE",
        newCoinValue
    } as const),
    setSelectedCoinArrayData: (selectedCoinArrayData: any) => ({
        type: "SET_SELECTED_COIN_ARRAY_DATA",
        selectedCoinArrayData
    } as const),
    setTotalBuyingAmountAC: (totalBuyingAmount: any) => ({
        type: "SET_TOTAL_BUYING_AMOUNT_CASH",
        totalBuyingAmount
    } as const),
    setCoinQuantityAC: (coinQuantity: any) => ({
        type: "SET_COIN_QUANTITY",
        coinQuantity
    } as const),
    createMyPortfolioAC: (myCurrentPortfolioData: any) => ({
        type: "CREATE_MY_PORTFOLIO",
        myCurrentPortfolioData
    } as const),
    deleteSelectedCoinAC : (id : any) => ({
        type : "DELETE_SELECTED_COIN",
        id
    }as const)

}


export const updatePortfolioThunk = (id: any, currentCoinPrice: any, totalBuyingAmount: any, coinQuantity: any) => (dispatch: any, getState: any) => {
    const {myCurrentPortfolioData} = getState().myPortfolio
    // Function to update current portfolio with existing coins , checking by id if they exists
    const updatedPortfolioData = myCurrentPortfolioData.map((item: any) => {
        if (item.id === id) {
            // checking if selected coin does exist in current portfolio
            return {
                ...item,
                price: currentCoinPrice,
                coinsBoughtAmountHistoryCash: [...item.coinsBoughtAmountHistoryCash, totalBuyingAmount],
                coinsBoughtHistoryTokenQuantity: [...item.coinsBoughtHistoryTokenQuantity, coinQuantity],
                totalHoldingCoins: calculateTotalHoldingCoins(item.totalHoldingCoins, coinQuantity),
                buyingPricesHistory: [...item.buyingPricesHistory, totalBuyingAmount],
                averageBuyingPrice: calculateAverageBuyingPrice(item.totalHoldingCoinAmountCash, totalBuyingAmount, item.totalHoldingCoins, coinQuantity),
                profitLoss: calculateProfitLoss(currentCoinPrice, item.averageBuyingPrice, item.totalHoldingCoins),
                totalHoldingCoinAmountCash: calculateTotalHoldingCoinAmountCash(item.totalHoldingCoins, coinQuantity, currentCoinPrice),
            };
        }
        return item;
    });
    //Setting to the existing object updated data
    dispatch(PortfolioActions.createMyPortfolioAC(updatedPortfolioData))
}

export const createNewCoinInPortfolioThunk = (id:any,icon:any,rank:any,name:any,symbol:any,currentCoinPrice:any,totalBuyingAmount:any, coinQuantity:any) => (dispatch: any, getState: any) => {
    const {myCurrentPortfolioData} = getState().myPortfolio
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
    };
    // If there's an initial empty object, replace it; otherwise, add the new data
    const updatedPortfolioData = myCurrentPortfolioData.length === 1 && myCurrentPortfolioData[0].id === ""
        ? [newCoinData] //Create the new data instead of initial empty object
        : [...myCurrentPortfolioData, newCoinData]; //Create the new object to the existing data ,bitcoin,zen,xrp...
    //SET CREATED ARRAY [{...}]
    // setMyCurrentPortfolioData(updatedPortfolioData);
    dispatch(PortfolioActions.createMyPortfolioAC(updatedPortfolioData))
}
