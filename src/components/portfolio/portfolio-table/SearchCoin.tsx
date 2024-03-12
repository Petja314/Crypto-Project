import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {PortfolioActions} from "../../redux/PortfolioReducer";
import {Avatar, Box, MenuItem, TextField} from "@mui/material";
import {formattedPrice} from "../../../commons/formattedPrice";

export const SearchCoin = ({ portfolioData, newCoinValue,}: any) => {
    const dispatch: any = useDispatch()
    const [isTableClosed, setIsTableClosed] = useState(true)
    const selectedCoinHandler = (value: any) => {
        // setSelectedCoinArrayData([value])
        dispatch(PortfolioActions.setSelectedCoinArrayData([value]))
        setIsTableClosed(false)
    }
    const filteredPortfolioData = () => {
        return portfolioData.filter((item: any) => item.name.toUpperCase().includes(newCoinValue.toUpperCase()))
    }
    const portfolioDataArray = filteredPortfolioData()
    return (
        <Box>
            <Box sx={{textAlign: "center", margin: "10px 0px 10px 0px"}}>Choose Coin</Box>
            <TextField
                onClick={() => setIsTableClosed(true)}
                value={newCoinValue}
                onChange={(event) => dispatch(PortfolioActions.getNewCoinValueAC(event.target.value))}
                label='add coin'
                sx={{width: "100%",}}
            />
            {newCoinValue !== "" && isTableClosed && (
                portfolioDataArray.map((item: any, index: any) => (
                    <MenuItem
                        key={index}
                        sx={{color: "#B8B8B8", fontSize: "12px", display: "flex", justifyContent: "space-between"}}
                        value={item.name}
                        onClick={() => selectedCoinHandler(item)}
                    >
                        <Box sx={{display: "flex"}}>
                            <Avatar sx={{width: "30px", height: "30px", marginRight: "10px"}} src={item.icon}/>
                            <Box> {item.name} </Box>
                        </Box>
                        <Box>{formattedPrice(item.price)} $ </Box>
                    </MenuItem>
                ))
            )}
        </Box>
    )
}