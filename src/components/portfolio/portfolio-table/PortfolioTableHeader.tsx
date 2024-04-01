import React from "react";
import {TableCell} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "../../../css/dashboard/table.module.css"


type PortfolioTableHeaderPropsType = {
    sortingFieldsHandler : any,
    priceSort : boolean,
    selectedKey: null | string
}
type portfolioTableHeadType = {
    key: string,
    label: string
}

const PortfolioTableHeader = ({  sortingFieldsHandler,priceSort,selectedKey}: PortfolioTableHeaderPropsType) => {
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


export default React.memo(PortfolioTableHeader);
