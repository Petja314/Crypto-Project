import React, {useEffect, useState} from 'react';
import {Avatar, Box, InputAdornment, MenuItem, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {formatCurrency} from "@coingecko/cryptoformat";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {coinStatAPI} from "../../api/CoinStatAPI";
import {marketCapListArray} from "../../redux/CryptoTableReducer";


/**
 * Description: MobileCoinSearch Component
 * This component allows users to search for crypto coins, making an API call to fetch top 100 coins from Coin Stat.
 * It provides a search functionality to filter the list of coins based on the user's input.
 * Clicking on a coin navigates the user to the description page of the selected coin.
 */

const MobileCoinSearch = React.memo(() => {
        const navigate: NavigateFunction = useNavigate()
        const [inputValue, setInputValue] = useState<string>('')
        const [isOpen, setIsOpen] = useState<boolean>(true)
        const [fetching, setFetching] = useState<boolean>(true)
        const [marketCapList, setMarketCapList] = useState<marketCapListArray[]>([])

        useEffect(() => {
            if (fetching && inputValue.length > 0) {
                console.log('call')
                getAllCoins()
            }
            return () => {
                setFetching(false)
            }
        }, [fetching, inputValue]);

        const getAllCoins = async () => {
            try {
                const response = await coinStatAPI.listOfCoinsApi("USD", 100, 1)
                if (response?.status === 200) {
                    setMarketCapList(response.data.result)
                }
            } catch (error) {
                console.error(error)
            }
        }

        const navigateHandler = (id: string) => {
            navigate(`/coin_info/${id}`)
            setIsOpen(false)
            setMarketCapList([])
            setInputValue('')
        }

        const handleBlur = () => {
            setTimeout(() => {
                setIsOpen(false);
            }, 200); // Adjust this delay as needed
        };

        const filteredPortfolioDataHandler = () => {
            //Filter selected coin lists data to make a search functionality
            return marketCapList.filter((item: any) => item.name.toUpperCase().includes(inputValue.toUpperCase()));
        };
        const filteredPortfolioData = filteredPortfolioDataHandler();


        console.log('marketCapList',marketCapList)
        // console.log('fetching :' , fetching)
        return (
            <>
                {/*TEXT AREA FIND SECTION*/}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                    }}
                >
                    <TextField
                        onClick={() => setIsOpen(true)}
                        onBlur={handleBlur}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        size="small"
                        label='search'
                        type='text'
                        sx={{
                            display: {xs: "flex", md: "flex"},
                            cursor: "pointer",
                            [`& fieldset`]: {
                                borderRadius: 30,
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {inputValue.length > 0 && isOpen && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                width: "100%",
                                zIndex: "999",
                                backgroundColor: "#121212",
                                borderRadius: "5px",
                            }}
                        >
                            {filteredPortfolioData.map((item: marketCapListArray, index: number) => (
                                <MenuItem
                                    key={index}
                                    value={item.name}
                                    onClick={() => navigateHandler(item.id)}
                                    sx={{
                                        color: "#B8B8B8",
                                        fontSize: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        // flexWrap : "wrap",
                                        // gap : 3,
                                        padding: "8px 16px",
                                    }}
                                >
                                    <Box sx={{
                                        display: 'inline-block',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        <Avatar
                                            sx={{width: "30px", height: "30px", marginRight: "10px"}}
                                            src={item.icon}
                                        />
                                        <Box> {item.name} </Box>
                                    </Box>
                                    <Box>{formatCurrency(item.price, "USD", "en")}</Box>
                                </MenuItem>
                            ))}
                        </Box>
                    )}
                </Box>
            </>
        )
    }
)
export default MobileCoinSearch;