import React, {useEffect, useState} from "react";
import {
    Box,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {AllTimeProfitWidget} from "./AllTimeProfitWidget";
import {PerformersWidgets} from "./PerformersWidgets";
import {RootState} from "../../redux/ReduxStore";
import {portfolioFirebaseDataType} from "../../redux/PortfolioReducer";

const PerformanceAnalyticsWidget = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio,);
    const [performers, setPerformers] = useState<portfolioFirebaseDataType[]>([]);
    const [totalProfit, setTotalProfit] = useState<number>(0);

    useEffect(() => {
        //Checking before initializing if the array is defined
        if (myCurrentPortfolioDataFB && myCurrentPortfolioDataFB.length > 0) {
            let largestItem = myCurrentPortfolioDataFB[0]; //Counting the largest value from 0
            let smallestItem = myCurrentPortfolioDataFB[0]; //Counting the smallest value from the first object of the array.

            for (let i = 1; i < myCurrentPortfolioDataFB.length; i++) {
                if (myCurrentPortfolioDataFB[i].profitLoss > largestItem.profitLoss) {
                    largestItem = myCurrentPortfolioDataFB[i];
                    // console.log('largestItem' , largestItem)
                }
                if (myCurrentPortfolioDataFB[i].profitLoss < smallestItem.profitLoss) {
                    smallestItem = myCurrentPortfolioDataFB[i];
                    // console.log('smallestItem' , smallestItem)
                }
            }
            setPerformers([largestItem, smallestItem]);
            // CALCULATE TOTAL PORTFOLIO PROFIT
            const calculateTotalProfit = myCurrentPortfolioDataFB.reduce((accum : number, value : portfolioFirebaseDataType) => accum + value.profitLoss, 0,);
            setTotalProfit(calculateTotalProfit);
        }
    }, [myCurrentPortfolioDataFB]);

    return (
        <Box>
            <Box sx={{display: "flex", gap: 2}}>

                <AllTimeProfitWidget
                    totalProfit={totalProfit}
                />

                <PerformersWidgets
                    performers={performers}
                />
            </Box>

        </Box>
    );
};




export default PerformanceAnalyticsWidget;
