import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Paper, Table, TableContainer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionsCryptoTable, getAllCoinsListThunk, handlingTableByRowNumbersThunk, marketCapListArray} from "../../../redux/CryptoTableReducer";
import {AppDispatch, RootState} from "../../../redux/ReduxStore";
import {TableHeadComponent} from "./TableHeadComponent";
import {sortingFieldsHandler} from "../../../commons/functions/sortingTableFields";
import {TableBodyCoin} from "./TableBodyCoin";

const CryptoTable = () => {
    const dispatch: AppDispatch = useDispatch()
    const {marketCapList, coinValue, currencyValue, rowsPerPage, fetching, page} = useSelector((state: RootState) => state.marketCoinList)
    const [priceSort, setPriceSort] = useState<boolean>(true)
    //Getting values from table head cells for filtration sortingFieldsHandler
    const [selectedKey, setSelectedKey] = useState<null | string>('rank')

    useEffect(() => {
        //Fetching coin list data
        if (fetching) {
            dispatch(getAllCoinsListThunk(currencyValue.value, rowsPerPage, page))
            dispatch(actionsCryptoTable.setPageAC(page + 1))
            setTimeout(() => {
                dispatch(actionsCryptoTable.setFetchingAC(false))
            }, 1000)
        }

    }, [fetching, rowsPerPage])

    //Function for filtering rows per page
    const rowNumberHandler = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRowValue = Number(event.target?.value)
        dispatch(handlingTableByRowNumbersThunk(true, selectedRowValue,1))
    }
    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget
        const bottomOfPage = element.scrollHeight - (element.scrollTop + element.clientHeight)
        if (bottomOfPage < 200) {
            // console.log('hit 200!')
            dispatch(actionsCryptoTable.setFetchingAC(true))
        }
    }

    // Function to sort table fields alphabetically or numerically
    const handleSorting = (key : string) => {
        setPriceSort(prevValue => !prevValue)
        setSelectedKey(key)
        sortingFieldsHandler(marketCapList, selectedKey, priceSort)
    }

    // Function that creates a new array with the ability to search by name
     const findCoinHandler =  () => {
         // debugger
        const filteredDataName : marketCapListArray[] = marketCapList.filter((item) => item.name.toUpperCase().includes(coinValue.toUpperCase()))
         return filteredDataName
    }
    //New array to display in JSX
    const filteredDataByName: marketCapListArray[] = findCoinHandler()

    return (
        <TableContainer
            component={Paper}
            sx={{borderRadius: '20px', height: "1000px", overflowY: "auto", cursor: "pointer"}}
            onScroll={scrollHandler}
        >
            <Table stickyHeader>
                {/*TABLE HEAD*/}
                <TableHeadComponent
                    sortingFieldsHandler={handleSorting}
                    selectedKey={selectedKey}
                    priceSort={priceSort}
                    rowNumberHandler={rowNumberHandler}
                />
                {/*TABLE BODY*/}
                <TableBodyCoin
                    filteredDataByName={filteredDataByName}
                    currencyValue={currencyValue}
                />
            </Table>

            {/*PRELOADER && NOTIFICATIONS */}
            <Box sx={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
                {fetching ? (
                    <CircularProgress/>
                ) : (
                    filteredDataByName.length <= 0 && <Box>No matching results found. <CircularProgress/> </Box>
                )}
            </Box>
        </TableContainer>
    );
};

export default React.memo(CryptoTable);





