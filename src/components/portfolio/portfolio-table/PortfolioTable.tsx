import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/ReduxStore";
import {sortingFieldsHandler} from "../../../commons/functions/sortingTableFields";
import PortfolioTableHeader from "./PortfolioTableHeader";
import PortfolioTableBody from "./PortfolioTableBody";
import styles from "../../../css/portfolio/portfolio.module.css"

const PortfolioTable = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)
    const [priceSort, setPriceSort] = useState<boolean>(true)
    const [selectedKey, setSelectedKey] = useState<null | string>(null) //Getting values from table head cells for filtration

    // Function to sort table fields alphabetically or numerically
    const handleSorting = (key: any) => {
        setPriceSort(prevValue => !prevValue)
        setSelectedKey(key)
        sortingFieldsHandler(myCurrentPortfolioDataFB, selectedKey, priceSort)
    }

    return (
        <Box
            className={styles.portfolioTableContainer}
            // sx={{marginTop: "20px", marginBottom: "20px"}}
        >
            <TableContainer
                component={Paper}
                // className={styles.tableContainer}
                // sx={{borderRadius: '20px'}}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow
                            // sx={{background: "red", paddingTop: "120px", border : "1px solid red"}}
                        >
                            <PortfolioTableHeader
                                priceSort={priceSort}
                                sortingFieldsHandler={handleSorting}
                                selectedKey={selectedKey}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <PortfolioTableBody
                            myCurrentPortfolioDataFB={myCurrentPortfolioDataFB}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default React.memo(PortfolioTable);





