import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {coinDescriptionDataThunk} from "../redux/CoinDescriptionReducer";
import {Avatar, Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import {Link} from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import {CryptoChart} from "./CryptoChart";
import {formattedPrice} from "../../commons/formattedPrice";
import {instance} from "../api/Api";

export const CoinDescription = ({id}: any) => {
    const dispatch: any = useDispatch()
    const {coinData} = useSelector((state: any) => state.coinDetails)
    const axios = require('axios')



    useEffect(() => {
        // console.log('Fetching data...');
        dispatch(coinDescriptionDataThunk(id))
        // console.log('Effect ran due to id change:', id); // Debugging statement
    }, [id]);

    return (
        <Box sx={{marginTop: "50px", marginBottom: "50px"}}>

            {
                coinData.map((item: any, index: any) => (
                    <Box key={index}>

                        <Box sx={{display: "flex", gap: 4}}>
                                <CoinTableInfo
                                    formattedPrice={formattedPrice}
                                    item={item}
                                />


                                <CryptoChart
                                    priceChangedData={[
                                        {"price": item.market_data.price_change_percentage_24h, name: "Price changed 24h%"},
                                        {"price": item.market_data.price_change_percentage_30d, name: "Price changed 30d%"},
                                        {"price": item.market_data.price_change_percentage_60d, name: "Price changed 60d%"},
                                    ]}
                                />
                        </Box>


                        {/*DESCRIPTION */}
                        <Paper sx={{width: "100%", padding: "30px", borderRadius: '20px', marginTop: "20px"}}>
                            <Box>
                                <Typography variant={"h5"} mb={2}> <InfoIcon sx={{color: "#E0F64B"}}/> About </Typography>
                                <Box>
                                    {item.description.en}
                                </Box>
                            </Box>
                        </Paper>

                    </Box>
                ))
            }

        </Box>
    )
}

const CoinTableInfo = ({item} : any) => {
    return (
        <Box>
            <Paper sx={{width: "450px", borderRadius: '20px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box sx={{display: "flex", alignItems: "center", gap: 1.5}}>
                                    <Avatar sx={{width: "60px", height: "60px"}} src={item.image.small}/>
                                    <Box sx={{fontWeight: "bold", fontSize: "20px"}} component={"span"}>{item.name}</Box>
                                    <Box sx={{textTransform: "uppercase"}}>{item.symbol}</Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formattedPrice(item.market_data.current_price.usd)} $</Box>
                                <Box
                                    sx={{color: item.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784"}}
                                >
                                    {formattedPrice(item.market_data.price_change_percentage_24h)}%(24h)
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[
                            ['Market cap Rank', item.market_cap_rank],
                            ['Market Cap', formattedPrice(item.market_data.market_cap.usd) + ' $'],
                            ['Max. supply', item.market_data.max_supply],
                            ['Circulating supply', `${item.market_data.circulating_supply} ${item.symbol}`],
                            ['Total supply', `${item.market_data.total_supply} ${item.symbol}`],
                            ['Market low 24h', formattedPrice(item.market_data.low_24h.usd) + ' $'],
                            ['Market high 24h', formattedPrice(item.market_data.high_24h.usd) + ' $'],
                        ].map(([label, value], index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
                                    {label}
                                </TableCell>
                                <TableCell>
                                    <Typography component="span" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                                        {value}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/*OFFICIAL LINKS SECTION*/}
            <Paper sx={{marginTop: "20px", width: "450px", borderRadius: '20px'}}>
                <Box sx={{fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>
                    Official links
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", marginTop: "10px"}}>
                    {
                        [
                            ['Website :', <LanguageIcon/>, item.links.homepage[0]],
                            ['Github :', <GitHubIcon/>, item.links.repos_url.github[0]],
                            ['Reddit :', <LanguageIcon/>, item.links.subreddit_url],
                        ].map(([label, image, value], index) => (
                            <Box key={index}>
                                <Link to={value}>
                                    <IconButton sx={{color: "#E0F64B"}}>
                                        {image}
                                    </IconButton>
                                </Link>
                            </Box>
                        ))
                    }
                </Box>
            </Paper>
        </Box>
    )
}


const coinDatas = [
    {
        "id": "internet-computer",
        "symbol": "icp",
        "name": "Internet Computer",
        "web_slug": "internet-computer",
        "asset_platform_id": "internet-computer",
        "platforms": {
            "internet-computer": "ryjl3-tyaaa-aaaaa-aaaba-cai"
        },
        "detail_platforms": {
            "internet-computer": {
                "decimal_place": 8,
                "contract_address": "ryjl3-tyaaa-aaaaa-aaaba-cai"
            }
        },
        "block_time_in_minutes": 0,
        "hashing_algorithm": null,
        "categories": [
            "Multicoin Capital Portfolio",
            "Alleged SEC Securities",
            "NFT",
            "Governance",
            "Storage",
            "Internet Computer Ecosystem",
            "Smart Contract Platform"
        ],
        "preview_listing": false,
        "public_notice": null,
        "additional_notices": [],
        "localization": {
            "en": "Internet Computer",
            "de": "Internet Computer",
            "es": "Internet Computer",
            "fr": "Internet Computer",
            "it": "Internet Computer",
            "pl": "Internet Computer",
            "ro": "Internet Computer",
            "hu": "Internet Computer",
            "nl": "Internet Computer",
            "pt": "Internet Computer",
            "sv": "Internet Computer",
            "vi": "Internet Computer",
            "tr": "Internet Computer",
            "ru": "Internet Computer",
            "ja": "Internet Computer",
            "zh": "Internet Computer",
            "zh-tw": "Internet Computer",
            "ko": "Internet Computer",
            "ar": "Internet Computer",
            "th": "Internet Computer",
            "id": "Internet Computer",
            "cs": "Internet Computer",
            "da": "Internet Computer",
            "el": "Internet Computer",
            "hi": "Internet Computer",
            "no": "Internet Computer",
            "sk": "Internet Computer",
            "uk": "Internet Computer",
            "he": "Internet Computer",
            "fi": "Internet Computer",
            "bg": "Internet Computer",
            "hr": "Internet Computer",
            "lt": "Internet Computer",
            "sl": "Internet Computer"
        },
        "description": {
            "en": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "de": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "es": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "fr": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "it": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "pl": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "ro": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "hu": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "nl": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "pt": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "sv": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "vi": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "tr": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "ru": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "ja": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "zh": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "zh-tw": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "ko": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "ar": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "th": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "id": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "cs": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "da": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "el": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "hi": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "no": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "sk": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "uk": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "he": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "fi": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "bg": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "hr": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "lt": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network.",
            "sl": "Internet Computer (IC) is the world’s first blockchain that is capable of running at web speed at unrestrictive capacities. Built by the DFINITY Foundation, IC aims to recreate the web by supporting smart contract development at scale and changing the way people can interact using web services. Internet Computer aims to extend the public internet, so that it can be the world’s computing platform, in a decentralized manner. Internet Computer sets to revolutionalize the design of the crypto economy, with an aim to overhaul traditional software services. \r\n\r\nThe project was founded in October 2016 by Dominic WIllams and have raised a total of $121 million from investors such as Adreessen Horowitz, Polychain Capital, Multicoin Capital and such. On May 10, 2021, DFINITY launched the Internet Computer into the public domain, marking it a major milestone for ICP as it means the internet now functions as a decentralised global computer. This is marked by the release of all of the Internet Computer’s source code into the public domain, as well as ICP utility token that allows tens of thousands of community members to govern the Internet Computer network.\r\n\r\nICP is Internet Computer's native token. It plays three prominent roles:\r\n\r\n1. Network Governance: Users that participate in the governance will be rewarded with ICPI\r\n2. Production of Cycles for Compute: ICP can be converted into cycles where it is used as the transaction fee to access the network. Cycles are burned after used.\r\n3. Rewarding Users: ICP is used as the rewards to incentivize users to participate in the network such as securing the network."
        },
        "links": {
            "homepage": [
                "https://internetcomputer.org/",
                "",
                ""
            ],
            "whitepaper": "https://internetcomputer.org/whitepaper.pdf",
            "blockchain_site": [
                "https://dashboard.internetcomputer.org/canister/ryjl3-tyaaa-aaaaa-aaaba-cai",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "official_forum_url": [
                "https://forum.dfinity.org/",
                "https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki",
                ""
            ],
            "chat_url": [
                "",
                "",
                ""
            ],
            "announcement_url": [
                "https://medium.com/dfinity",
                ""
            ],
            "twitter_screen_name": "dfinity",
            "facebook_username": "",
            "bitcointalk_thread_identifier": null,
            "telegram_channel_identifier": "DFinity",
            "subreddit_url": "https://www.reddit.com/r/dfinity/",
            "repos_url": {
                "github": [
                    "https://github.com/dfinity/ic"
                ],
                "bitbucket": []
            }
        },
        "image": {
            "thumb": "https://assets.coingecko.com/coins/images/14495/thumb/Internet_Computer_logo.png?1696514180",
            "small": "https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png?1696514180",
            "large": "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180"
        },
        "country_origin": "",
        "genesis_date": null,
        "contract_address": "ryjl3-tyaaa-aaaaa-aaaba-cai",
        "sentiment_votes_up_percentage": 82,
        "sentiment_votes_down_percentage": 18,
        "watchlist_portfolio_users": 150001,
        "market_cap_rank": 22,
        "market_data": {
            "current_price": {
                "aed": 47.09,
                "ars": 10800.45,
                "aud": 19.75,
                "bch": 0.04046621,
                "bdt": 1408.91,
                "bhd": 4.83,
                "bmd": 12.82,
                "bnb": 0.03149409,
                "brl": 63.73,
                "btc": 0.00020644,
                "cad": 17.42,
                "chf": 11.36,
                "clp": 12395.82,
                "cny": 92.3,
                "czk": 300.57,
                "dkk": 88.41,
                "dot": 1.519416,
                "eos": 14.637511,
                "eth": 0.00373396,
                "eur": 11.86,
                "gbp": 10.15,
                "gel": 33.98,
                "hkd": 100.37,
                "huf": 4673.85,
                "idr": 201520,
                "ils": 45.73,
                "inr": 1062.93,
                "jpy": 1931.78,
                "krw": 17124.91,
                "kwd": 3.95,
                "lkr": 3975.91,
                "ltc": 0.15148974,
                "mmk": 26960,
                "mxn": 218.58,
                "myr": 60.79,
                "ngn": 20202,
                "nok": 136.04,
                "nzd": 21.07,
                "php": 719.43,
                "pkr": 3551.47,
                "pln": 51.2,
                "rub": 1173.08,
                "sar": 48.09,
                "sek": 132.84,
                "sgd": 17.27,
                "thb": 461.24,
                "try": 401.66,
                "twd": 405.34,
                "uah": 488.15,
                "usd": 12.82,
                "vef": 1.28,
                "vnd": 316079,
                "xag": 0.568882,
                "xau": 0.00628612,
                "xdr": 9.67,
                "xlm": 103.005,
                "xrp": 21.666361,
                "yfi": 0.00144963,
                "zar": 246.62,
                "bits": 206.44,
                "link": 0.64288825,
                "sats": 20644
            },
            "total_value_locked": null,
            "mcap_to_tvl_ratio": null,
            "fdv_to_tvl_ratio": null,
            "roi": null,
            "ath": {
                "aed": 2573.47,
                "ars": 65809,
                "aud": 889.7,
                "bch": 0.46706922,
                "bdt": 59425,
                "bhd": 264.15,
                "bmd": 700.65,
                "bnb": 1.05178,
                "brl": 3661.58,
                "btc": 0.01208251,
                "cad": 846.8,
                "chf": 629.66,
                "clp": 486249,
                "cny": 4495.7,
                "czk": 14717.05,
                "dkk": 4281.18,
                "dot": 17.4744,
                "eos": 66.873,
                "eth": 0.16673816,
                "eur": 575.73,
                "gbp": 495.11,
                "gel": 43.44,
                "hkd": 5440.69,
                "huf": 205911,
                "idr": 9917755,
                "ils": 2279.45,
                "inr": 51433,
                "jpy": 76166,
                "krw": 779392,
                "kwd": 210.77,
                "lkr": 138060,
                "ltc": 1.751724,
                "mmk": 1091590,
                "mxn": 13923.62,
                "myr": 2877.91,
                "ngn": 287706,
                "nok": 5767.1,
                "nzd": 959.34,
                "php": 33488,
                "pkr": 106673,
                "pln": 2625.23,
                "rub": 51918,
                "sar": 2627.68,
                "sek": 5823.37,
                "sgd": 21.5,
                "thb": 21774,
                "try": 5793.65,
                "twd": 19426.82,
                "uah": 19447.06,
                "usd": 700.65,
                "vef": 70.16,
                "vnd": 16150944,
                "xag": 25.46,
                "xau": 0.380423,
                "xdr": 485.42,
                "xlm": 938.52,
                "xrp": 451.499,
                "yfi": 0.01242147,
                "zar": 9809.65,
                "bits": 12082.51,
                "link": 13.818537,
                "sats": 1208251
            },
            "ath_change_percentage": {
                "aed": -98.17294,
                "ars": -83.61395,
                "aud": -97.78512,
                "bch": -91.36765,
                "bdt": -97.63283,
                "bhd": -98.17347,
                "bmd": -98.17288,
                "bnb": -97.00507,
                "brl": -98.26203,
                "btc": -98.29515,
                "cad": -97.94556,
                "chf": -98.1983,
                "clp": -97.45472,
                "cny": -97.95006,
                "czk": -97.96099,
                "dkk": -97.93876,
                "dot": -91.31026,
                "eos": -78.10228,
                "eth": -97.75392,
                "eur": -97.94388,
                "gbp": -97.95383,
                "gel": -21.90974,
                "hkd": -98.15811,
                "huf": -97.73702,
                "idr": -97.96885,
                "ils": -97.99757,
                "inr": -97.93691,
                "jpy": -97.4679,
                "krw": -97.80541,
                "kwd": -98.13041,
                "lkr": -97.12468,
                "ltc": -91.3546,
                "mmk": -97.53409,
                "mxn": -98.4323,
                "myr": -97.89086,
                "ngn": -92.98934,
                "nok": -97.64324,
                "nzd": -97.8078,
                "php": -97.85467,
                "pkr": -96.67593,
                "pln": -98.05415,
                "rub": -97.74408,
                "sar": -98.17289,
                "sek": -97.72217,
                "sgd": -19.80147,
                "thb": -97.88486,
                "try": -93.07823,
                "twd": -97.91682,
                "uah": -97.49378,
                "usd": -98.17288,
                "vef": -98.17288,
                "vnd": -98.04604,
                "xag": -97.76862,
                "xau": -98.35079,
                "xdr": -98.01022,
                "xlm": -89.02631,
                "xrp": -95.19537,
                "yfi": -88.31785,
                "zar": -97.49026,
                "bits": -98.29515,
                "link": -95.33983,
                "sats": -98.29515
            },
            "ath_date": {
                "aed": "2021-05-10T16:05:53.653Z",
                "ars": "2021-05-10T16:05:53.653Z",
                "aud": "2021-05-10T16:05:53.653Z",
                "bch": "2021-05-10T16:05:53.653Z",
                "bdt": "2021-05-10T16:05:53.653Z",
                "bhd": "2021-05-10T16:05:53.653Z",
                "bmd": "2021-05-10T16:05:53.653Z",
                "bnb": "2021-05-10T16:05:53.653Z",
                "brl": "2021-05-10T16:05:53.653Z",
                "btc": "2021-05-10T16:05:53.653Z",
                "cad": "2021-05-10T16:05:53.653Z",
                "chf": "2021-05-10T16:05:53.653Z",
                "clp": "2021-05-10T16:05:53.653Z",
                "cny": "2021-05-10T16:05:53.653Z",
                "czk": "2021-05-10T16:05:53.653Z",
                "dkk": "2021-05-10T16:05:53.653Z",
                "dot": "2021-05-10T16:05:53.653Z",
                "eos": "2021-05-10T16:05:53.653Z",
                "eth": "2021-05-10T16:05:53.653Z",
                "eur": "2021-05-10T16:05:53.653Z",
                "gbp": "2021-05-10T16:05:53.653Z",
                "gel": "2024-01-03T05:55:24.526Z",
                "hkd": "2021-05-10T16:05:53.653Z",
                "huf": "2021-05-10T16:05:53.653Z",
                "idr": "2021-05-10T16:05:53.653Z",
                "ils": "2021-05-10T16:05:53.653Z",
                "inr": "2021-05-10T16:05:53.653Z",
                "jpy": "2021-05-10T16:05:53.653Z",
                "krw": "2021-05-10T16:05:53.653Z",
                "kwd": "2021-05-10T16:05:53.653Z",
                "lkr": "2021-05-10T16:05:53.653Z",
                "ltc": "2021-05-10T16:05:53.653Z",
                "mmk": "2021-05-10T16:05:53.653Z",
                "mxn": "2021-05-10T16:05:53.653Z",
                "myr": "2021-05-10T16:05:53.653Z",
                "ngn": "2021-05-10T16:05:53.653Z",
                "nok": "2021-05-10T16:05:53.653Z",
                "nzd": "2021-05-10T16:05:53.653Z",
                "php": "2021-05-10T16:05:53.653Z",
                "pkr": "2021-05-10T16:05:53.653Z",
                "pln": "2021-05-10T16:05:53.653Z",
                "rub": "2021-05-10T16:05:53.653Z",
                "sar": "2021-05-10T16:05:53.653Z",
                "sek": "2021-05-10T16:05:53.653Z",
                "sgd": "2024-01-03T05:55:24.526Z",
                "thb": "2021-05-10T16:05:53.653Z",
                "try": "2021-05-10T16:05:53.653Z",
                "twd": "2021-05-10T16:05:53.653Z",
                "uah": "2021-05-10T16:05:53.653Z",
                "usd": "2021-05-10T16:05:53.653Z",
                "vef": "2021-05-10T16:05:53.653Z",
                "vnd": "2021-05-10T16:05:53.653Z",
                "xag": "2021-05-10T16:05:53.653Z",
                "xau": "2021-05-10T16:05:53.653Z",
                "xdr": "2021-05-10T16:05:53.653Z",
                "xlm": "2021-05-10T16:05:53.653Z",
                "xrp": "2021-05-10T16:05:53.653Z",
                "yfi": "2021-05-10T16:05:53.653Z",
                "zar": "2021-05-10T16:05:53.653Z",
                "bits": "2021-05-10T16:05:53.653Z",
                "link": "2021-05-10T16:05:53.653Z",
                "sats": "2021-05-10T16:05:53.653Z"
            },
            "atl": {
                "aed": 10.52,
                "ars": 569,
                "aud": 4.47,
                "bch": 0.01238871,
                "bdt": 314.64,
                "bhd": 1.08,
                "bmd": 2.87,
                "bnb": 0.0124166,
                "brl": 14.09,
                "btc": 0.00010201,
                "cad": 3.86,
                "chf": 2.57,
                "clp": 2546.73,
                "cny": 20.88,
                "czk": 65.74,
                "dkk": 20,
                "dot": 0.64210102,
                "eos": 3.289426,
                "eth": 0.0017806,
                "eur": 2.68,
                "gbp": 2.31,
                "gel": 14.75,
                "hkd": 22.41,
                "huf": 1033.52,
                "idr": 44145,
                "ils": 10.93,
                "inr": 237.38,
                "jpy": 423.12,
                "krw": 3827.52,
                "kwd": 0.884826,
                "lkr": 927.67,
                "ltc": 0.03670995,
                "mmk": 6020.3,
                "mxn": 49.37,
                "myr": 13.44,
                "ngn": 1525.61,
                "nok": 30.75,
                "nzd": 4.79,
                "php": 162.88,
                "pkr": 765.25,
                "pln": 12.32,
                "rub": 214.26,
                "sar": 10.75,
                "sek": 31.46,
                "sgd": 3.92,
                "thb": 102.89,
                "try": 63.37,
                "twd": 92.1,
                "uah": 105.26,
                "usd": 2.87,
                "vef": 0.286874,
                "vnd": 69622,
                "xag": 0.122236,
                "xau": 0.00149098,
                "xdr": 2.17,
                "xlm": 22.764668,
                "xrp": 4.834177,
                "yfi": 0.00028515,
                "zar": 54.24,
                "bits": 102.01,
                "link": 0.26511792,
                "sats": 10200.63
            },
            "atl_change_percentage": {
                "aed": 346.8139,
                "ars": 1795.17639,
                "aud": 340.60512,
                "bch": 225.45001,
                "bdt": 347.08956,
                "bhd": 346.72152,
                "bmd": 346.82583,
                "bnb": 153.69344,
                "brl": 351.59518,
                "btc": 101.93658,
                "cad": 350.47548,
                "chf": 341.49608,
                "clp": 385.97046,
                "cny": 341.37497,
                "czk": 356.49112,
                "dkk": 341.13174,
                "dot": 136.48625,
                "eos": 345.17117,
                "eth": 110.32615,
                "eur": 341.45548,
                "gbp": 338.28566,
                "gel": 129.97967,
                "hkd": 347.25474,
                "huf": 350.86001,
                "idr": 356.3271,
                "ils": 317.60627,
                "inr": 347.00061,
                "jpy": 355.8019,
                "krw": 346.88144,
                "kwd": 345.33996,
                "lkr": 327.91759,
                "ltc": 312.541,
                "mmk": 347.11515,
                "mxn": 342.16396,
                "myr": 351.73233,
                "ngn": 1222.10626,
                "nok": 341.94455,
                "nzd": 338.69666,
                "php": 341.08432,
                "pkr": 363.36519,
                "pln": 314.67946,
                "rub": 446.63451,
                "sar": 346.7353,
                "sek": 321.63823,
                "sgd": 340.08795,
                "thb": 347.59767,
                "try": 532.78524,
                "twd": 339.41782,
                "uah": 363.04439,
                "usd": 346.82583,
                "vef": 346.82583,
                "vnd": 353.27871,
                "xag": 364.69924,
                "xau": 320.79297,
                "xdr": 345.05959,
                "xlm": 352.41306,
                "xrp": 348.73989,
                "yfi": 408.88073,
                "zar": 353.86734,
                "bits": 101.93658,
                "link": 142.89845,
                "sats": 101.93658
            },
            "atl_date": {
                "aed": "2023-09-22T00:29:57.369Z",
                "ars": "2022-11-09T23:27:14.448Z",
                "aud": "2023-09-22T00:29:57.369Z",
                "bch": "2023-10-03T02:40:08.830Z",
                "bdt": "2023-09-22T00:29:57.369Z",
                "bhd": "2023-09-22T00:29:57.369Z",
                "bmd": "2023-09-22T00:29:57.369Z",
                "bnb": "2022-11-26T20:25:23.841Z",
                "brl": "2023-09-15T01:19:55.629Z",
                "btc": "2023-10-27T02:05:16.834Z",
                "cad": "2023-09-22T00:29:57.369Z",
                "chf": "2023-09-13T08:00:01.314Z",
                "clp": "2023-09-22T00:29:57.369Z",
                "cny": "2023-10-10T04:20:01.078Z",
                "czk": "2023-09-22T00:29:57.369Z",
                "dkk": "2023-09-13T08:00:01.314Z",
                "dot": "2022-11-13T07:38:16.073Z",
                "eos": "2022-08-22T21:01:43.309Z",
                "eth": "2023-09-15T01:50:51.609Z",
                "eur": "2023-09-13T08:00:01.314Z",
                "gbp": "2023-09-13T08:00:01.314Z",
                "gel": "2023-12-13T04:20:40.987Z",
                "hkd": "2023-09-22T00:29:57.369Z",
                "huf": "2023-09-13T08:00:01.314Z",
                "idr": "2023-09-22T00:29:57.369Z",
                "ils": "2023-09-22T00:29:57.369Z",
                "inr": "2023-09-22T00:29:57.369Z",
                "jpy": "2023-09-22T00:29:57.369Z",
                "krw": "2023-09-13T08:00:01.314Z",
                "kwd": "2023-09-22T00:29:57.369Z",
                "lkr": "2023-09-13T08:00:01.314Z",
                "ltc": "2023-07-02T20:45:49.067Z",
                "mmk": "2023-09-22T00:29:57.369Z",
                "mxn": "2023-09-22T00:29:57.369Z",
                "myr": "2023-09-22T00:29:57.369Z",
                "ngn": "2022-12-19T22:45:01.729Z",
                "nok": "2023-09-13T08:00:01.314Z",
                "nzd": "2023-10-11T16:15:20.785Z",
                "php": "2023-09-22T00:29:57.369Z",
                "pkr": "2022-12-19T22:45:01.729Z",
                "pln": "2023-10-11T16:15:20.785Z",
                "rub": "2022-11-22T10:01:59.363Z",
                "sar": "2023-09-22T00:29:57.369Z",
                "sek": "2023-10-12T10:05:27.635Z",
                "sgd": "2023-09-22T00:29:57.369Z",
                "thb": "2023-09-13T08:00:01.314Z",
                "try": "2022-12-19T22:45:01.729Z",
                "twd": "2023-09-13T08:05:01.662Z",
                "uah": "2023-10-12T10:05:27.635Z",
                "usd": "2023-09-22T00:29:57.369Z",
                "vef": "2023-09-22T00:29:57.369Z",
                "vnd": "2023-09-13T08:00:01.314Z",
                "xag": "2023-09-22T00:29:57.369Z",
                "xau": "2023-09-22T00:29:57.369Z",
                "xdr": "2023-09-13T08:00:01.314Z",
                "xlm": "2023-07-20T05:56:14.578Z",
                "xrp": "2023-07-20T02:41:15.614Z",
                "yfi": "2023-11-17T09:50:03.416Z",
                "zar": "2023-09-22T18:10:39.022Z",
                "bits": "2023-10-27T02:05:16.834Z",
                "link": "2023-11-10T16:30:43.024Z",
                "sats": "2023-10-27T02:05:16.834Z"
            },
            "market_cap": {
                "aed": 21608257445,
                "ars": 4955562364168,
                "aud": 9061656176,
                "bch": 18581635,
                "bdt": 646471448975,
                "bhd": 2217301367,
                "bmd": 5883183777,
                "bnb": 14501992,
                "brl": 29245306553,
                "btc": 94811,
                "cad": 7996335141,
                "chf": 5214818800,
                "clp": 5687744411489,
                "cny": 42353040007,
                "czk": 137936762067,
                "dkk": 40566646553,
                "dot": 698637806,
                "eos": 6729490500,
                "eth": 1716609,
                "eur": 5441674367,
                "gbp": 4656386996,
                "gel": 15590437008,
                "hkd": 46053833229,
                "huf": 2143634810890,
                "idr": 92555717968561,
                "ils": 20980315825,
                "inr": 487700932957,
                "jpy": 886408602925,
                "krw": 7860491545446,
                "kwd": 1810908681,
                "lkr": 1824321646237,
                "ltc": 69672103,
                "mmk": 12370413998955,
                "mxn": 100332398560,
                "myr": 27895115876,
                "ngn": 9269483184980,
                "nok": 62451331271,
                "nzd": 9668000629,
                "php": 330158402122,
                "pkr": 1629572002114,
                "pln": 23497035947,
                "rub": 538260178921,
                "sar": 22064021809,
                "sek": 60984524125,
                "sgd": 7924248491,
                "thb": 211676952280,
                "try": 184295844287,
                "twd": 186020387831,
                "uah": 223985608181,
                "usd": 5883183777,
                "vef": 589083192,
                "vnd": 145031050931746,
                "xag": 261167236,
                "xau": 2884643,
                "xdr": 4438826860,
                "xlm": 47366548648,
                "xrp": 9963609982,
                "yfi": 666263,
                "zar": 113186037307,
                "bits": 94810896584,
                "link": 295804584,
                "sats": 9481089658365
            },
            "market_cap_rank": 22,
            "fully_diluted_valuation": {
                "aed": 24214020204,
                "ars": 5553158902930,
                "aud": 10154410937,
                "bch": 20822415,
                "bdt": 724430128924,
                "bhd": 2484688098,
                "bmd": 6592643169,
                "bnb": 16250803,
                "brl": 32772029191,
                "btc": 106244,
                "cad": 8960621705,
                "chf": 5843679349,
                "clp": 6373635562459,
                "cny": 47460438170,
                "czk": 154570702985,
                "dkk": 45458621628,
                "dot": 782887283,
                "eos": 7541006920,
                "eth": 1923617,
                "eur": 6097891669,
                "gbp": 5217905659,
                "gel": 17470504397,
                "hkd": 51607513985,
                "huf": 2402138013800,
                "idr": 103717110487904,
                "ils": 23510354435,
                "inr": 546513307430,
                "jpy": 993301559589,
                "krw": 8808396585343,
                "kwd": 2029288086,
                "lkr": 2044318534837,
                "ltc": 78073936,
                "mmk": 13862175386577,
                "mxn": 112431589268,
                "myr": 31259017584,
                "ngn": 10387300026012,
                "nok": 69982403764,
                "nzd": 10833875113,
                "php": 369972555159,
                "pkr": 1826083823893,
                "pln": 26330568515,
                "rub": 603169546665,
                "sar": 24724745678,
                "sek": 68338712784,
                "sgd": 8879842048,
                "thb": 237203301203,
                "try": 206520276261,
                "twd": 208452784345,
                "uah": 250996271017,
                "usd": 6592643169,
                "vef": 660121360,
                "vnd": 162520499692675,
                "xag": 292661670,
                "xau": 3232505,
                "xdr": 4974109715,
                "xlm": 53078531152,
                "xrp": 11165132313,
                "yfi": 746609,
                "zar": 126835261989,
                "bits": 106244243492,
                "link": 331475973,
                "sats": 10624424349195
            },
            "market_cap_fdv_ratio": 0.89,
            "total_volume": {
                "aed": 772653953,
                "ars": 177203459008,
                "aud": 323985440,
                "bch": 663931,
                "bdt": 23116103744,
                "bhd": 79275558,
                "bmd": 210367042,
                "bnb": 516725,
                "brl": 1045671456,
                "btc": 3387,
                "cad": 285889441,
                "chf": 186460931,
                "clp": 203378648964,
                "cny": 1514432336,
                "czk": 4931487311,
                "dkk": 1450499057,
                "dot": 24929114,
                "eos": 240158242,
                "eth": 61263,
                "eur": 194573316,
                "gbp": 166498361,
                "gel": 557472662,
                "hkd": 1646763724,
                "huf": 76684099035,
                "idr": 3306348768338,
                "ils": 750337166,
                "inr": 17439522876,
                "jpy": 31694740031,
                "krw": 280969112086,
                "kwd": 64748872,
                "lkr": 65232901629,
                "ltc": 2485498,
                "mmk": 442333182404,
                "mxn": 3586239934,
                "myr": 997455330,
                "ngn": 331452124140,
                "nok": 2232017667,
                "nzd": 345715093,
                "php": 11803730074,
                "pkr": 58269171081,
                "pln": 840094472,
                "rub": 19246755842,
                "sar": 788951930,
                "sek": 2179452413,
                "sgd": 283317915,
                "thb": 7567638789,
                "try": 6589979839,
                "twd": 6650438486,
                "uah": 8009131052,
                "usd": 210367042,
                "vef": 21064052,
                "vnd": 5185925573017,
                "xag": 9333676,
                "xau": 103137,
                "xdr": 158720671,
                "xlm": 1690003110,
                "xrp": 355480867,
                "yfi": 23784,
                "zar": 4046337057,
                "bits": 3387131307,
                "link": 10547894,
                "sats": 338713130669
            },
            "high_24h": {
                "aed": 49.04,
                "ars": 11240.18,
                "aud": 20.52,
                "bch": 0.04305927,
                "bdt": 1463.57,
                "bhd": 5.03,
                "bmd": 13.35,
                "bnb": 0.03259861,
                "brl": 66.34,
                "btc": 0.00021652,
                "cad": 18.13,
                "chf": 11.73,
                "clp": 13074.31,
                "cny": 96.06,
                "czk": 311.69,
                "dkk": 91.84,
                "dot": 1.553798,
                "eos": 15.070834,
                "eth": 0.00390455,
                "eur": 12.32,
                "gbp": 10.54,
                "gel": 35.52,
                "hkd": 104.52,
                "huf": 4830.52,
                "idr": 209930,
                "ils": 47.72,
                "inr": 1107.35,
                "jpy": 1999.35,
                "krw": 17805.79,
                "kwd": 4.11,
                "lkr": 4136.79,
                "ltc": 0.16194448,
                "mmk": 28005,
                "mxn": 228.12,
                "myr": 63.49,
                "ngn": 21381,
                "nok": 141.47,
                "nzd": 21.91,
                "php": 750.05,
                "pkr": 3722.3,
                "pln": 53.21,
                "rub": 1216.11,
                "sar": 50.08,
                "sek": 138.02,
                "sgd": 17.95,
                "thb": 478.85,
                "try": 416.93,
                "twd": 422.2,
                "uah": 508.81,
                "usd": 13.35,
                "vef": 1.34,
                "vnd": 329091,
                "xag": 0.59403,
                "xau": 0.00655518,
                "xdr": 10.05,
                "xlm": 105.754,
                "xrp": 22.35705,
                "yfi": 0.00152476,
                "zar": 256.23,
                "bits": 216.52,
                "link": 0.67307186,
                "sats": 21652
            },
            "low_24h": {
                "aed": 45.63,
                "ars": 10465.78,
                "aud": 19.12,
                "bch": 0.04015881,
                "bdt": 1364.21,
                "bhd": 4.68,
                "bmd": 12.42,
                "bnb": 0.03123613,
                "brl": 61.78,
                "btc": 0.0002038,
                "cad": 16.87,
                "chf": 10.99,
                "clp": 12010.59,
                "cny": 89.31,
                "czk": 291.33,
                "dkk": 85.71,
                "dot": 1.485728,
                "eos": 14.463309,
                "eth": 0.00371885,
                "eur": 11.5,
                "gbp": 9.84,
                "gel": 32.92,
                "hkd": 97.27,
                "huf": 4519.18,
                "idr": 195075,
                "ils": 44.38,
                "inr": 1030.13,
                "jpy": 1863.34,
                "krw": 16596.62,
                "kwd": 3.82,
                "lkr": 3849.88,
                "ltc": 0.14888158,
                "mmk": 26103,
                "mxn": 211.9,
                "myr": 59.04,
                "ngn": 19839.58,
                "nok": 131.96,
                "nzd": 20.42,
                "php": 698.44,
                "pkr": 3450.95,
                "pln": 49.63,
                "rub": 1133.61,
                "sar": 46.6,
                "sek": 128.89,
                "sgd": 16.72,
                "thb": 445.91,
                "try": 388.65,
                "twd": 392.98,
                "uah": 472.63,
                "usd": 12.42,
                "vef": 1.24,
                "vnd": 306284,
                "xag": 0.548018,
                "xau": 0.00607814,
                "xdr": 9.37,
                "xlm": 102.323,
                "xrp": 20.937391,
                "yfi": 0.00144058,
                "zar": 238.3,
                "bits": 203.8,
                "link": 0.6408861,
                "sats": 20380
            },
            "price_change_24h": -0.5181032894389,
            "price_change_percentage_24h": -3.88387,
            "price_change_percentage_7d": 3.09343,
            "price_change_percentage_14d": -4.07336,
            "price_change_percentage_30d": 9.31441,
            "price_change_percentage_60d": -4.78215,
            "price_change_percentage_200d": 213.59497,
            "price_change_percentage_1y": 110.86615,
            "market_cap_change_24h": -259156705.03166,
            "market_cap_change_percentage_24h": -4.21918,
            "price_change_24h_in_currency": {
                "aed": -1.9030004995187326,
                "ars": -428.37278417766174,
                "aud": -0.7480243966955946,
                "bch": -0.001736715419902439,
                "bdt": -53.227988188601785,
                "bhd": -0.1963113046063958,
                "bmd": -0.5181032894389723,
                "bnb": -0.000566918724336056,
                "brl": -2.536650434026548,
                "btc": -0.000005809787707195,
                "cad": -0.6915244390226434,
                "chf": -0.3523070736602758,
                "clp": -665.7725370247445,
                "cny": -3.6657942646086923,
                "czk": -10.80693140001415,
                "dkk": -3.3246461016511546,
                "dot": 0.00431776,
                "eos": -0.4311020965759713,
                "eth": -0.000099717072388864,
                "eur": -0.44696321316880017,
                "gbp": -0.3848354675219863,
                "gel": -1.506372292143503,
                "hkd": -4.0391703518615,
                "huf": -152.6439389577854,
                "idr": -8205.683005802857,
                "ils": -1.95799795753841,
                "inr": -43.34719064531487,
                "jpy": -65.42996227922686,
                "krw": -663.1777833397573,
                "kwd": -0.15683905952634092,
                "lkr": -156.8504699504174,
                "ltc": -0.009875373782898931,
                "mmk": -1018.1427910079037,
                "mxn": -9.271413047141891,
                "myr": -2.6300048945442995,
                "ngn": -861.9301565867027,
                "nok": -5.369564353015562,
                "nzd": -0.8063703862945921,
                "php": -29.94574382690746,
                "pkr": -167.19901484540105,
                "pln": -2.0066527695450063,
                "rub": -41.844202813796755,
                "sar": -1.9428332170417661,
                "sek": -5.041219876008881,
                "sgd": -0.6699703669902028,
                "thb": -17.421833892744985,
                "try": -14.85535181241653,
                "twd": -16.53249338179387,
                "uah": -20.166788866235777,
                "usd": -0.5181032894389723,
                "vef": -0.05187768237152368,
                "vnd": -12691.08924236364,
                "xag": -0.023802680033191415,
                "xau": -0.000262948204246965,
                "xdr": -0.36406602994577497,
                "xlm": -2.68775157988145,
                "xrp": -0.6826286569857167,
                "yfi": -0.000052930241889896,
                "zar": -9.330626472185912,
                "bits": -5.809787707194715,
                "link": -0.015039351532203373,
                "sats": -580.97877071947
            },
            "price_change_percentage_1h_in_currency": {
                "aed": 1.46449,
                "ars": 1.46595,
                "aud": 1.66487,
                "bch": 0.38666,
                "bdt": 1.46379,
                "bhd": 1.45168,
                "bmd": 1.46379,
                "bnb": 0.49753,
                "brl": 1.46379,
                "btc": 0.47262,
                "cad": 1.56678,
                "chf": 1.51361,
                "clp": 1.46379,
                "cny": 1.47507,
                "czk": 1.46379,
                "dkk": 1.48759,
                "dot": 0.58626,
                "eos": 0.5241,
                "eth": -0.35563,
                "eur": 1.48289,
                "gbp": 1.46559,
                "gel": 1.46379,
                "hkd": 1.45853,
                "huf": 1.75931,
                "idr": 1.43158,
                "ils": 1.6576,
                "inr": 1.50224,
                "jpy": 1.58268,
                "krw": 1.50585,
                "kwd": 1.45885,
                "lkr": 1.46379,
                "ltc": 1.22193,
                "mmk": 1.46379,
                "mxn": 1.41821,
                "myr": 1.4959,
                "ngn": 1.46379,
                "nok": 1.44138,
                "nzd": 1.52242,
                "php": 1.59809,
                "pkr": 1.46379,
                "pln": 1.45312,
                "rub": 1.46379,
                "sar": 1.46523,
                "sek": 1.41706,
                "sgd": 1.52365,
                "thb": 1.58664,
                "try": 1.46408,
                "twd": 1.46379,
                "uah": 1.46379,
                "usd": 1.46379,
                "vef": 1.46379,
                "vnd": 1.46379,
                "xag": 1.91915,
                "xau": 1.78143,
                "xdr": 1.46379,
                "xlm": 0.66211,
                "xrp": 0.29291,
                "yfi": 0.19426,
                "zar": 1.7205,
                "bits": 0.47262,
                "link": 0.3124,
                "sats": 0.47262
            },
            "price_change_percentage_24h_in_currency": {
                "aed": -3.88401,
                "ars": -3.81494,
                "aud": -3.64983,
                "bch": -4.11515,
                "bdt": -3.64041,
                "bhd": -3.90427,
                "bmd": -3.88387,
                "bnb": -1.76825,
                "brl": -3.82777,
                "btc": -2.73719,
                "cad": -3.81713,
                "chf": -3.0068,
                "clp": -5.09718,
                "cny": -3.81975,
                "czk": -3.47068,
                "dkk": -3.62431,
                "dot": 0.28498,
                "eos": -2.86093,
                "eth": -2.60108,
                "eur": -3.63205,
                "gbp": -3.65368,
                "gel": -4.24521,
                "hkd": -3.86862,
                "huf": -3.16262,
                "idr": -3.91258,
                "ils": -4.10562,
                "inr": -3.9183,
                "jpy": -3.27607,
                "krw": -3.72821,
                "kwd": -3.82232,
                "lkr": -3.7953,
                "ltc": -6.11989,
                "mmk": -3.63907,
                "mxn": -4.06907,
                "myr": -4.14668,
                "ngn": -4.09201,
                "nok": -3.79717,
                "nzd": -3.68584,
                "php": -3.99609,
                "pkr": -4.4962,
                "pln": -3.7712,
                "rub": -3.44418,
                "sar": -3.88341,
                "sek": -3.6563,
                "sgd": -3.73491,
                "thb": -3.63967,
                "try": -3.56662,
                "twd": -3.91883,
                "uah": -3.96735,
                "usd": -3.88387,
                "vef": -3.88387,
                "vnd": -3.86017,
                "xag": -4.01608,
                "xau": -4.01505,
                "xdr": -3.62688,
                "xlm": -2.54299,
                "xrp": -3.0544,
                "yfi": -3.52266,
                "zar": -3.64545,
                "bits": -2.73719,
                "link": -2.28587,
                "sats": -2.73719
            },
            "price_change_percentage_7d_in_currency": {
                "aed": 3.0916,
                "ars": 3.58481,
                "aud": 4.34453,
                "bch": -15.07842,
                "bdt": 3.19314,
                "bhd": 3.09808,
                "bmd": 3.09343,
                "bnb": -4.61828,
                "brl": 3.22841,
                "btc": -15.52509,
                "cad": 3.95729,
                "chf": 3.76093,
                "clp": 1.81908,
                "cny": 3.10488,
                "czk": 3.20877,
                "dkk": 3.26134,
                "dot": -10.2618,
                "eos": -9.57016,
                "eth": -12.14554,
                "eur": 3.25273,
                "gbp": 3.35408,
                "gel": 3.09343,
                "hkd": 3.15255,
                "huf": 4.88301,
                "idr": 3.81137,
                "ils": 1.32035,
                "inr": 3.10581,
                "jpy": 3.17218,
                "krw": 3.49814,
                "kwd": 3.11018,
                "lkr": 2.53081,
                "ltc": -16.85937,
                "mmk": 3.18536,
                "mxn": 2.69852,
                "myr": 2.18825,
                "ngn": 1.20117,
                "nok": 4.16031,
                "nzd": 5.03864,
                "php": 3.41443,
                "pkr": 1.92928,
                "pln": 3.11256,
                "rub": 0.87685,
                "sar": 3.09027,
                "sek": 3.54539,
                "sgd": 3.31559,
                "thb": 2.95033,
                "try": 3.90201,
                "twd": 3.04291,
                "uah": 1.74692,
                "usd": 3.09343,
                "vef": 3.09343,
                "vnd": 3.32216,
                "xag": 3.61854,
                "xau": 2.18056,
                "xdr": 3.0036,
                "xlm": -5.03788,
                "xrp": -6.51125,
                "yfi": -13.91269,
                "zar": 3.07973,
                "bits": -15.52509,
                "link": -7.36319,
                "sats": -15.52509
            },
            "price_change_percentage_14d_in_currency": {
                "aed": -4.07193,
                "ars": -3.17728,
                "aud": -3.62047,
                "bch": -19.00335,
                "bdt": -3.69274,
                "bhd": -4.09041,
                "bmd": -4.07336,
                "bnb": -16.30142,
                "brl": -4.13508,
                "btc": -19.93845,
                "cad": -3.27867,
                "chf": -3.49588,
                "clp": -4.16357,
                "cny": -3.0022,
                "czk": -4.54651,
                "dkk": -4.5154,
                "dot": -11.92808,
                "eos": -15.57723,
                "eth": -21.34365,
                "eur": -4.5037,
                "gbp": -4.40214,
                "gel": -4.07336,
                "hkd": -4.00165,
                "huf": -3.28978,
                "idr": -3.59001,
                "ils": -5.50347,
                "inr": -4.21767,
                "jpy": -3.77418,
                "krw": -4.02936,
                "kwd": -4.12943,
                "lkr": -4.68229,
                "ltc": -20.79204,
                "mmk": -3.69063,
                "mxn": -4.01653,
                "myr": -4.77627,
                "ngn": 1.05782,
                "nok": -3.42821,
                "nzd": -3.79882,
                "php": -3.8082,
                "pkr": -4.62483,
                "pln": -5.07924,
                "rub": -4.95101,
                "sar": -4.0707,
                "sek": -4.9959,
                "sgd": -4.02105,
                "thb": -4.23176,
                "try": -2.50181,
                "twd": -3.31797,
                "uah": -3.39484,
                "usd": -4.07336,
                "vef": -4.07336,
                "vnd": -3.50582,
                "xag": -2.09852,
                "xau": -5.65139,
                "xdr": -3.82582,
                "xlm": -10.10611,
                "xrp": -8.36689,
                "yfi": -15.08124,
                "zar": -2.41115,
                "bits": -19.93845,
                "link": -4.17063,
                "sats": -19.93845
            },
            "price_change_percentage_30d_in_currency": {
                "aed": 9.31099,
                "ars": 11.51708,
                "aud": 10.59472,
                "bch": -18.40392,
                "bdt": 9.33883,
                "bhd": 9.27005,
                "bmd": 9.31441,
                "bnb": -17.69811,
                "brl": 9.7782,
                "btc": -24.32619,
                "cad": 10.71294,
                "chf": 12.18615,
                "clp": 13.31473,
                "cny": 10.82695,
                "czk": 11.73234,
                "dkk": 9.28607,
                "dot": -11.0814,
                "eos": -12.44561,
                "eth": -25.60776,
                "eur": 9.2805,
                "gbp": 9.628,
                "gel": 8.09074,
                "hkd": 9.45004,
                "huf": 11.469,
                "idr": 8.80624,
                "ils": 6.42023,
                "inr": 9.10674,
                "jpy": 11.55075,
                "krw": 9.44661,
                "kwd": 9.36487,
                "lkr": 6.78964,
                "ltc": -12.10407,
                "mmk": 9.3442,
                "mxn": 8.61065,
                "myr": 9.59177,
                "ngn": 81.03086,
                "nok": 10.70967,
                "nzd": 9.95936,
                "php": 8.92647,
                "pkr": 8.22507,
                "pln": 8.5992,
                "rub": 11.507,
                "sar": 9.31864,
                "sek": 8.65052,
                "sgd": 9.79139,
                "thb": 10.95999,
                "try": 12.80523,
                "twd": 10.3959,
                "uah": 9.91968,
                "usd": 9.31441,
                "vef": 9.31441,
                "vnd": 10.28451,
                "xag": 11.8486,
                "xau": 9.14966,
                "xdr": 9.73021,
                "xlm": -0.75577,
                "xrp": -5.39602,
                "yfi": -10.85784,
                "zar": 11.89928,
                "bits": -24.32619,
                "link": -13.39349,
                "sats": -24.32619
            },
            "price_change_percentage_60d_in_currency": {
                "aed": -4.77994,
                "ars": -1.00845,
                "aud": -0.10577,
                "bch": -20.02945,
                "bdt": -4.98022,
                "bhd": -5.09769,
                "bmd": -4.78215,
                "bnb": -27.39527,
                "brl": -2.48086,
                "btc": -34.88361,
                "cad": -2.34966,
                "chf": 0.29388,
                "clp": 3.92151,
                "cny": -3.16258,
                "czk": -0.26204,
                "dkk": -2.7913,
                "dot": -8.00171,
                "eos": -7.91933,
                "eth": -36.64838,
                "eur": -2.72318,
                "gbp": -4.04955,
                "gel": -6.02335,
                "hkd": -4.55182,
                "huf": -0.04906,
                "idr": -2.75871,
                "ils": -5.72835,
                "inr": -5.10785,
                "jpy": 1.72235,
                "krw": -1.76027,
                "kwd": -4.8174,
                "lkr": -9.14417,
                "ltc": -17.56811,
                "mmk": -4.98083,
                "mxn": -4.37101,
                "myr": -1.74636,
                "ngn": 66.76996,
                "nok": -0.70451,
                "nzd": -1.10463,
                "php": -3.55807,
                "pkr": -5.51363,
                "pln": -3.53146,
                "rub": -2.39006,
                "sar": -4.77303,
                "sek": -2.21597,
                "sgd": -2.81548,
                "thb": -0.51352,
                "try": 1.28614,
                "twd": -1.89647,
                "uah": -4.97573,
                "usd": -4.78215,
                "vef": -4.78215,
                "vnd": -3.28425,
                "xag": 0.51982,
                "xau": -3.54266,
                "xdr": -3.90255,
                "xlm": -1.81567,
                "xrp": -1.07161,
                "yfi": -13.40927,
                "zar": 0.10726,
                "bits": -34.88361,
                "link": -27.39242,
                "sats": -34.88361
            },
            "price_change_percentage_200d_in_currency": {
                "aed": 213.58131,
                "ars": 819.40699,
                "aud": 213.24879,
                "bch": 126.89532,
                "bdt": 213.20616,
                "bhd": 213.481,
                "bmd": 213.59497,
                "bnb": 84.99875,
                "brl": 217.69826,
                "btc": 48.26212,
                "cad": 216.57976,
                "chf": 217.15887,
                "clp": 252.42934,
                "cny": 213.29468,
                "czk": 234.47325,
                "dkk": 217.62341,
                "dot": 85.6358,
                "eos": 157.64787,
                "eth": 68.59837,
                "eur": 217.49273,
                "gbp": 214.79095,
                "gel": 218.40102,
                "hkd": 214.07141,
                "huf": 227.01656,
                "idr": 221.75923,
                "ils": 199.34535,
                "inr": 213.2947,
                "jpy": 226.25887,
                "krw": 214.81141,
                "kwd": 213.79071,
                "lkr": 201.35781,
                "ltc": 204.186,
                "mmk": 212.38573,
                "mxn": 214.55477,
                "myr": 222.26063,
                "ngn": 538.98495,
                "nok": 217.88891,
                "nzd": 207.98729,
                "php": 208.87282,
                "pkr": 199.63828,
                "pln": 208.82022,
                "rub": 184.29661,
                "sar": 213.44996,
                "sek": 199.52361,
                "sgd": 211.89052,
                "thb": 220.81414,
                "try": 263.14167,
                "twd": 210.46708,
                "uah": 221.61962,
                "usd": 213.59497,
                "vef": 213.59497,
                "vnd": 224.72715,
                "xag": 215.75931,
                "xau": 194.35815,
                "xdr": 214.69736,
                "xlm": 246.11092,
                "xrp": 231.70728,
                "yfi": 123.53356,
                "zar": 217.77107,
                "bits": 48.26212,
                "link": 17.14792,
                "sats": 48.26212
            },
            "price_change_percentage_1y_in_currency": {
                "aed": 110.86816,
                "ars": 800.91833,
                "aud": 119.59954,
                "bch": -9.73915,
                "bdt": 121.23629,
                "bhd": 110.76324,
                "bmd": 110.86615,
                "bnb": 57.32491,
                "brl": 100.14749,
                "btc": -19.4938,
                "cad": 110.64063,
                "chf": 99.03214,
                "clp": 146.36983,
                "cny": 119.99412,
                "czk": 123.84077,
                "dkk": 107.73371,
                "dot": 63.40096,
                "eos": 184.43271,
                "eth": 1.39693,
                "eur": 107.41294,
                "gbp": 101.60565,
                "gel": 112.4697,
                "hkd": 110.27787,
                "huf": 116.37519,
                "idr": 117.51001,
                "ils": 107.36831,
                "inr": 111.7097,
                "jpy": 133.46515,
                "krw": 114.75371,
                "kwd": 111.49282,
                "lkr": 80.21249,
                "ltc": 142.35047,
                "mmk": 110.65236,
                "mxn": 96.88297,
                "myr": 123.59876,
                "ngn": 620.61143,
                "nok": 116.98077,
                "nzd": 116.08178,
                "php": 114.97195,
                "pkr": 122.84996,
                "pln": 90.54559,
                "rub": 156.49269,
                "sar": 110.73332,
                "sek": 109.90069,
                "sgd": 111.27858,
                "thb": 116.97922,
                "try": 249.73475,
                "twd": 117.90009,
                "uah": 116.87269,
                "usd": 110.86615,
                "vef": 110.86615,
                "vnd": 119.07936,
                "xag": 97.11359,
                "xau": 89.68011,
                "xdr": 110.53577,
                "xlm": 49.86355,
                "xrp": 36.21429,
                "yfi": 127.65277,
                "zar": 122.97129,
                "bits": -19.4938,
                "link": -21.74522,
                "sats": -19.4938
            },
            "market_cap_change_24h_in_currency": {
                "aed": -951883486.2625542,
                "ars": -214752920469.54395,
                "aud": -378826311.4439087,
                "bch": -834994.9904164635,
                "bdt": -26772015050.534058,
                "bhd": -97894176.50331354,
                "bmd": -259156705.031662,
                "bnb": -311388.5220366437,
                "brl": -1269840959.2675972,
                "btc": -3033.634732296574,
                "cad": -346400540.3304806,
                "chf": -180342815.60891056,
                "clp": -326466847642.8096,
                "cny": -1836185885.2113495,
                "czk": -5389636500.490204,
                "dkk": -1650734486.7585068,
                "dot": -599603.8549194336,
                "eos": -212587615.05249882,
                "eth": -51310.95821017795,
                "eur": -221815393.1230278,
                "gbp": -192788116.61171246,
                "gel": -748188673.149622,
                "hkd": -2021006540.253868,
                "huf": -77631417197.75415,
                "idr": -4015032916724.4844,
                "ils": -965646339.5588074,
                "inr": -21668289876.660828,
                "jpy": -33721679140.830444,
                "krw": -329898232742.24316,
                "kwd": -78432254.30751705,
                "lkr": -78608443893.26587,
                "ltc": -4629491.611105755,
                "mmk": -512110588319.14844,
                "mxn": -4585459731.381439,
                "myr": -1327068964.612877,
                "ngn": -429326666154.2754,
                "nok": -2653184337.9735565,
                "nzd": -412323324.3234329,
                "php": -14918279990.34082,
                "pkr": -82691651728.86475,
                "pln": -991971881.102768,
                "rub": -21151521032.499268,
                "sar": -971849534.916069,
                "sek": -2480183129.823761,
                "sgd": -335295331.6620121,
                "thb": -8765505263.215485,
                "try": -7484001775.442078,
                "twd": -8224999843.485626,
                "uah": -10069934301.441986,
                "usd": -259156705.031662,
                "vef": -25949360.874820113,
                "vnd": -6351341548956.844,
                "xag": -11953162.463613242,
                "xau": -132045.01140120858,
                "xdr": -183173789.95721626,
                "xlm": -1323620350.5858536,
                "xrp": -370337120.98287964,
                "yfi": -23854.810779073858,
                "zar": -4758877502.985321,
                "bits": -3033634732.29657,
                "link": -8028958.641543686,
                "sats": -303363473229.65625
            },
            "market_cap_change_percentage_24h_in_currency": {
                "aed": -4.21932,
                "ars": -4.15357,
                "aud": -4.01279,
                "bch": -4.30041,
                "bdt": -3.97657,
                "bhd": -4.22833,
                "bmd": -4.21918,
                "bnb": -2.10208,
                "brl": -4.16135,
                "btc": -3.10046,
                "cad": -4.15212,
                "chf": -3.34268,
                "clp": -5.42826,
                "cny": -4.15528,
                "czk": -3.76039,
                "dkk": -3.91008,
                "dot": -0.08575,
                "eos": -3.06231,
                "eth": -2.90233,
                "eur": -3.91659,
                "gbp": -3.97569,
                "gel": -4.57926,
                "hkd": -4.20388,
                "huf": -3.49492,
                "idr": -4.15761,
                "ils": -4.40011,
                "inr": -4.25395,
                "jpy": -3.66488,
                "krw": -4.02787,
                "kwd": -4.1513,
                "lkr": -4.13092,
                "ltc": -6.23068,
                "mmk": -3.97523,
                "mxn": -4.37052,
                "myr": -4.54131,
                "ngn": -4.42659,
                "nok": -4.07527,
                "nzd": -4.09038,
                "php": -4.32318,
                "pkr": -4.82938,
                "pln": -4.05068,
                "rub": -3.78103,
                "sar": -4.21885,
                "sek": -3.90797,
                "sgd": -4.05949,
                "thb": -3.97632,
                "try": -3.90239,
                "twd": -4.23433,
                "uah": -4.30237,
                "usd": -4.21918,
                "vef": -4.21918,
                "vnd": -4.19556,
                "xag": -4.37652,
                "xau": -4.37715,
                "xdr": -3.96308,
                "xlm": -2.71846,
                "xrp": -3.58369,
                "yfi": -3.45663,
                "zar": -4.03483,
                "bits": -3.10046,
                "link": -2.64255,
                "sats": -3.10046
            },
            "total_supply": 514973168.523011,
            "max_supply": null,
            "circulating_supply": 459554948.291299,
            "last_updated": "2024-03-01T08:56:22.226Z"
        },
        "community_data": {
            "facebook_likes": null,
            "twitter_followers": 687599,
            "reddit_average_posts_48h": 0,
            "reddit_average_comments_48h": 0,
            "reddit_subscribers": 0,
            "reddit_accounts_active_48h": 0,
            "telegram_channel_user_count": 26391
        },
        "developer_data": {
            "forks": 280,
            "stars": 1399,
            "subscribers": 65,
            "total_issues": 148,
            "closed_issues": 104,
            "pull_requests_merged": 0,
            "pull_request_contributors": 0,
            "code_additions_deletions_4_weeks": {
                "additions": 55572,
                "deletions": -36372
            },
            "commit_count_4_weeks": 567,
            "last_4_weeks_commit_activity_series": []
        },
        "status_updates": [],
        "last_updated": "2024-03-01T08:56:22.226Z",
        "tickers": [
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Deepcoin",
                    "identifier": "deepcoin",
                    "has_trading_incentive": false
                },
                "last": 12.808,
                "volume": 182344.26576224,
                "converted_last": {
                    "btc": 0.00020607,
                    "eth": 0.00373973,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 35.474304,
                    "eth": 643.779,
                    "usd": 2206148
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017811,
                "timestamp": "2024-03-01T08:46:02+00:00",
                "last_traded_at": "2024-03-01T08:46:02+00:00",
                "last_fetch_at": "2024-03-01T08:46:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.deepcoin.com/en/Spot?currentId=ICP",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 12.815,
                "volume": 3940447.9,
                "converted_last": {
                    "btc": 0.00020649,
                    "eth": 0.00373773,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 824.93,
                    "eth": 14932,
                    "usd": 51193222
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017811,
                "timestamp": "2024-03-01T08:53:31+00:00",
                "last_traded_at": "2024-03-01T08:53:31+00:00",
                "last_fetch_at": "2024-03-01T08:53:31+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_USDT?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "XT.COM",
                    "identifier": "xt",
                    "has_trading_incentive": false
                },
                "last": 12.805,
                "volume": 60140.85,
                "converted_last": {
                    "btc": 0.00020648,
                    "eth": 0.00374114,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 12.601501,
                    "eth": 228.321,
                    "usd": 782235
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017815,
                "timestamp": "2024-03-01T08:51:35+00:00",
                "last_traded_at": "2024-03-01T08:51:35+00:00",
                "last_fetch_at": "2024-03-01T08:51:35+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.xt.com/en/trade/icp_usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Gate.io",
                    "identifier": "gate",
                    "has_trading_incentive": false
                },
                "last": 12.794,
                "volume": 1937829.6171614,
                "converted_last": {
                    "btc": 0.0002063,
                    "eth": 0.00373525,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 404.097,
                    "eth": 7316,
                    "usd": 25074911
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01562,
                "timestamp": "2024-03-01T08:52:02+00:00",
                "last_traded_at": "2024-03-01T08:52:02+00:00",
                "last_fetch_at": "2024-03-01T08:52:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://gate.io/trade/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "MEXC",
                    "identifier": "mxc",
                    "has_trading_incentive": false
                },
                "last": 12.805,
                "volume": 186174.22,
                "converted_last": {
                    "btc": 0.00020648,
                    "eth": 0.00374186,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 38.441384,
                    "eth": 696.638,
                    "usd": 2390883
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017806,
                "timestamp": "2024-03-01T08:50:22+00:00",
                "last_traded_at": "2024-03-01T08:50:22+00:00",
                "last_fetch_at": "2024-03-01T08:50:22+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.mexc.com/exchange/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "DigiFinex",
                    "identifier": "digifinex",
                    "has_trading_incentive": false
                },
                "last": 12.845,
                "volume": 25653.41,
                "converted_last": {
                    "btc": 0.00020667,
                    "eth": 0.00375053,
                    "usd": 12.85
                },
                "converted_volume": {
                    "btc": 5.301704,
                    "eth": 96.214,
                    "usd": 329713
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.023385,
                "timestamp": "2024-03-01T08:46:49+00:00",
                "last_traded_at": "2024-03-01T08:46:49+00:00",
                "last_fetch_at": "2024-03-01T08:46:49+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.digifinex.com/en-ww/trade/USDT/ICP",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 12.805,
                "volume": 1384191.7245,
                "converted_last": {
                    "btc": 0.00020636,
                    "eth": 0.00373627,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 285.642,
                    "eth": 5172,
                    "usd": 17724575
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.046853,
                "timestamp": "2024-03-01T08:52:13+00:00",
                "last_traded_at": "2024-03-01T08:52:13+00:00",
                "last_fetch_at": "2024-03-01T08:52:13+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/ICP-USD",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "KuCoin",
                    "identifier": "kucoin",
                    "has_trading_incentive": false
                },
                "last": 12.802,
                "volume": 1240591.9249,
                "converted_last": {
                    "btc": 0.00020643,
                    "eth": 0.00374098,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 256.098,
                    "eth": 4641,
                    "usd": 15928176
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017805,
                "timestamp": "2024-03-01T08:50:28+00:00",
                "last_traded_at": "2024-03-01T08:50:28+00:00",
                "last_fetch_at": "2024-03-01T08:50:28+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.kucoin.com/trade/ICP-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Bybit",
                    "identifier": "bybit_spot",
                    "has_trading_incentive": false
                },
                "last": 12.8175,
                "volume": 908925.78,
                "converted_last": {
                    "btc": 0.00020622,
                    "eth": 0.00374517,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 189.532,
                    "eth": 3442,
                    "usd": 11797727
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.019484,
                "timestamp": "2024-03-01T08:45:10+00:00",
                "last_traded_at": "2024-03-01T08:45:10+00:00",
                "last_fetch_at": "2024-03-01T08:45:10+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bybit.com/trade/spot/ICP/USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "BingX",
                    "identifier": "bingx",
                    "has_trading_incentive": false
                },
                "last": 12.819,
                "volume": 218347.451992,
                "converted_last": {
                    "btc": 0.00020625,
                    "eth": 0.00374561,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 45.680219,
                    "eth": 829.584,
                    "usd": 2843436
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.031221,
                "timestamp": "2024-03-01T08:45:59+00:00",
                "last_traded_at": "2024-03-01T08:45:59+00:00",
                "last_fetch_at": "2024-03-01T08:45:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://bingx.com/en-us/spot/ICPUSDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "OKX",
                    "identifier": "okex",
                    "has_trading_incentive": false
                },
                "last": 12.794,
                "volume": 1250067.692742,
                "converted_last": {
                    "btc": 0.0002063,
                    "eth": 0.00373525,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 261.369,
                    "eth": 4732,
                    "usd": 16218404
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.039047,
                "timestamp": "2024-03-01T08:52:43+00:00",
                "last_traded_at": "2024-03-01T08:52:43+00:00",
                "last_fetch_at": "2024-03-01T08:52:43+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.okx.com/trade-spot/icp-usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "LBank",
                    "identifier": "lbank",
                    "has_trading_incentive": false
                },
                "last": 12.821,
                "volume": 68316.31,
                "converted_last": {
                    "btc": 0.00020602,
                    "eth": 0.0037421,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 14.074581,
                    "eth": 255.647,
                    "usd": 876212
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015597,
                "timestamp": "2024-03-01T08:44:29+00:00",
                "last_traded_at": "2024-03-01T08:44:29+00:00",
                "last_fetch_at": "2024-03-01T08:44:29+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.lbank.com/trade/icp_usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 12.828,
                "volume": 420344.61202259,
                "converted_last": {
                    "btc": 0.00020656,
                    "eth": 0.00373726,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 86.825,
                    "eth": 1571,
                    "usd": 5392181
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.054585,
                "timestamp": "2024-03-01T08:54:40+00:00",
                "last_traded_at": "2024-03-01T08:54:40+00:00",
                "last_fetch_at": "2024-03-01T08:54:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/ICP-USD",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Bitget",
                    "identifier": "bitget",
                    "has_trading_incentive": false
                },
                "last": 12.8232,
                "volume": 200661.7016,
                "converted_last": {
                    "btc": 0.00020632,
                    "eth": 0.00374684,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 41.812574,
                    "eth": 759.345,
                    "usd": 2602688
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.033515,
                "timestamp": "2024-03-01T08:45:02+00:00",
                "last_traded_at": "2024-03-01T08:45:02+00:00",
                "last_fetch_at": "2024-03-01T08:45:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitget.com/spot/ICPUSDT?type=spot",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Crypto.com Exchange",
                    "identifier": "crypto_com",
                    "has_trading_incentive": false
                },
                "last": 12.804,
                "volume": 114734.5,
                "converted_last": {
                    "btc": 0.00020646,
                    "eth": 0.00374157,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 23.68861,
                    "eth": 429.287,
                    "usd": 1473326
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.060139,
                "timestamp": "2024-03-01T08:50:59+00:00",
                "last_traded_at": "2024-03-01T08:50:59+00:00",
                "last_fetch_at": "2024-03-01T08:50:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://crypto.com/exchange/trade/spot/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 11.821,
                "volume": 30354.59152542,
                "converted_last": {
                    "btc": 0.00020579,
                    "eth": 0.00372331,
                    "usd": 12.78
                },
                "converted_volume": {
                    "btc": 6.246554,
                    "eth": 113.019,
                    "usd": 387935
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.042194,
                "timestamp": "2024-03-01T08:54:40+00:00",
                "last_traded_at": "2024-03-01T08:54:40+00:00",
                "last_fetch_at": "2024-03-01T08:54:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/ICP-EUR",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Pionex",
                    "identifier": "pionex",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 35741.853,
                "converted_last": {
                    "btc": 0.00020656,
                    "eth": 0.0037426,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 7.480167,
                    "eth": 135.53,
                    "usd": 464329
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.156128,
                "timestamp": "2024-03-01T08:51:01+00:00",
                "last_traded_at": "2024-03-01T08:51:01+00:00",
                "last_fetch_at": "2024-03-01T08:51:01+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.pionex.com/en/trade/ICP_USDT/Bot",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "Crypto.com Exchange",
                    "identifier": "crypto_com",
                    "has_trading_incentive": false
                },
                "last": 12.8173,
                "volume": 64950.0201,
                "converted_last": {
                    "btc": 0.00020648,
                    "eth": 0.00374115,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 13.410991,
                    "eth": 242.988,
                    "usd": 832484
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.097519,
                "timestamp": "2024-03-01T08:51:05+00:00",
                "last_traded_at": "2024-03-01T08:51:05+00:00",
                "last_fetch_at": "2024-03-01T08:51:05+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://crypto.com/exchange/trade/spot/ICP_USD",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.000206,
                "volume": 48844.59,
                "converted_last": {
                    "btc": 0.000206,
                    "eth": 0.0037261,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 10.236221,
                    "eth": 185.151,
                    "usd": 635750
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.145208,
                "timestamp": "2024-03-01T08:41:45+00:00",
                "last_traded_at": "2024-03-01T08:41:45+00:00",
                "last_fetch_at": "2024-03-01T08:55:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_BTC?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "BitMart",
                    "identifier": "bitmart",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 42384.66,
                "converted_last": {
                    "btc": 0.00020641,
                    "eth": 0.00373462,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 8.748674,
                    "eth": 158.291,
                    "usd": 543326
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.233645,
                "timestamp": "2024-03-01T08:54:12+00:00",
                "last_traded_at": "2024-03-01T08:54:12+00:00",
                "last_fetch_at": "2024-03-01T08:54:12+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitmart.com/trade/en?symbol=ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "Bitvavo",
                    "identifier": "bitvavo",
                    "has_trading_incentive": false
                },
                "last": 11.847,
                "volume": 283084.0472308,
                "converted_last": {
                    "btc": 0.00020624,
                    "eth": 0.0037315,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 58.383,
                    "eth": 1056,
                    "usd": 3625798
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.109575,
                "timestamp": "2024-03-01T08:54:34+00:00",
                "last_traded_at": "2024-03-01T08:54:34+00:00",
                "last_fetch_at": "2024-03-01T08:54:34+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://account.bitvavo.com/markets/ICP-EUR",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "WOO X",
                    "identifier": "wootrade",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 5930.17,
                "converted_last": {
                    "btc": 0.00020641,
                    "eth": 0.00373627,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 1.224054,
                    "eth": 22.156705,
                    "usd": 75962
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.155885,
                "timestamp": "2024-03-01T08:53:34+00:00",
                "last_traded_at": "2024-03-01T08:53:34+00:00",
                "last_fetch_at": "2024-03-01T08:53:34+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://x.woo.network/spot",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "HTX",
                    "identifier": "huobi",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 147151.62347651288,
                "converted_last": {
                    "btc": 0.00020641,
                    "eth": 0.00373354,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 30.689415,
                    "eth": 555.106,
                    "usd": 1906055
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.078064,
                "timestamp": "2024-03-01T08:55:11+00:00",
                "last_traded_at": "2024-03-01T08:55:11+00:00",
                "last_fetch_at": "2024-03-01T08:55:11+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.huobi.com/en-us/exchange/icp_usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 0.0002057,
                "volume": 27489.7782,
                "converted_last": {
                    "btc": 0.0002057,
                    "eth": 0.00372432,
                    "usd": 12.76
                },
                "converted_volume": {
                    "btc": 5.654647,
                    "eth": 102.381,
                    "usd": 350881
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.193798,
                "timestamp": "2024-03-01T08:42:54+00:00",
                "last_traded_at": "2024-03-01T08:42:54+00:00",
                "last_fetch_at": "2024-03-01T08:52:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/ICP-BTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 12.85,
                "volume": 38538.6653,
                "converted_last": {
                    "btc": 0.00020721,
                    "eth": 0.0037516,
                    "usd": 12.86
                },
                "converted_volume": {
                    "btc": 7.985455,
                    "eth": 144.582,
                    "usd": 495512
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.156128,
                "timestamp": "2024-03-01T08:49:47+00:00",
                "last_traded_at": "2024-03-01T08:49:47+00:00",
                "last_fetch_at": "2024-03-01T08:52:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/ICP-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDC",
                "market": {
                    "name": "Bybit",
                    "identifier": "bybit_spot",
                    "has_trading_incentive": false
                },
                "last": 12.846,
                "volume": 27016.93,
                "converted_last": {
                    "btc": 0.00020655,
                    "eth": 0.00373712,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 5.604064,
                    "eth": 101.395,
                    "usd": 348034
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.141105,
                "timestamp": "2024-03-01T08:54:46+00:00",
                "last_traded_at": "2024-03-01T08:54:46+00:00",
                "last_fetch_at": "2024-03-01T08:54:46+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bybit.com/trade/spot/ICP/USDC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "ICP",
                "target": "FDUSD",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 12.827,
                "volume": 24533.27,
                "converted_last": {
                    "btc": 0.0002082,
                    "eth": 0.0037885,
                    "usd": 12.91
                },
                "converted_volume": {
                    "btc": 5.205169,
                    "eth": 94.714,
                    "usd": 322845
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.196386,
                "timestamp": "2024-03-01T08:37:22+00:00",
                "last_traded_at": "2024-03-01T08:37:22+00:00",
                "last_fetch_at": "2024-03-01T08:37:22+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_FDUSD?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "first-digital-usd"
            },
            {
                "base": "ICP",
                "target": "USDC",
                "market": {
                    "name": "OKX",
                    "identifier": "okex",
                    "has_trading_incentive": false
                },
                "last": 12.834,
                "volume": 10776.7761,
                "converted_last": {
                    "btc": 0.00020636,
                    "eth": 0.00373622,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 2.244252,
                    "eth": 40.633549,
                    "usd": 139260
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.109238,
                "timestamp": "2024-03-01T08:52:48+00:00",
                "last_traded_at": "2024-03-01T08:52:48+00:00",
                "last_fetch_at": "2024-03-01T08:52:48+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.okx.com/trade-spot/icp-usdc",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 11.85,
                "volume": 24422.5999,
                "converted_last": {
                    "btc": 0.00020646,
                    "eth": 0.00373815,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 5.042384,
                    "eth": 91.295,
                    "usd": 312889
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.253165,
                "timestamp": "2024-03-01T08:52:14+00:00",
                "last_traded_at": "2024-03-01T08:52:14+00:00",
                "last_fetch_at": "2024-03-01T08:52:14+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/ICP-EUR",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 401.2,
                "volume": 31713.461,
                "converted_last": {
                    "btc": 0.00020611,
                    "eth": 0.00374889,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 6.664316,
                    "eth": 121.217,
                    "usd": 414105
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.174694,
                "timestamp": "2024-03-01T08:40:27+00:00",
                "last_traded_at": "2024-03-01T08:40:27+00:00",
                "last_fetch_at": "2024-03-01T08:40:27+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_TRY?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "BNB",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.03148,
                "volume": 6393.05,
                "converted_last": {
                    "btc": 0.00020632,
                    "eth": 0.00373189,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 1.351591,
                    "eth": 24.447397,
                    "usd": 83944
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.253888,
                "timestamp": "2024-03-01T08:49:28+00:00",
                "last_traded_at": "2024-03-01T08:49:28+00:00",
                "last_fetch_at": "2024-03-01T08:55:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_BNB?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "binancecoin"
            },
            {
                "base": "ICP",
                "target": "ETH",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.003722,
                "volume": 4017.298,
                "converted_last": {
                    "btc": 0.0002059,
                    "eth": 0.00372431,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 0.84118094,
                    "eth": 15.215171,
                    "usd": 52244
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.267523,
                "timestamp": "2024-03-01T08:49:31+00:00",
                "last_traded_at": "2024-03-01T08:49:31+00:00",
                "last_fetch_at": "2024-03-01T08:55:12+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_ETH?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "ethereum"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Bitexen",
                    "identifier": "bitexen",
                    "has_trading_incentive": false
                },
                "last": 401.78,
                "volume": 154617.14,
                "converted_last": {
                    "btc": 0.00020668,
                    "eth": 0.00374106,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 31.955624,
                    "eth": 578.431,
                    "usd": 1983092
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.253422,
                "timestamp": "2024-03-01T08:53:35+00:00",
                "last_traded_at": "2024-03-01T08:53:35+00:00",
                "last_fetch_at": "2024-03-01T08:53:35+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitexen.com/market",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 11.824,
                "volume": 9829.59,
                "converted_last": {
                    "btc": 0.00020582,
                    "eth": 0.00372293,
                    "usd": 12.78
                },
                "converted_volume": {
                    "btc": 2.055916,
                    "eth": 37.187145,
                    "usd": 127689
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.118233,
                "timestamp": "2024-03-01T08:53:32+00:00",
                "last_traded_at": "2024-03-01T08:53:32+00:00",
                "last_fetch_at": "2024-03-01T08:55:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/ICP_EUR?ref=37754157",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 23819.54,
                "converted_last": {
                    "btc": 0.0002062,
                    "eth": 0.00374052,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 4.911683,
                    "eth": 89.097,
                    "usd": 305416
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.545171,
                "timestamp": "2024-03-01T08:48:44+00:00",
                "last_traded_at": "2024-03-01T08:48:44+00:00",
                "last_fetch_at": "2024-03-01T08:48:44+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "ETH",
                "market": {
                    "name": "Gate.io",
                    "identifier": "gate",
                    "has_trading_incentive": false
                },
                "last": 0.00372,
                "volume": 2647.1355359632,
                "converted_last": {
                    "btc": 0.00020583,
                    "eth": 0.00372663,
                    "usd": 12.77
                },
                "converted_volume": {
                    "btc": 0.55510868,
                    "eth": 10.05058,
                    "usd": 34445
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.268097,
                "timestamp": "2024-03-01T08:52:02+00:00",
                "last_traded_at": "2024-03-01T08:52:02+00:00",
                "last_fetch_at": "2024-03-01T08:52:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://gate.io/trade/ICP_ETH",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "ethereum"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "WhiteBIT",
                    "identifier": "whitebit",
                    "has_trading_incentive": false
                },
                "last": 12.82,
                "volume": 27273.8075,
                "converted_last": {
                    "btc": 0.00020636,
                    "eth": 0.00374344,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 5.628356,
                    "eth": 102.098,
                    "usd": 349979
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.233827,
                "timestamp": "2024-03-01T08:48:56+00:00",
                "last_traded_at": "2024-03-01T08:48:56+00:00",
                "last_fetch_at": "2024-03-01T08:48:56+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://whitebit.com/trade/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDC",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 40404.1,
                "converted_last": {
                    "btc": 0.00020597,
                    "eth": 0.00373629,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 8.322073,
                    "eth": 150.962,
                    "usd": 517479
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.46729,
                "timestamp": "2024-03-01T08:48:44+00:00",
                "last_traded_at": "2024-03-01T08:48:44+00:00",
                "last_fetch_at": "2024-03-01T08:48:44+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_usdc",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "KuCoin",
                    "identifier": "kucoin",
                    "has_trading_incentive": false
                },
                "last": 0.0002065,
                "volume": 3764.101,
                "converted_last": {
                    "btc": 0.0002065,
                    "eth": 0.00374221,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.77728686,
                    "eth": 14.08605,
                    "usd": 48344
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.242131,
                "timestamp": "2024-03-01T08:50:28+00:00",
                "last_traded_at": "2024-03-01T08:50:28+00:00",
                "last_fetch_at": "2024-03-01T08:50:28+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.kucoin.com/trade/ICP-BTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "CoinEx",
                    "identifier": "coinex",
                    "has_trading_incentive": false
                },
                "last": 12.8141,
                "volume": 29560.53903261,
                "converted_last": {
                    "btc": 0.00020627,
                    "eth": 0.00374172,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 6.202692,
                    "eth": 112.516,
                    "usd": 385692
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.557203,
                "timestamp": "2024-03-01T08:48:59+00:00",
                "last_traded_at": "2024-03-01T08:48:59+00:00",
                "last_fetch_at": "2024-03-01T08:48:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinex.com/trading?currency=USDT&dest=ICP#limit",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Tapbit",
                    "identifier": "tapbit",
                    "has_trading_incentive": false
                },
                "last": 12.79,
                "volume": 42631.81,
                "converted_last": {
                    "btc": 0.00020624,
                    "eth": 0.00373408,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 8.914239,
                    "eth": 161.398,
                    "usd": 553144
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.545171,
                "timestamp": "2024-03-01T08:52:54+00:00",
                "last_traded_at": "2024-03-01T08:52:54+00:00",
                "last_fetch_at": "2024-03-01T08:52:54+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tapbit.com/spot/exchange/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Binance US",
                    "identifier": "binance_us",
                    "has_trading_incentive": false
                },
                "last": 12.799,
                "volume": 16411.244069849206,
                "converted_last": {
                    "btc": 0.00020567,
                    "eth": 0.00373568,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 3.375256,
                    "eth": 61.307,
                    "usd": 210126
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.382036,
                "timestamp": "2024-03-01T08:44:52+00:00",
                "last_traded_at": "2024-03-01T08:44:52+00:00",
                "last_fetch_at": "2024-03-01T08:44:52+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.us/trade/pro/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "LCX Exchange",
                    "identifier": "lcx",
                    "has_trading_incentive": false
                },
                "last": 11.8625,
                "volume": 5950.23099092,
                "converted_last": {
                    "btc": 0.00020668,
                    "eth": 0.0037421,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 1.229804,
                    "eth": 22.266342,
                    "usd": 76311
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.597643,
                "timestamp": "2024-03-01T08:52:20+00:00",
                "last_traded_at": "2024-03-01T08:52:20+00:00",
                "last_fetch_at": "2024-03-01T08:52:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.lcx.com/trade/ICP_EUR",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Bitfinex",
                    "identifier": "bitfinex",
                    "has_trading_incentive": false
                },
                "last": 12.792,
                "volume": 3426.64748069,
                "converted_last": {
                    "btc": 0.00020612,
                    "eth": 0.00373102,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 0.70630496,
                    "eth": 12.784883,
                    "usd": 43832
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.311769,
                "timestamp": "2024-03-01T08:53:26+00:00",
                "last_traded_at": "2024-03-01T08:53:26+00:00",
                "last_fetch_at": "2024-03-01T08:53:26+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trading.bitfinex.com/t/ICP:UST?type=exchange",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Bitlo",
                    "identifier": "bitlo",
                    "has_trading_incentive": false
                },
                "last": 400,
                "volume": 364.209432,
                "converted_last": {
                    "btc": 0.00020514,
                    "eth": 0.0037254,
                    "usd": 12.77
                },
                "converted_volume": {
                    "btc": 0.07620659,
                    "eth": 1.383963,
                    "usd": 4743.6
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.987654,
                "timestamp": "2024-03-01T08:45:56+00:00",
                "last_traded_at": "2024-03-01T08:45:56+00:00",
                "last_fetch_at": "2024-03-01T08:45:56+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitlo.com/kolay-alis-satis/ICP-TRY",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "ADA",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 18.9,
                "volume": 93431.98,
                "converted_last": {
                    "btc": 0.00020507,
                    "eth": 0.00371986,
                    "usd": 12.75
                },
                "converted_volume": {
                    "btc": 19.159629,
                    "eth": 347.554,
                    "usd": 1191374
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 1.202929,
                "timestamp": "2024-03-01T08:48:45+00:00",
                "last_traded_at": "2024-03-01T08:48:45+00:00",
                "last_fetch_at": "2024-03-01T08:48:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_ada",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "cardano"
            },
            {
                "base": "ICP",
                "target": "SOL",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 0.09681,
                "volume": 55622.5,
                "converted_last": {
                    "btc": 0.00020684,
                    "eth": 0.00375208,
                    "usd": 12.86
                },
                "converted_volume": {
                    "btc": 11.505018,
                    "eth": 208.7,
                    "usd": 715399
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.876289,
                "timestamp": "2024-03-01T08:48:45+00:00",
                "last_traded_at": "2024-03-01T08:48:45+00:00",
                "last_fetch_at": "2024-03-01T08:48:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_sol",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "solana"
            },
            {
                "base": "ICP",
                "target": "XRP",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 21.57,
                "volume": 78668.09,
                "converted_last": {
                    "btc": 0.00020536,
                    "eth": 0.0037252,
                    "usd": 12.77
                },
                "converted_volume": {
                    "btc": 16.155251,
                    "eth": 293.055,
                    "usd": 1004557
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 1.194853,
                "timestamp": "2024-03-01T08:48:45+00:00",
                "last_traded_at": "2024-03-01T08:48:45+00:00",
                "last_fetch_at": "2024-03-01T08:48:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_xrp",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "ripple"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "Bitfinex",
                    "identifier": "bitfinex",
                    "has_trading_incentive": false
                },
                "last": 12.793,
                "volume": 10153.44208405,
                "converted_last": {
                    "btc": 0.00020615,
                    "eth": 0.00373148,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 2.093101,
                    "eth": 37.887391,
                    "usd": 129893
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.466926,
                "timestamp": "2024-03-01T08:53:22+00:00",
                "last_traded_at": "2024-03-01T08:53:22+00:00",
                "last_fetch_at": "2024-03-01T08:53:22+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trading.bitfinex.com/t/ICP:USD?type=exchange",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Gate.io",
                    "identifier": "gate",
                    "has_trading_incentive": false
                },
                "last": 402.0937,
                "volume": 528.10523232,
                "converted_last": {
                    "btc": 0.00020684,
                    "eth": 0.00374398,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.11037561,
                    "eth": 1.997918,
                    "usd": 6849.65
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.484022,
                "timestamp": "2024-03-01T08:53:26+00:00",
                "last_traded_at": "2024-03-01T08:53:26+00:00",
                "last_fetch_at": "2024-03-01T08:53:26+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://gate.io/trade/ICP_TRY",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "BigONE",
                    "identifier": "bigone",
                    "has_trading_incentive": false
                },
                "last": 12.833,
                "volume": 13824.28,
                "converted_last": {
                    "btc": 0.00020678,
                    "eth": 0.00374024,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 2.858611,
                    "eth": 51.706,
                    "usd": 177542
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.73884,
                "timestamp": "2024-03-01T08:55:09+00:00",
                "last_traded_at": "2024-03-01T08:55:09+00:00",
                "last_fetch_at": "2024-03-01T08:55:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://big.one/trade/ICP-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Coinstore",
                    "identifier": "coinstore",
                    "has_trading_incentive": false
                },
                "last": 12.764,
                "volume": 9181.33,
                "converted_last": {
                    "btc": 0.00020567,
                    "eth": 0.00372121,
                    "usd": 12.77
                },
                "converted_volume": {
                    "btc": 1.92,
                    "eth": 34.738729,
                    "usd": 119239
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 1.998303,
                "timestamp": "2024-03-01T08:54:38+00:00",
                "last_traded_at": "2024-03-01T08:54:38+00:00",
                "last_fetch_at": "2024-03-01T08:54:38+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinstore.com/#/spot/ICPUSDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "CoinEx",
                    "identifier": "coinex",
                    "has_trading_incentive": false
                },
                "last": 0.00020593,
                "volume": 235.40860203,
                "converted_last": {
                    "btc": 0.00020593,
                    "eth": 0.00373555,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 0.04944542,
                    "eth": 0.89693536,
                    "usd": 3074.59
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 1.038547,
                "timestamp": "2024-03-01T08:48:59+00:00",
                "last_traded_at": "2024-03-01T08:48:59+00:00",
                "last_fetch_at": "2024-03-01T08:48:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinex.com/trading?currency=BTC&dest=ICP#limit",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "USDC",
                "market": {
                    "name": "CoinEx",
                    "identifier": "coinex",
                    "has_trading_incentive": false
                },
                "last": 12.7851,
                "volume": 212.84176359,
                "converted_last": {
                    "btc": 0.00020557,
                    "eth": 0.00372903,
                    "usd": 12.78
                },
                "converted_volume": {
                    "btc": 0.04444542,
                    "eth": 0.80623568,
                    "usd": 2763.68
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.889445,
                "timestamp": "2024-03-01T08:49:00+00:00",
                "last_traded_at": "2024-03-01T08:49:00+00:00",
                "last_fetch_at": "2024-03-01T08:49:00+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinex.com/trading?currency=USDC&dest=ICP#limit",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "HitBTC",
                    "identifier": "hitbtc",
                    "has_trading_incentive": false
                },
                "last": 12.802,
                "volume": 24562.7587,
                "converted_last": {
                    "btc": 0.00020628,
                    "eth": 0.00373393,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 5.13339,
                    "eth": 92.92,
                    "usd": 318566
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.017803,
                "timestamp": "2024-03-01T08:53:40+00:00",
                "last_traded_at": "2024-03-01T08:53:40+00:00",
                "last_fetch_at": "2024-03-01T08:53:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://hitbtc.com/ICP-to-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "CoinCatch",
                    "identifier": "coincatch",
                    "has_trading_incentive": false
                },
                "last": 12.796,
                "volume": 32190.1,
                "converted_last": {
                    "btc": 0.00020634,
                    "eth": 0.00373851,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 6.724034,
                    "eth": 121.83,
                    "usd": 417393
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.039056,
                "timestamp": "2024-03-01T08:51:54+00:00",
                "last_traded_at": "2024-03-01T08:51:54+00:00",
                "last_fetch_at": "2024-03-01T08:51:54+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coincatch.com/en/spot/ICPUSDT_SPBL",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Nominex",
                    "identifier": "nominex",
                    "has_trading_incentive": false
                },
                "last": 12.826,
                "volume": 394.80534227350694,
                "converted_last": {
                    "btc": 0.00020636,
                    "eth": 0.00374766,
                    "usd": 12.85
                },
                "converted_volume": {
                    "btc": 0.08147241,
                    "eth": 1.479594,
                    "usd": 5071.38
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.023394,
                "timestamp": "2024-03-01T08:45:18+00:00",
                "last_traded_at": "2024-03-01T08:45:18+00:00",
                "last_fetch_at": "2024-03-01T08:45:18+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://nominex.io/en/markets/ICP/USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Hotcoin Global",
                    "identifier": "hotcoin_global",
                    "has_trading_incentive": false
                },
                "last": 12.83,
                "volume": 37071.83,
                "converted_last": {
                    "btc": 0.00020643,
                    "eth": 0.00374615,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 7.652564,
                    "eth": 138.877,
                    "usd": 475913
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.598477,
                "timestamp": "2024-03-01T08:46:18+00:00",
                "last_traded_at": "2024-03-01T08:46:18+00:00",
                "last_fetch_at": "2024-03-01T08:46:18+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.hotcoin.com/currencyExchange/icp_usdt",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "CEX.IO",
                    "identifier": "cex",
                    "has_trading_incentive": false
                },
                "last": 12.81,
                "volume": 294.96493482,
                "converted_last": {
                    "btc": 0.00020641,
                    "eth": 0.00373627,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 0.06245582,
                    "eth": 1.130518,
                    "usd": 3875.86
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.117059,
                "timestamp": "2024-03-01T08:53:17+00:00",
                "last_traded_at": "2024-03-01T08:53:17+00:00",
                "last_fetch_at": "2024-03-01T08:53:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trade.cex.io/spot/ICP-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "CEX.IO",
                    "identifier": "cex",
                    "has_trading_incentive": false
                },
                "last": 12.817,
                "volume": 204.08420544,
                "converted_last": {
                    "btc": 0.00020612,
                    "eth": 0.00373904,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 0.04255313,
                    "eth": 0.77190975,
                    "usd": 2646.02
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.194917,
                "timestamp": "2024-03-01T08:48:40+00:00",
                "last_traded_at": "2024-03-01T08:48:40+00:00",
                "last_fetch_at": "2024-03-01T08:48:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trade.cex.io/spot/ICP-USD",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "HitBTC",
                    "identifier": "hitbtc",
                    "has_trading_incentive": false
                },
                "last": 0.0002062,
                "volume": 1918.2059,
                "converted_last": {
                    "btc": 0.0002062,
                    "eth": 0.00373338,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 0.40099701,
                    "eth": 7.260295,
                    "usd": 24883
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.290416,
                "timestamp": "2024-03-01T08:52:52+00:00",
                "last_traded_at": "2024-03-01T08:52:52+00:00",
                "last_fetch_at": "2024-03-01T08:52:52+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://hitbtc.com/ICP-to-BTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "TokoCrypto",
                    "identifier": "toko_crypto",
                    "has_trading_incentive": false
                },
                "last": 0.000206,
                "volume": 32.108543689,
                "converted_last": {
                    "btc": 0.000206,
                    "eth": 0.00373384,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 0.00661436,
                    "eth": 0.11988826,
                    "usd": 411.38
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.194175,
                "timestamp": "2024-03-01T08:49:46+00:00",
                "last_traded_at": "2024-03-01T08:49:46+00:00",
                "last_fetch_at": "2024-03-01T08:49:46+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tokocrypto.com/trade/ICPBTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "EUR",
                "market": {
                    "name": "CEX.IO",
                    "identifier": "cex",
                    "has_trading_incentive": false
                },
                "last": 11.864,
                "volume": 5.48599808,
                "converted_last": {
                    "btc": 0.00020669,
                    "eth": 0.00374128,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 0.00115906,
                    "eth": 0.02098016,
                    "usd": 71.93
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.370776,
                "timestamp": "2024-03-01T08:53:17+00:00",
                "last_traded_at": "2024-03-01T08:53:17+00:00",
                "last_fetch_at": "2024-03-01T08:53:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trade.cex.io/spot/ICP-EUR",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "BiONE",
                    "identifier": "bione",
                    "has_trading_incentive": false
                },
                "last": 12.819,
                "volume": 1120467.13,
                "converted_last": {
                    "btc": 0.00020656,
                    "eth": 0.00373724,
                    "usd": 12.83
                },
                "converted_volume": {
                    "btc": 231.44,
                    "eth": 4187,
                    "usd": 14373271
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.163679,
                "timestamp": "2024-03-01T08:54:20+00:00",
                "last_traded_at": "2024-03-01T08:54:20+00:00",
                "last_fetch_at": "2024-03-01T08:54:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bione.me/zh_CN/trade/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "LocalTrade",
                    "identifier": "localtrade",
                    "has_trading_incentive": false
                },
                "last": 12.807,
                "volume": 19686.63323967,
                "converted_last": {
                    "btc": 0.00020636,
                    "eth": 0.00373374,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 4.062592,
                    "eth": 73.505,
                    "usd": 252302
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.112911,
                "timestamp": "2024-03-01T08:54:07+00:00",
                "last_traded_at": "2024-03-01T08:54:07+00:00",
                "last_fetch_at": "2024-03-01T08:54:07+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://localtrade.cc/trade/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USD",
                "market": {
                    "name": "Tokenize",
                    "identifier": "tokenize",
                    "has_trading_incentive": false
                },
                "last": 12.784,
                "volume": 18407.468735528786,
                "converted_last": {
                    "btc": 0.00020584,
                    "eth": 0.00372312,
                    "usd": 12.78
                },
                "converted_volume": {
                    "btc": 3.788907,
                    "eth": 68.533,
                    "usd": 235321
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.405111,
                "timestamp": "2024-03-01T08:55:21+00:00",
                "last_traded_at": "2024-03-01T08:55:21+00:00",
                "last_fetch_at": "2024-03-01T08:55:21+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://tokenize.exchange/market/USD-ICP",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "SGD",
                "market": {
                    "name": "Tokenize",
                    "identifier": "tokenize",
                    "has_trading_incentive": false
                },
                "last": 17.21,
                "volume": 18369.514476782104,
                "converted_last": {
                    "btc": 0.00020573,
                    "eth": 0.00372114,
                    "usd": 12.78
                },
                "converted_volume": {
                    "btc": 3.779079,
                    "eth": 68.355,
                    "usd": 234711
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.410856,
                "timestamp": "2024-03-01T08:55:21+00:00",
                "last_traded_at": "2024-03-01T08:55:21+00:00",
                "last_fetch_at": "2024-03-01T08:55:21+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://tokenize.exchange/market/SGD-ICP",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Poloniex",
                    "identifier": "poloniex",
                    "has_trading_incentive": false
                },
                "last": 12.856,
                "volume": 1110400.11245,
                "converted_last": {
                    "btc": 0.00020684,
                    "eth": 0.00375375,
                    "usd": 12.86
                },
                "converted_volume": {
                    "btc": 232.271,
                    "eth": 4215,
                    "usd": 14444955
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.38011,
                "timestamp": "2024-03-01T08:46:40+00:00",
                "last_traded_at": "2024-03-01T08:46:40+00:00",
                "last_fetch_at": "2024-03-01T08:46:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://poloniex.com/trade/ICP_USDT/?type=spot",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Nominex",
                    "identifier": "nominex",
                    "has_trading_incentive": false
                },
                "last": 402.4,
                "volume": 0.31245551689860834,
                "converted_last": {
                    "btc": 0.00020637,
                    "eth": 0.00374776,
                    "usd": 12.85
                },
                "converted_volume": {
                    "btc": 0.00006448,
                    "eth": 0.00117101,
                    "usd": 4.01
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.124162,
                "timestamp": "2024-03-01T08:45:38+00:00",
                "last_traded_at": "2024-03-01T08:45:38+00:00",
                "last_fetch_at": "2024-03-01T08:45:38+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://nominex.io/en/markets/ICP/TRY",
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "BNB",
                "market": {
                    "name": "TokoCrypto",
                    "identifier": "toko_crypto",
                    "has_trading_incentive": false
                },
                "last": 0.03148,
                "volume": 13.809259848,
                "converted_last": {
                    "btc": 0.00020616,
                    "eth": 0.00373679,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 0.00284695,
                    "eth": 0.05160229,
                    "usd": 177.07
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.190174,
                "timestamp": "2024-03-01T08:37:49+00:00",
                "last_traded_at": "2024-03-01T08:37:49+00:00",
                "last_fetch_at": "2024-03-01T08:49:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tokocrypto.com/trade/ICPBNB",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "binancecoin"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "LocalTrade",
                    "identifier": "localtrade",
                    "has_trading_incentive": false
                },
                "last": 0.000206,
                "volume": 2456.09750338,
                "converted_last": {
                    "btc": 0.000206,
                    "eth": 0.00372718,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 0.50595609,
                    "eth": 9.154308,
                    "usd": 31422
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 0.217897,
                "timestamp": "2024-03-01T08:54:07+00:00",
                "last_traded_at": "2024-03-01T08:54:07+00:00",
                "last_fetch_at": "2024-03-01T08:54:07+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://localtrade.cc/trade/ICP_BTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "BTC",
                "market": {
                    "name": "Nominex",
                    "identifier": "nominex",
                    "has_trading_incentive": false
                },
                "last": 0.0002083,
                "volume": 20.75349976,
                "converted_last": {
                    "btc": 0.0002083,
                    "eth": 0.00379776,
                    "usd": 12.82
                },
                "converted_volume": {
                    "btc": 0.00432295,
                    "eth": 0.07881674,
                    "usd": 266.14
                },
                "trust_score": "red",
                "bid_ask_spread_percentage": 0.193705,
                "timestamp": "2024-03-01T00:59:46+00:00",
                "last_traded_at": "2024-03-01T00:59:46+00:00",
                "last_fetch_at": "2024-03-01T00:59:46+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://nominex.io/en/markets/ICP/BTC",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Bibox",
                    "identifier": "bibox",
                    "has_trading_incentive": false
                },
                "last": 12.88,
                "volume": 283801,
                "converted_last": {
                    "btc": 0.00020754,
                    "eth": 0.00375503,
                    "usd": 12.89
                },
                "converted_volume": {
                    "btc": 58.9,
                    "eth": 1066,
                    "usd": 3657903
                },
                "trust_score": "red",
                "bid_ask_spread_percentage": 0.310318,
                "timestamp": "2024-03-01T08:54:06+00:00",
                "last_traded_at": "2024-03-01T08:54:06+00:00",
                "last_fetch_at": "2024-03-01T08:54:06+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bibox.com/en/exchange/basic/ICP_USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "TokoCrypto",
                    "identifier": "toko_crypto",
                    "has_trading_incentive": false
                },
                "last": 12.777,
                "volume": 5494.629964780465,
                "converted_last": {
                    "btc": 0.00020609,
                    "eth": 0.003749,
                    "usd": 12.79
                },
                "converted_volume": {
                    "btc": 1.13241,
                    "eth": 20.599359,
                    "usd": 70254
                },
                "trust_score": null,
                "bid_ask_spread_percentage": 0.017875,
                "timestamp": "2024-03-01T08:38:33+00:00",
                "last_traded_at": "2024-03-01T08:38:33+00:00",
                "last_fetch_at": "2024-03-01T08:38:33+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tokocrypto.com/trade/ICPUSDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "TRY",
                "market": {
                    "name": "Paribu",
                    "identifier": "paribu",
                    "has_trading_incentive": false
                },
                "last": 401,
                "volume": 15027.249,
                "converted_last": {
                    "btc": 0.00020612,
                    "eth": 0.00372937,
                    "usd": 12.8
                },
                "converted_volume": {
                    "btc": 3.097439,
                    "eth": 56.042,
                    "usd": 192363
                },
                "trust_score": null,
                "bid_ask_spread_percentage": 1.736258,
                "timestamp": "2024-03-01T08:54:05+00:00",
                "last_traded_at": "2024-03-01T08:54:05+00:00",
                "last_fetch_at": "2024-03-01T08:54:05+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": null,
                "token_info_url": null,
                "coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Coinlist",
                    "identifier": "coinlist",
                    "has_trading_incentive": false
                },
                "last": 12.75,
                "volume": 381.0238,
                "converted_last": {
                    "btc": 0.00020559,
                    "eth": 0.00372507,
                    "usd": 12.76
                },
                "converted_volume": {
                    "btc": 0.07833614,
                    "eth": 1.419339,
                    "usd": 4862.7
                },
                "trust_score": null,
                "bid_ask_spread_percentage": 0.78125,
                "timestamp": "2024-03-01T08:51:36+00:00",
                "last_traded_at": "2024-03-01T08:51:36+00:00",
                "last_fetch_at": "2024-03-01T08:51:36+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinlist.co/trader/ICP-USDT",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "ICP",
                "target": "LCX",
                "market": {
                    "name": "LCX Exchange",
                    "identifier": "lcx",
                    "has_trading_incentive": false
                },
                "last": 50.46895508,
                "volume": 13.66730461,
                "converted_last": {
                    "btc": 0.00021111,
                    "eth": 0.00382226,
                    "usd": 13.1
                },
                "converted_volume": {
                    "btc": 0.00288529,
                    "eth": 0.05223995,
                    "usd": 179.04
                },
                "trust_score": null,
                "bid_ask_spread_percentage": 0.336929,
                "timestamp": "2024-03-01T08:52:20+00:00",
                "last_traded_at": "2024-03-01T08:52:20+00:00",
                "last_fetch_at": "2024-03-01T08:52:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.lcx.com/trade/ICP_LCX",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "lcx"
            },
            {
                "base": "MXZAZ-HQAAA-AAAAR-QAADA-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 4854.368932039,
                "volume": 1.888533,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 1.857029,
                    "eth": 33.6864,
                    "usd": 115484
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/xmiu5-jqaaa-aaaag-qbz7q-cai",
                "token_info_url": null,
                "coin_id": "chain-key-bitcoin",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "4C4FD-CAAAA-AAAAQ-AAA3A-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.000052702349076350146,
                "volume": 101828044.85217,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 1.063948,
                    "eth": 19.299961,
                    "usd": 66164
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/dwahc-eyaaa-aaaag-qcgnq-cai",
                "token_info_url": null,
                "coin_id": "ic-ghost",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "6QFXA-RYAAA-AAAAI-QBHSQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 1.518001217,
                "volume": 2518.65,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.67996455,
                    "eth": 12.33452,
                    "usd": 42285
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/opl73-raaaa-aaaag-qcunq-cai",
                "token_info_url": null,
                "coin_id": "taggr",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "SS2FX-DYAAA-AAAAR-QACOQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 268.889486421,
                "volume": 7.635161,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.4125778,
                    "eth": 7.484139,
                    "usd": 25657
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/angxa-baaaa-aaaag-qcvnq-cai",
                "token_info_url": null,
                "coin_id": "chain-key-ethereum",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "EAYYD-IIAAA-AAAAH-ADTEA-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.07691622546237804,
                "volume": 14428.673502,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.22667539,
                    "eth": 4.111879,
                    "usd": 14096.35
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T06:52:38+00:00",
                "last_traded_at": "2024-03-01T06:52:38+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/wlv64-biaaa-aaaag-qcrlq-cai",
                "token_info_url": null,
                "coin_id": "internet-doge",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "USDT",
                "market": {
                    "name": "Mudrex",
                    "identifier": "mudrex",
                    "has_trading_incentive": false
                },
                "last": 12.8,
                "volume": 850.19375,
                "converted_last": {
                    "btc": 0.0002064,
                    "eth": 0.003737,
                    "usd": 12.81
                },
                "converted_volume": {
                    "btc": 0.17548006,
                    "eth": 3.177173,
                    "usd": 10888.85
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:52:43+00:00",
                "last_traded_at": "2024-03-01T08:52:43+00:00",
                "last_fetch_at": "2024-03-01T08:52:43+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://mudrex.com/trading-volume-mudrex",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "tether"
            },
            {
                "base": "JWCFB-HYAAA-AAAAJ-AAC4Q-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.0010290548163104172,
                "volume": 751711.211187,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.14498971,
                    "eth": 2.630105,
                    "usd": 9016.53
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/oxpo6-vaaaa-aaaag-qcmxq-cai",
                "token_info_url": null,
                "coin_id": "origyn-foundation",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "2OUVA-VIAAA-AAAAQ-AAAMQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.06654670071107147,
                "volume": 10059.842337,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.13923827,
                    "eth": 2.525775,
                    "usd": 8658.86
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/ne2vj-6yaaa-aaaag-qb3ia-cai",
                "token_info_url": null,
                "coin_id": "openchat",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "RH2PM-RYAAA-AAAAN-QENIQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.017360647859101398,
                "volume": 29101.713884,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.10524985,
                    "eth": 1.909227,
                    "usd": 6545.21
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:23:06+00:00",
                "last_traded_at": "2024-03-01T08:23:06+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/dlfvj-eqaaa-aaaag-qcs3a-cai",
                "token_info_url": null,
                "coin_id": "windoge98",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "HBJJZ-KAAAA-AAAAN-QIOCQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.001788736403781056,
                "volume": 144231.031926,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.05120349,
                    "eth": 0.9288285,
                    "usd": 3184.21
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:35:23+00:00",
                "last_traded_at": "2024-03-01T08:35:23+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/hxf7i-dyaaa-aaaag-qcv7a-cai",
                "token_info_url": null,
                "coin_id": "mora-2",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "IFNQY-RQAAA-AAAAK-AFHMQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.00003413093749719451,
                "volume": 6212093.145479,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.04127248,
                    "eth": 0.74868055,
                    "usd": 2566.63
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/kh3yp-giaaa-aaaag-qcy3a-cai",
                "token_info_url": null,
                "coin_id": "icpi",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "VI5VH-WYAAA-AAAAN-QIZXA-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.01731773109667909,
                "volume": 9666.899819,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.03459835,
                    "eth": 0.62761222,
                    "usd": 2151.58
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:08:56+00:00",
                "last_traded_at": "2024-03-01T08:08:56+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/7flwa-kaaaa-aaaag-qcxhq-cai",
                "token_info_url": null,
                "coin_id": "qro",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "7TX3O-ZYAAA-AAAAK-AES6Q-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 1.2039135629627148e-10,
                "volume": 1075106579345.3367,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.02654665,
                    "eth": 0.48155476,
                    "usd": 1650.87
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:35:23+00:00",
                "last_traded_at": "2024-03-01T08:35:23+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/pkhyt-7iaaa-aaaag-qca7a-cai",
                "token_info_url": null,
                "coin_id": "dogfinity",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "EMWW2-4YAAA-AAAAQ-AACBQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.002245188429291209,
                "volume": 30706.082118,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.01416159,
                    "eth": 0.25689049,
                    "usd": 880.67
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T02:29:07+00:00",
                "last_traded_at": "2024-03-01T02:29:07+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/mzv7v-5qaaa-aaaag-qcypq-cai",
                "token_info_url": null,
                "coin_id": "trax",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "QBIZB-WIAAA-AAAAQ-AABWQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.03419733469393129,
                "volume": 1705.019518,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.01224091,
                    "eth": 0.22204953,
                    "usd": 761.23
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/jknac-2aaaa-aaaag-qcmfq-cai",
                "token_info_url": null,
                "coin_id": "sonic-2",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "TMT5Q-3QAAA-AAAAK-AFJRQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 3.0890565095582335e-9,
                "volume": 11389366829.970434,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.0071942,
                    "eth": 0.13050248,
                    "usd": 447.39
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:35:24+00:00",
                "last_traded_at": "2024-03-01T08:35:24+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/wjv3g-iyaaa-aaaag-qc5hq-cai",
                "token_info_url": null,
                "coin_id": "catdog",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "PCJ6U-UAAAA-AAAAK-AEWNQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.000018464188547778063,
                "volume": 1796970.189647,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00690932,
                    "eth": 0.12533465,
                    "usd": 429.67
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T07:43:24+00:00",
                "last_traded_at": "2024-03-01T07:43:24+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/3s6gf-uqaaa-aaaag-qcdlq-cai",
                "token_info_url": null,
                "coin_id": "crypto-clouds",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "UTOZZ-SIAAA-AAAAM-QAAXQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.995388365701704,
                "volume": 20.661229,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00423275,
                    "eth": 0.0767818,
                    "usd": 263.22
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T07:04:20+00:00",
                "last_traded_at": "2024-03-01T07:04:20+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/f6zug-pqaaa-aaaag-qboiq-cai",
                "token_info_url": null,
                "coin_id": "wrapped-icp",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "IOZQL-7IAAA-AAAAH-ADVVQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.05820202084400613,
                "volume": 301.586453,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00361396,
                    "eth": 0.06555705,
                    "usd": 224.74
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T07:30:38+00:00",
                "last_traded_at": "2024-03-01T07:30:38+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/tb6mw-tqaaa-aaaag-qcwkq-cai",
                "token_info_url": null,
                "coin_id": "tendies-icp",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "RFFWT-PIAAA-AAAAQ-AABQQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.006225547566635475,
                "volume": 2244.478198,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00289297,
                    "eth": 0.05247832,
                    "usd": 179.91
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:47:30+00:00",
                "last_traded_at": "2024-03-01T08:47:30+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/m3don-saaaa-aaaag-qclga-cai",
                "token_info_url": null,
                "coin_id": "ic-x",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "IY6HH-XAAAA-AAAAN-QAUZA-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.00007373188433334358,
                "volume": 140000,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00215717,
                    "eth": 0.03913088,
                    "usd": 134.15
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T04:32:12+00:00",
                "last_traded_at": "2024-03-01T04:32:12+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/s7qlk-oaaaa-aaaag-qbnvq-cai",
                "token_info_url": null,
                "coin_id": "baby-arof",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "XSI2V-CYAAA-AAAAQ-AABFQ-CAI",
                "target": "RYJL3-TYAAA-AAAAA-AAABA-CAI",
                "market": {
                    "name": "ICPSwap",
                    "identifier": "icpswap",
                    "has_trading_incentive": false
                },
                "last": 0.001955326892850239,
                "volume": 644.379269,
                "converted_last": {
                    "btc": 0.00020642,
                    "eth": 0.00374453,
                    "usd": 12.84
                },
                "converted_volume": {
                    "btc": 0.00026009,
                    "eth": 0.0047181,
                    "usd": 16.17
                },
                "trust_score": null,
                "bid_ask_spread_percentage": null,
                "timestamp": "2024-03-01T08:23:06+00:00",
                "last_traded_at": "2024-03-01T08:23:06+00:00",
                "last_fetch_at": "2024-03-01T08:47:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://info.icpswap.com/swap/pool/details/tupjz-uyaaa-aaaag-qcjmq-cai",
                "token_info_url": null,
                "coin_id": "modclub",
                "target_coin_id": "internet-computer"
            },
            {
                "base": "ICP",
                "target": "BTR",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 196.673,
                "volume": 31939.12,
                "converted_last": {
                    "btc": 0.00020848,
                    "eth": 0.00378189,
                    "usd": 12.96
                },
                "converted_volume": {
                    "btc": 6.658806,
                    "eth": 120.79,
                    "usd": 414054
                },
                "trust_score": "yellow",
                "bid_ask_spread_percentage": 2.647977,
                "timestamp": "2024-03-01T08:48:45+00:00",
                "last_traded_at": "2024-03-01T08:48:45+00:00",
                "last_fetch_at": "2024-03-01T08:48:45+00:00",
                "is_anomaly": true,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/icp_btr",
                "token_info_url": null,
                "coin_id": "internet-computer",
                "target_coin_id": "bitrue-token"
            }
        ]
    }
]
