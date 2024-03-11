export const calculateTotalHoldingCoins = (totalHoldingCoins: any, coinQuantity: any) => {
    //Formula to calc. total holding coins
    return totalHoldingCoins + coinQuantity
}
export const calculateAverageBuyingPrice = (totalHoldingCoinAmountCash: any, totalBuyingAmount: any, totalHoldingCoins: any, coinQuantity: any) => {
    //Formula to calc. average buying price
    return (totalHoldingCoinAmountCash + totalBuyingAmount) / (totalHoldingCoins + coinQuantity)
}
export const calculateProfitLoss = (currentCoinPrice: any, averageBuyingPrice: any, totalHoldingCoins: any) => {
    //Formula to calc. profit and loss
    return (currentCoinPrice - averageBuyingPrice) * totalHoldingCoins;
}
export const calculateTotalHoldingCoinAmountCash = (totalHoldingCoins: any, coinQuantity: any, currentCoinPrice: any) => {
    //Formula to calc. total holding coin amount in cash $
    return (totalHoldingCoins + coinQuantity) * currentCoinPrice;

}