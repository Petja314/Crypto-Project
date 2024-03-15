import React, {useState} from "react";
import {TableCell} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {portfolioFirebaseDataType} from "../../redux/PortfolioReducer";

type PortfolioTableHeaderPropsType = {
    myCurrentPortfolioDataFB : portfolioFirebaseDataType[]
}
type portfolioTableHeadType = {
    key: string,
    label: string
}

export const PortfolioTableHeader = ({myCurrentPortfolioDataFB}: PortfolioTableHeaderPropsType) => {
    const [selectedKey, setSelectedKey] = useState<null | string>(null) //Getting values from table head cells for filtration sortingFieldsHandler
    const [priceSort, setPriceSort] = useState<boolean>(true)
    const sortingFieldsHandler = (key: string) => {
        setPriceSort((PrevValue: boolean) => !PrevValue)
        myCurrentPortfolioDataFB.sort((a: any, b: any) => priceSort ? b[key] - a[key] : a[key] - b[key])
        if (key === "name") {
            myCurrentPortfolioDataFB.sort((a: any, b: any) => (priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }
    }
    const portfolioTableHead : portfolioTableHeadType[] = [
        {key: "rank", label: "rank"},
        {key: "name", label: "name"},
        {key: "price", label: "Price"},
        {key: "totalHoldingCoinAmountCash", label: "Total Holdings Amount"},
        {key: "totalHoldingCoins", label: "Holdings"},
        {key: "averageBuyingPrice", label: "Avg. buy Price"},
        {key: "profitLoss", label: "Profit/Loss"},
        {key: "Actions", label: "Actions"},
    ]

    return (
        <>
            {/*TABLE HEADER*/}
            {
                portfolioTableHead.map((item : portfolioTableHeadType, index: number) => (
                    <TableCell
                        sx={{textAlign: "center", cursor: "pointer"}}
                        key={index}
                        onClick={() => {
                            sortingFieldsHandler(item.key)
                            setSelectedKey(item.key)
                        }}>
                        {item.label}
                        {selectedKey === item.key && priceSort ?
                            <ArrowDropUpIcon/>
                            :
                            <ArrowDropDownIcon/>
                        }
                    </TableCell>
                ))
            }
        </>
    )
}
