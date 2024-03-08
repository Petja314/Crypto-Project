import React from 'react';

const initialState = {
    portfolio: [
        {
            icon: "",
            rank: "",
            name : "",
            coinPrice : 0,
            totalHoldingCoins : 0,
            totalHoldingAmount : 0,
            buyingPrice : 0, //Needs to be as an array to keep data for whole buying time
            averageBuyingPrice : 0,
            profitLoss : 0,
        }
    ]
}
export const Portfolio = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_PORTFOLIO" :
            return {
                ...state,
                portfolio : action.portfolio
            }
        default :
            return state
    }
};

export const PortfolioActions = {
    setPortfolio: (portfolio : any) => ({
        type : "SET_PORTFOLIO",
        portfolio
    } as const)
}


export const createPortfolioThunk = () => (dispatch : any) => {

}