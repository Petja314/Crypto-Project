import React, {useEffect, useState} from 'react';
import {Avatar, Box, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RedditIcon from '@mui/icons-material/Reddit';
import {coinGeckoApi} from "../api/CointGeckoApi";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import moment from "moment";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {coinChartDataThunk, coinDescriptionDataThunk} from "../redux/CoinDescriptionReducer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export const CoinContainerDescription = () => {
    const {id} = useParams()

    // console.log('coinCharData' , coinCharData)
    return (
        <Container>

            <CoinDescription
                id={id}
            />

        </Container>
    )
}

const CryptoChart = ({
                         priceChangedData,
                         price30d,
                         price60d
                     }: any) => {
    const {id} = useParams()
    const {cryptoChartData} = useSelector((state: any) => state.coinDetails)
    const dispatch: any = useDispatch()
    const formattedPrice = (price: any) => {
        return Number(price).toLocaleString('en-US')
    }


    useEffect(() => {
        // console.log('Fetching data...');
        dispatch(coinChartDataThunk(id))
        // console.log('Effect ran due to id change:', id); // Debugging statement
    }, [id]);


    const coinCharData = cryptoChartData.map((value: any) => ({
        x: value[0], y: value[1].toFixed(2)
    }))
    const options = {
        responsive: true
    }
    const data: any = {
        labels: coinCharData.map((value: any) => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: id,
                data: coinCharData.map((value: any) => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }


    console.log('price24h', priceChangedData)
    return (
        <Box sx={{marginTop: "50px"}}>
            <Paper sx={{borderRadius: '20px', padding: "30px"}}>
                <Line options={options} data={data}/>
            </Paper>

            <Box sx={{display: "flex", justifyContent: "space-evenly", gap: 5, marginTop: "30px"}}>

                {
                    priceChangedData.map((item: any, index: any) => (
                        <Paper key={index} sx={{borderRadius: '20px', padding: "30px"}}>
                                <Typography sx={{textAlign : "center"}} >{item.name}</Typography>
                            <Box sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B", borderRadius: "5px", padding: "5px", textAlign: "center", marginTop: "30px"}}>
                                {formattedPrice(item.price)}%
                            </Box>
                        </Paper>

                    ))

                }
            </Box>

        </Box>
    )
}


const CoinDescription = ({id}: any) => {
    const dispatch: any = useDispatch()
    const {coinData} = useSelector((state: any) => state.coinDetails)

    useEffect(() => {
        // console.log('Fetching data...');
        dispatch(coinDescriptionDataThunk(id))
        // console.log('Effect ran due to id change:', id); // Debugging statement
    }, [id]);

    const formattedPrice = (price: any) => {
        return Number(price).toLocaleString('en-US')
    }


    return (
        <Box sx={{marginTop: "50px"}}>

            {
                coinData.map((item: any, index: any) => (
                    <Box key={index}>

                        <Box sx={{display: "flex", gap: 4}}>
                            <Box>
                                <Paper sx={{width: "450px", borderRadius: '20px'}}>
                                    <Box>
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
                                                            sx={{color: item.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784"}}>{formattedPrice(item.market_data.price_change_percentage_24h)}%(24h) </Box>
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
                                    </Box>
                                </Paper>


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

                            <Box sx={{width: "750px", maxWidth: "100%"}}>
                                <CryptoChart
                                    priceChangedData={[
                                        {"price": item.market_data.price_change_percentage_24h, name: "Price changed 24h%"},
                                        {"price": item.market_data.price_change_percentage_30d, name: "Price changed 30d%"},
                                        {"price": item.market_data.price_change_percentage_60d, name: "Price changed 60d%"},
                                    ]}
                                    price30d={item.market_data.price_change_percentage_30d}
                                    price60d={item.market_data.price_change_percentage_60d}
                                />
                            </Box>
                        </Box>


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


const coinDatas = [
    {
        "id": "solana",
        "symbol": "sol",
        "name": "Solana",
        "web_slug": "solana",
        "asset_platform_id": null,
        "platforms": {
            "": ""
        },
        "detail_platforms": {
            "": {
                "decimal_place": null,
                "contract_address": ""
            }
        },
        "block_time_in_minutes": 0,
        "hashing_algorithm": null,
        "categories": [
            "Alleged SEC Securities",
            "FTX Holdings",
            "Laag 1 (L1)",
            "Layer 1 (L1)",
            "Multicoin Capital Portfolio",
            "Proof of Stake (PoS)",
            "Smart contractplatform",
            "Smart Contract Platform",
            "Solana Ecosysteem",
            "Solana Ecosystem"
        ],
        "preview_listing": false,
        "public_notice": null,
        "additional_notices": [],
        "localization": {
            "en": "Solana",
            "de": "Solana",
            "es": "Solana",
            "fr": "Solana",
            "it": "Solana",
            "pl": "Solana",
            "ro": "Solana",
            "hu": "Solana",
            "nl": "Solana",
            "pt": "Solana",
            "sv": "Solana",
            "vi": "Solana",
            "tr": "Solana",
            "ru": "Solana",
            "ja": "ソラナ",
            "zh": "Solana",
            "zh-tw": "Solana",
            "ko": "Solana",
            "ar": "Solana",
            "th": "Solana",
            "id": "Solana",
            "cs": "Solana",
            "da": "Solana",
            "el": "Solana",
            "hi": "Solana",
            "no": "Solana",
            "sk": "Solana",
            "uk": "Solana",
            "he": "Solana",
            "fi": "Solana",
            "bg": "Solana",
            "hr": "Solana",
            "lt": "Solana",
            "sl": "Solana"
        },
        "description": {
            "en": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "de": "",
            "es": "",
            "fr": "",
            "it": "",
            "pl": "",
            "ro": "",
            "hu": "",
            "nl": "",
            "pt": "",
            "sv": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "vi": "",
            "tr": "",
            "ru": "",
            "ja": "",
            "zh": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "zh-tw": "",
            "ko": "",
            "ar": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "th": "",
            "id": "",
            "cs": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "da": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "el": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "hi": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "no": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "sk": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "uk": "",
            "he": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "fi": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "bg": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "hr": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "lt": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland.",
            "sl": "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. It is a layer 1 network that offers fast speeds and affordable costs. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland."
        },
        "links": {
            "homepage": [
                "https://solana.com/",
                "",
                ""
            ],
            "whitepaper": "",
            "blockchain_site": [
                "https://solscan.io/",
                "https://xray.helius.xyz/",
                "https://solana.fm/",
                "https://solanabeach.io/",
                "https://www.oklink.com/sol",
                "https://explorer.solana.com/",
                "",
                "",
                "",
                ""
            ],
            "official_forum_url": [
                "",
                "",
                ""
            ],
            "chat_url": [
                "",
                "",
                ""
            ],
            "announcement_url": [
                "",
                ""
            ],
            "twitter_screen_name": "solana",
            "facebook_username": "",
            "bitcointalk_thread_identifier": null,
            "telegram_channel_identifier": "solana",
            "subreddit_url": "https://www.reddit.com/r/solana",
            "repos_url": {
                "github": [
                    "https://github.com/solana-labs/solana"
                ],
                "bitbucket": []
            }
        },
        "image": {
            "thumb": "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1696504756",
            "small": "https://assets.coingecko.com/coins/images/4128/small/solana.png?1696504756",
            "large": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756"
        },
        "country_origin": "",
        "genesis_date": null,
        "sentiment_votes_up_percentage": 85.88,
        "sentiment_votes_down_percentage": 14.12,
        "ico_data": {
            "ico_start_date": null,
            "ico_end_date": null,
            "short_desc": "High-Performance Blockchain",
            "description": null,
            "links": {},
            "softcap_currency": "",
            "hardcap_currency": "",
            "total_raised_currency": "",
            "softcap_amount": null,
            "hardcap_amount": null,
            "total_raised": null,
            "quote_pre_sale_currency": "",
            "base_pre_sale_amount": null,
            "quote_pre_sale_amount": null,
            "quote_public_sale_currency": "",
            "base_public_sale_amount": 0,
            "quote_public_sale_amount": 0,
            "accepting_currencies": "",
            "country_origin": "",
            "pre_sale_start_date": null,
            "pre_sale_end_date": null,
            "whitelist_url": "https://solana.com/presale/",
            "whitelist_start_date": null,
            "whitelist_end_date": null,
            "bounty_detail_url": "",
            "amount_for_sale": null,
            "kyc_required": true,
            "whitelist_available": true,
            "pre_sale_available": null,
            "pre_sale_ended": false
        },
        "watchlist_portfolio_users": 664371,
        "market_cap_rank": 5,
        "market_data": {
            "current_price": {
                "aed": 487.73,
                "ars": 111845,
                "aud": 203.94,
                "bch": 0.42418858,
                "bdt": 14580.62,
                "bhd": 50.05,
                "bmd": 132.79,
                "bnb": 0.32593406,
                "brl": 661.86,
                "btc": 0.00210547,
                "cad": 180.13,
                "chf": 116.84,
                "clp": 128772,
                "cny": 954.61,
                "czk": 3102.11,
                "dkk": 913.14,
                "dot": 15.118185,
                "eos": 150.293,
                "eth": 0.03823917,
                "eur": 122.5,
                "gbp": 104.9,
                "gel": 353.23,
                "hkd": 1039.43,
                "huf": 48163,
                "idr": 2087964,
                "ils": 473.67,
                "inr": 11008.01,
                "jpy": 19893.97,
                "krw": 177305,
                "kwd": 40.85,
                "lkr": 41147,
                "ltc": 1.605316,
                "mmk": 278988,
                "mxn": 2267.07,
                "myr": 631.09,
                "ngn": 209877,
                "nok": 1408.5,
                "nzd": 217.86,
                "php": 7454.78,
                "pkr": 36751,
                "pln": 529.12,
                "rub": 12071.95,
                "sar": 497.98,
                "sek": 1372.83,
                "sgd": 178.51,
                "thb": 4760.27,
                "try": 4146.61,
                "twd": 4199.04,
                "uah": 5051.5,
                "usd": 132.79,
                "vef": 13.3,
                "vnd": 3273547,
                "xag": 5.86,
                "xau": 0.064875,
                "xdr": 100.11,
                "xlm": 1057,
                "xrp": 220.209,
                "yfi": 0.01477439,
                "zar": 2553.6,
                "bits": 2105.47,
                "link": 6.581262,
                "sats": 210547
            },
            "total_value_locked": null,
            "mcap_to_tvl_ratio": null,
            "fdv_to_tvl_ratio": null,
            "roi": null,
            "ath": {
                "aed": 954.83,
                "ars": 113214,
                "aud": 351.54,
                "bch": 0.53213545,
                "bdt": 22298,
                "bhd": 98.01,
                "bmd": 259.96,
                "bnb": 0.51896551,
                "brl": 1441.03,
                "btc": 0.00460798,
                "cad": 323.76,
                "chf": 237.14,
                "clp": 210931,
                "cny": 1663.45,
                "czk": 5672.2,
                "dkk": 1671.48,
                "dot": 15.531667,
                "eos": 156.68,
                "eth": 0.06088365,
                "eur": 225.04,
                "gbp": 192.59,
                "gel": 357.53,
                "hkd": 2023.51,
                "huf": 80678,
                "idr": 3722574,
                "ils": 808.42,
                "inr": 19286.66,
                "jpy": 29483,
                "krw": 307142,
                "kwd": 78.5,
                "lkr": 52381,
                "ltc": 1.724421,
                "mmk": 470000,
                "mxn": 5287.88,
                "myr": 1081.43,
                "ngn": 212436,
                "nok": 2229.37,
                "nzd": 365.47,
                "php": 13087.12,
                "pkr": 44232,
                "pln": 1033.4,
                "rub": 18495.72,
                "sar": 975.1,
                "sek": 2284.79,
                "sgd": 180.67,
                "thb": 8645.65,
                "try": 4197.13,
                "twd": 7238.58,
                "uah": 6785.36,
                "usd": 259.96,
                "vef": 1215700,
                "vnd": 5886128,
                "xag": 10.79,
                "xau": 0.143006,
                "xdr": 184.57,
                "xlm": 1062,
                "xrp": 265.489,
                "yfi": 0.01544476,
                "zar": 3910.69,
                "bits": 4607.98,
                "link": 10.461951,
                "sats": 460798
            },
            "ath_change_percentage": {
                "aed": -48.84472,
                "ars": -1.06415,
                "aud": -41.90073,
                "bch": -20.26056,
                "bdt": -34.5133,
                "bhd": -48.86015,
                "bmd": -48.84332,
                "bnb": -37.17008,
                "brl": -54.00301,
                "btc": -54.29984,
                "cad": -44.28123,
                "chf": -50.65819,
                "clp": -38.86103,
                "cny": -42.52839,
                "czk": -45.22993,
                "dkk": -45.28926,
                "dot": -2.68432,
                "eos": -4.08878,
                "eth": -37.16729,
                "eur": -45.48468,
                "gbp": -45.45312,
                "gel": -1.05958,
                "hkd": -48.55666,
                "huf": -40.21527,
                "idr": -43.82839,
                "ils": -41.32145,
                "inr": -42.84043,
                "jpy": -32.42544,
                "krw": -42.18766,
                "kwd": -47.88831,
                "lkr": -21.33077,
                "ltc": -6.97456,
                "mmk": -40.55378,
                "mxn": -57.06405,
                "myr": -41.55719,
                "ngn": -1.05958,
                "nok": -36.72781,
                "nzd": -40.30095,
                "php": -42.95364,
                "pkr": -16.79027,
                "pln": -48.72332,
                "rub": -34.6353,
                "sar": -48.85497,
                "sek": -39.82625,
                "sgd": -1.04619,
                "thb": -44.8594,
                "try": -1.05859,
                "twd": -41.90574,
                "uah": -25.44356,
                "usd": -48.84332,
                "vef": -99.9989,
                "vnd": -44.30374,
                "xag": -45.67016,
                "xau": -54.56801,
                "xdr": -45.68158,
                "xlm": -0.46646,
                "xrp": -17.00725,
                "yfi": -4.35756,
                "zar": -34.60625,
                "bits": -54.29984,
                "link": -37.08916,
                "sats": -54.29984
            },
            "ath_date": {
                "aed": "2021-11-06T21:54:35.825Z",
                "ars": "2024-02-29T14:35:15.734Z",
                "aud": "2021-11-06T21:54:35.825Z",
                "bch": "2023-12-25T18:15:38.545Z",
                "bdt": "2021-11-06T21:54:35.825Z",
                "bhd": "2021-11-06T21:54:35.825Z",
                "bmd": "2021-11-06T21:54:35.825Z",
                "bnb": "2021-09-09T02:54:17.445Z",
                "brl": "2021-11-06T21:54:35.825Z",
                "btc": "2021-09-09T02:24:33.650Z",
                "cad": "2021-11-06T21:54:35.825Z",
                "chf": "2021-11-06T21:54:35.825Z",
                "clp": "2021-11-06T21:54:35.825Z",
                "cny": "2021-11-06T21:54:35.825Z",
                "czk": "2021-11-06T21:54:35.825Z",
                "dkk": "2021-11-06T21:54:35.825Z",
                "dot": "2024-02-13T00:34:58.967Z",
                "eos": "2024-02-14T15:05:19.544Z",
                "eth": "2021-09-09T04:24:59.136Z",
                "eur": "2021-11-06T21:54:35.825Z",
                "gbp": "2021-11-06T21:54:35.825Z",
                "gel": "2024-02-29T14:35:15.734Z",
                "hkd": "2021-11-06T21:54:35.825Z",
                "huf": "2021-11-06T21:54:35.825Z",
                "idr": "2021-11-06T21:54:35.825Z",
                "ils": "2021-11-06T21:54:35.825Z",
                "inr": "2021-11-06T21:54:35.825Z",
                "jpy": "2021-11-06T21:54:35.825Z",
                "krw": "2021-11-06T21:54:35.825Z",
                "kwd": "2021-11-06T21:54:35.825Z",
                "lkr": "2021-11-06T21:54:35.825Z",
                "ltc": "2023-12-25T18:15:38.545Z",
                "mmk": "2021-11-06T21:54:35.825Z",
                "mxn": "2021-11-06T21:54:35.825Z",
                "myr": "2021-11-06T21:54:35.825Z",
                "ngn": "2024-02-29T14:35:15.734Z",
                "nok": "2021-11-06T21:54:35.825Z",
                "nzd": "2021-11-06T21:54:35.825Z",
                "php": "2021-11-06T21:54:35.825Z",
                "pkr": "2021-11-06T21:54:35.825Z",
                "pln": "2021-11-06T21:54:35.825Z",
                "rub": "2021-11-06T21:54:35.825Z",
                "sar": "2021-11-06T21:54:35.825Z",
                "sek": "2021-11-06T21:54:35.825Z",
                "sgd": "2024-02-29T14:35:15.734Z",
                "thb": "2021-11-06T21:54:35.825Z",
                "try": "2024-02-29T14:35:15.734Z",
                "twd": "2021-11-06T21:54:35.825Z",
                "uah": "2021-11-06T21:54:35.825Z",
                "usd": "2021-11-06T21:54:35.825Z",
                "vef": "2020-09-01T04:25:35.418Z",
                "vnd": "2021-11-06T21:54:35.825Z",
                "xag": "2021-12-02T21:53:18.480Z",
                "xau": "2021-11-06T21:54:35.825Z",
                "xdr": "2021-11-06T21:54:35.825Z",
                "xlm": "2024-02-29T14:21:05.850Z",
                "xrp": "2021-12-04T06:58:31.887Z",
                "yfi": "2024-02-14T14:55:11.421Z",
                "zar": "2021-11-06T21:54:35.825Z",
                "bits": "2021-09-09T02:24:33.650Z",
                "link": "2021-12-04T05:59:26.757Z",
                "sats": "2021-09-09T02:24:33.650Z"
            },
            "atl": {
                "aed": 1.84,
                "ars": 33.61,
                "aud": 0.772126,
                "bch": 0.00215768,
                "bdt": 42.55,
                "bhd": 0.189097,
                "bmd": 0.500801,
                "bnb": 0.03176128,
                "brl": 2.71,
                "btc": 0.00004553,
                "cad": 0.701947,
                "chf": 0.48705,
                "clp": 412.56,
                "cny": 3.56,
                "czk": 12.74,
                "dkk": 3.45,
                "dot": 0.16108838,
                "eos": 0.20065292,
                "eth": 0.00159273,
                "eur": 0.46316,
                "gbp": 0.406099,
                "gel": 171.83,
                "hkd": 3.88,
                "huf": 162.14,
                "idr": 7456.91,
                "ils": 1.76,
                "inr": 38.03,
                "jpy": 53.94,
                "krw": 613.02,
                "kwd": 0.154855,
                "lkr": 94.29,
                "ltc": 0.00949809,
                "mmk": 700.46,
                "mxn": 11.97,
                "myr": 2.17,
                "ngn": 199.76,
                "nok": 5.15,
                "nzd": 0.824873,
                "php": 25.23,
                "pkr": 80.08,
                "pln": 2.11,
                "rub": 36.89,
                "sar": 1.88,
                "sek": 4.94,
                "sgd": 0.709882,
                "thb": 16.12,
                "try": 3.54,
                "twd": 14.95,
                "uah": 13.45,
                "usd": 0.500801,
                "vef": 0.192569,
                "vnd": 11687.29,
                "xag": 0.03055067,
                "xau": 0.000295,
                "xdr": 0.36766,
                "xlm": 5.523115,
                "xrp": 2.54809,
                "yfi": 0.0000534,
                "zar": 9.23,
                "bits": 45.53,
                "link": 0.10396816,
                "sats": 4553.08
            },
            "atl_change_percentage": {
                "aed": 26453.30493,
                "ars": 333117.87949,
                "aud": 26351.56536,
                "bch": 19565.69681,
                "bdt": 34220.38561,
                "bhd": 26405.17021,
                "bmd": 26454.75083,
                "bnb": 926.61362,
                "brl": 24343.81664,
                "btc": 4525.12121,
                "cad": 25598.83778,
                "chf": 23923.73762,
                "clp": 31158.694,
                "cny": 26790.65964,
                "czk": 24286.84029,
                "dkk": 26371.38902,
                "dot": 9282.89175,
                "eos": 74792.22582,
                "eth": 2301.8434,
                "eur": 26388.30926,
                "gbp": 25768.6303,
                "gel": 105.86463,
                "hkd": 26718.77687,
                "huf": 29648.0772,
                "idr": 27941.51694,
                "ils": 26883.28753,
                "inr": 28891.36985,
                "jpy": 36837.36098,
                "krw": 28865.96296,
                "kwd": 26315.37092,
                "lkr": 43604.00325,
                "ltc": 16789.19905,
                "mmk": 39787.57653,
                "mxn": 18861.17563,
                "myr": 29018.93247,
                "ngn": 105117.02499,
                "nok": 27296.15988,
                "nzd": 26350.44126,
                "php": 29490.61411,
                "pkr": 45861.85073,
                "pln": 24997.46256,
                "rub": 32674.76957,
                "sar": 26408.35209,
                "sek": 27715.32858,
                "sgd": 25083.99438,
                "thb": 29481.35703,
                "try": 117084.8759,
                "twd": 28019.67632,
                "uah": 37524.41719,
                "usd": 26454.75083,
                "vef": 6814.90181,
                "vnd": 27950.58651,
                "xag": 19095.26258,
                "xau": 21923.77266,
                "xdr": 27168.2236,
                "xlm": 19046.44815,
                "xrp": 8547.13618,
                "yfi": 27560.93311,
                "zar": 27604.72219,
                "bits": 4525.12121,
                "link": 6230.49752,
                "sats": 4525.12121
            },
            "atl_date": {
                "aed": "2020-05-11T19:35:23.449Z",
                "ars": "2020-04-21T11:37:15.012Z",
                "aud": "2020-05-11T19:35:23.449Z",
                "bch": "2020-06-02T11:34:59.441Z",
                "bdt": "2020-05-11T19:35:23.449Z",
                "bhd": "2020-05-11T19:35:23.449Z",
                "bmd": "2020-05-11T19:35:23.449Z",
                "bnb": "2020-06-01T23:44:31.058Z",
                "brl": "2020-04-21T11:37:15.012Z",
                "btc": "2020-12-27T11:19:57.793Z",
                "cad": "2020-05-11T19:35:23.449Z",
                "chf": "2020-05-11T19:35:23.449Z",
                "clp": "2020-05-11T19:35:23.449Z",
                "cny": "2020-05-11T19:35:23.449Z",
                "czk": "2020-05-11T19:35:23.449Z",
                "dkk": "2020-05-11T19:35:23.449Z",
                "dot": "2020-12-31T23:58:59.996Z",
                "eos": "2020-06-02T11:34:59.441Z",
                "eth": "2021-01-06T23:57:36.798Z",
                "eur": "2020-05-11T19:35:23.449Z",
                "gbp": "2020-05-11T19:35:23.449Z",
                "gel": "2023-12-13T07:05:24.812Z",
                "hkd": "2020-05-11T19:35:23.449Z",
                "huf": "2020-05-11T19:35:23.449Z",
                "idr": "2020-05-11T19:35:23.449Z",
                "ils": "2020-05-11T19:35:23.449Z",
                "inr": "2020-05-11T19:35:23.449Z",
                "jpy": "2020-05-11T19:35:23.449Z",
                "krw": "2020-05-11T19:35:23.449Z",
                "kwd": "2020-05-11T19:35:23.449Z",
                "lkr": "2020-05-11T19:35:23.449Z",
                "ltc": "2020-12-27T11:13:46.014Z",
                "mmk": "2020-05-11T19:35:23.449Z",
                "mxn": "2020-05-11T19:35:23.449Z",
                "myr": "2020-05-11T19:35:23.449Z",
                "ngn": "2020-05-12T00:00:00.000Z",
                "nok": "2020-05-11T19:35:23.449Z",
                "nzd": "2020-05-11T19:35:23.449Z",
                "php": "2020-05-11T19:35:23.449Z",
                "pkr": "2020-05-11T19:35:23.449Z",
                "pln": "2020-05-11T19:35:23.449Z",
                "rub": "2020-05-11T19:35:23.449Z",
                "sar": "2020-05-11T19:35:23.449Z",
                "sek": "2020-05-11T19:35:23.449Z",
                "sgd": "2020-05-11T19:35:23.449Z",
                "thb": "2020-05-11T19:35:23.449Z",
                "try": "2020-05-11T19:35:23.449Z",
                "twd": "2020-05-11T19:35:23.449Z",
                "uah": "2020-05-11T19:35:23.449Z",
                "usd": "2020-05-11T19:35:23.449Z",
                "vef": "2021-01-06T23:57:36.798Z",
                "vnd": "2020-05-11T19:35:23.449Z",
                "xag": "2020-06-02T15:05:09.169Z",
                "xau": "2020-05-11T19:35:23.449Z",
                "xdr": "2020-05-11T19:35:23.449Z",
                "xlm": "2021-01-06T12:37:45.097Z",
                "xrp": "2020-12-11T19:19:33.217Z",
                "yfi": "2020-12-23T22:54:35.073Z",
                "zar": "2020-05-11T19:35:23.449Z",
                "bits": "2020-12-27T11:19:57.793Z",
                "link": "2020-07-17T00:00:00.000Z",
                "sats": "2020-12-27T11:19:57.793Z"
            },
            "market_cap": {
                "aed": 215845842242,
                "ars": 49497082730267,
                "aud": 90254050451,
                "bch": 187725595,
                "bdt": 6452687800036,
                "bhd": 22148396201,
                "bmd": 58767143740,
                "bnb": 144242841,
                "brl": 292907197827,
                "btc": 931782,
                "cad": 79715985003,
                "chf": 51706095118,
                "clp": 56988262298703,
                "cny": 422465242916,
                "czk": 1372847550242,
                "dkk": 404112557762,
                "dot": 6690586197,
                "eos": 66512519883,
                "eth": 16922829,
                "eur": 54214100511,
                "gbp": 46422987663,
                "gel": 156320602348,
                "hkd": 460003813788,
                "huf": 21314459578778,
                "idr": 924033233868143,
                "ils": 209624164734,
                "inr": 4871619326919,
                "jpy": 8804121283368,
                "krw": 78466913809828,
                "kwd": 18076303277,
                "lkr": 18209860191334,
                "ltc": 710436143,
                "mmk": 123466704584407,
                "mxn": 1003297947796,
                "myr": 279290850623,
                "ngn": 92881470680602,
                "nok": 623336923097,
                "nzd": 96415667938,
                "php": 3299128858705,
                "pkr": 16264410392228,
                "pln": 234162091767,
                "rub": 5342467618043,
                "sar": 220383782314,
                "sek": 607547249383,
                "sgd": 79001964206,
                "thb": 2106669876995,
                "try": 1835092155221,
                "twd": 1858293482336,
                "uah": 2235554274315,
                "usd": 58767143740,
                "vef": 5884354103,
                "vnd": 1448715685341129,
                "xag": 2591446510,
                "xau": 28710688,
                "xdr": 44302786651,
                "xlm": 467665546615,
                "xrp": 97454066469,
                "yfi": 6538439,
                "zar": 1130101459323,
                "bits": 931781725533,
                "link": 2912552012,
                "sats": 93178172553269
            },
            "market_cap_rank": 5,
            "fully_diluted_valuation": {
                "aed": 278351977558,
                "ars": 63830791078651,
                "aud": 116390444054,
                "bch": 242088474,
                "bdt": 8321301865494,
                "bhd": 28562282314,
                "bmd": 75785340619,
                "bnb": 186013683,
                "brl": 377729294711,
                "btc": 1201614,
                "cad": 102800692560,
                "chf": 66679504587,
                "clp": 73491318358032,
                "cny": 544805656639,
                "czk": 1770406260907,
                "dkk": 521138273690,
                "dot": 8628092530,
                "eos": 85773676479,
                "eth": 21823459,
                "eur": 69913795569,
                "gbp": 59866478251,
                "gel": 201589006045,
                "hkd": 593214907095,
                "huf": 27486848543002,
                "idr": 1191621183458176,
                "ils": 270328583547,
                "inr": 6282376623403,
                "jpy": 11353679757901,
                "krw": 101189906671387,
                "kwd": 23310964492,
                "lkr": 23483197742758,
                "ltc": 916169166,
                "mmk": 159221048812999,
                "mxn": 1293839922736,
                "myr": 360169831290,
                "ngn": 119778730847627,
                "nok": 803847150480,
                "nzd": 124336385447,
                "php": 4254513464341,
                "pkr": 20974371104277,
                "pln": 301972373595,
                "rub": 6889576426758,
                "sar": 284204045775,
                "sek": 783484993592,
                "sgd": 101879900671,
                "thb": 2716733944159,
                "try": 2366510863040,
                "twd": 2396430991302,
                "uah": 2882941578727,
                "usd": 75785340619,
                "vef": 7588386156,
                "vnd": 1868244816513773,
                "xag": 3341895555,
                "xau": 37024928,
                "xdr": 57132294732,
                "xlm": 603095377628,
                "xrp": 125675490624,
                "yfi": 8431886,
                "zar": 1457364074179,
                "bits": 1201613537054,
                "link": 3755989015,
                "sats": 120161353705423
            },
            "market_cap_fdv_ratio": 0.78,
            "total_volume": {
                "aed": 32745307037,
                "ars": 7509049767302,
                "aud": 13692163642,
                "bch": 28479271,
                "bdt": 978917365441,
                "bhd": 3360064880,
                "bmd": 8915382133,
                "bnb": 21882637,
                "brl": 44436047629,
                "btc": 141358,
                "cad": 12093466233,
                "chf": 7844172224,
                "clp": 8645513516120,
                "cny": 64090899080,
                "czk": 208270467855,
                "dkk": 61306669817,
                "dot": 1015008198,
                "eos": 10090409261,
                "eth": 2567310,
                "eur": 8224653987,
                "gbp": 7042688285,
                "gel": 23714916475,
                "hkd": 69785759894,
                "huf": 3233550926878,
                "idr": 140182232103832,
                "ils": 31801435531,
                "inr": 739058343550,
                "jpy": 1335646087153,
                "krw": 11903973494670,
                "kwd": 2742300221,
                "lkr": 2762561728688,
                "ltc": 107778076,
                "mmk": 18730752969450,
                "mxn": 152207237394,
                "myr": 42370353588,
                "ngn": 14090761461672,
                "nok": 94564522173,
                "nzd": 14626923628,
                "php": 500500664327,
                "pkr": 2467423539618,
                "pln": 35524008764,
                "rub": 810489285655,
                "sar": 33433743930,
                "sek": 92169119470,
                "sgd": 11985144340,
                "thb": 319596389869,
                "try": 278396171270,
                "twd": 281915973052,
                "uah": 339149044294,
                "usd": 8915382133,
                "vef": 892697213,
                "vnd": 219780188646258,
                "xag": 393140358,
                "xau": 4355610,
                "xdr": 6721039129,
                "xlm": 70948097752,
                "xrp": 14784455866,
                "yfi": 991926,
                "zar": 171444207054,
                "bits": 141357731877,
                "link": 441854283,
                "sats": 14135773187718
            },
            "high_24h": {
                "aed": 493.67,
                "ars": 113214,
                "aud": 206.35,
                "bch": 0.42609037,
                "bdt": 14758.41,
                "bhd": 50.66,
                "bmd": 134.41,
                "bnb": 0.32788412,
                "brl": 669.71,
                "btc": 0.00212554,
                "cad": 182.3,
                "chf": 118.17,
                "clp": 131220,
                "cny": 966.25,
                "czk": 3139.12,
                "dkk": 923.97,
                "dot": 15.203558,
                "eos": 150.598,
                "eth": 0.03854169,
                "eur": 123.96,
                "gbp": 106.12,
                "gel": 357.53,
                "hkd": 1052.11,
                "huf": 48733,
                "idr": 2113059,
                "ils": 479.17,
                "inr": 11141.9,
                "jpy": 20131,
                "krw": 179254,
                "kwd": 41.34,
                "lkr": 41649,
                "ltc": 1.632633,
                "mmk": 282390,
                "mxn": 2295.25,
                "myr": 638.79,
                "ngn": 212436,
                "nok": 1424.98,
                "nzd": 220.52,
                "php": 7546.68,
                "pkr": 37200,
                "pln": 535.84,
                "rub": 12219.14,
                "sar": 504.07,
                "sek": 1388.84,
                "sgd": 180.67,
                "thb": 4815.43,
                "try": 4197.13,
                "twd": 4247.25,
                "uah": 5113.1,
                "usd": 134.41,
                "vef": 13.46,
                "vnd": 3313462,
                "xag": 5.92,
                "xau": 0.06561,
                "xdr": 101.33,
                "xlm": 1062,
                "xrp": 222.502,
                "yfi": 0.01494028,
                "zar": 2582.41,
                "bits": 2125.54,
                "link": 6.604035,
                "sats": 212554
            },
            "low_24h": {
                "aed": 401.88,
                "ars": 92101,
                "aud": 168.38,
                "bch": 0.36746327,
                "bdt": 12007.05,
                "bhd": 41.24,
                "bmd": 109.42,
                "bnb": 0.26904887,
                "brl": 543.11,
                "btc": 0.00182465,
                "cad": 148.48,
                "chf": 96.16,
                "clp": 107183,
                "cny": 787.6,
                "czk": 2557.17,
                "dkk": 752.35,
                "dot": 13.16301,
                "eos": 130.988,
                "eth": 0.03315744,
                "eur": 100.93,
                "gbp": 86.42,
                "gel": 291.04,
                "hkd": 856.49,
                "huf": 39744,
                "idr": 1720354,
                "ils": 393.26,
                "inr": 9069.5,
                "jpy": 16484.59,
                "krw": 146236,
                "kwd": 33.67,
                "lkr": 33938,
                "ltc": 1.479006,
                "mmk": 229753,
                "mxn": 1870.83,
                "myr": 521.8,
                "ngn": 172630,
                "nok": 1157.77,
                "nzd": 179.55,
                "php": 6155.65,
                "pkr": 30478,
                "pln": 436.09,
                "rub": 10019.72,
                "sar": 410.37,
                "sek": 1130.46,
                "sgd": 147.27,
                "thb": 3941.14,
                "try": 3413.75,
                "twd": 3462.86,
                "uah": 4174.26,
                "usd": 109.42,
                "vef": 10.96,
                "vnd": 2694961,
                "xag": 4.88,
                "xau": 0.053807,
                "xdr": 82.27,
                "xlm": 901.831,
                "xrp": 189.448,
                "yfi": 0.01275219,
                "zar": 2110.1,
                "bits": 1824.65,
                "link": 5.556184,
                "sats": 182465
            },
            "price_change_24h": 21.590397,
            "price_change_percentage_24h": 19.41564,
            "price_change_percentage_7d": 28.02449,
            "price_change_percentage_14d": 14.37516,
            "price_change_percentage_30d": 27.06282,
            "price_change_percentage_60d": 28.35565,
            "price_change_percentage_200d": 440.02039,
            "price_change_percentage_1y": 494.20686,
            "market_cap_change_24h": 9648702810,
            "market_cap_change_percentage_24h": 19.64375,
            "price_change_24h_in_currency": {
                "aed": 79.3,
                "ars": 18243.73,
                "aud": 32.7,
                "bch": 0.05422022,
                "bdt": 2377.62,
                "bhd": 8.13,
                "bmd": 21.59,
                "bnb": 0.05685044,
                "brl": 109.91,
                "btc": 0.00026216,
                "cad": 29.2,
                "chf": 18.92,
                "clp": 19680.28,
                "cny": 154.17,
                "czk": 494.98,
                "dkk": 147.38,
                "dot": 1.955175,
                "eos": 19.305037,
                "eth": 0.00497293,
                "eur": 19.77,
                "gbp": 16.96,
                "gel": 57.43,
                "hkd": 168.99,
                "huf": 7726.43,
                "idr": 340757,
                "ils": 74.5,
                "inr": 1788.54,
                "jpy": 3130.27,
                "krw": 28670,
                "kwd": 6.63,
                "lkr": 6655.13,
                "ltc": 0.12630992,
                "mmk": 45486,
                "mxn": 366.58,
                "myr": 100.77,
                "ngn": 34081,
                "nok": 231.18,
                "nzd": 35.3,
                "php": 1200.5,
                "pkr": 5716.27,
                "pln": 85.57,
                "rub": 1879.37,
                "sar": 80.88,
                "sek": 221.09,
                "sgd": 28.8,
                "thb": 758.32,
                "try": 679.43,
                "twd": 677.91,
                "uah": 809.12,
                "usd": 21.59,
                "vef": 2.16,
                "vnd": 534605,
                "xag": 0.887749,
                "xau": 0.01018103,
                "xdr": 16.33,
                "xlm": 153.948,
                "xrp": 30.465174,
                "yfi": 0.0020222,
                "zar": 419.14,
                "bits": 262.16,
                "link": 0.93333512,
                "sats": 26216
            },
            "price_change_percentage_1h_in_currency": {
                "aed": -0.31109,
                "ars": -0.31061,
                "aud": -0.44152,
                "bch": -0.3879,
                "bdt": -0.31245,
                "bhd": -0.39227,
                "bmd": -0.31245,
                "bnb": 0.51448,
                "brl": -0.48217,
                "btc": -0.47883,
                "cad": -0.41259,
                "chf": -0.3419,
                "clp": -1.06639,
                "cny": -0.37758,
                "czk": -0.52663,
                "dkk": -0.38821,
                "dot": -0.26851,
                "eos": 0.3905,
                "eth": 0.2486,
                "eur": -0.38739,
                "gbp": -0.41519,
                "gel": -0.31245,
                "hkd": -0.30987,
                "huf": -0.45217,
                "idr": -0.40011,
                "ils": -0.5252,
                "inr": -0.33109,
                "jpy": -0.41528,
                "krw": -0.32465,
                "kwd": -0.35424,
                "lkr": -0.31245,
                "ltc": 0.28195,
                "mmk": -0.31245,
                "mxn": -0.36768,
                "myr": -0.31245,
                "ngn": -0.31245,
                "nok": -0.21037,
                "nzd": -0.41988,
                "php": -0.34971,
                "pkr": -0.31245,
                "pln": -0.44135,
                "rub": -0.62966,
                "sar": -0.31498,
                "sek": -0.27906,
                "sgd": -0.36233,
                "thb": -0.44783,
                "try": -0.30511,
                "twd": -0.29983,
                "uah": -0.31245,
                "usd": -0.31245,
                "vef": -0.31245,
                "vnd": -0.31245,
                "xag": -0.96021,
                "xau": -0.73305,
                "xdr": -0.31245,
                "xlm": 0.61847,
                "xrp": -0.26171,
                "yfi": -0.2246,
                "zar": -0.58511,
                "bits": -0.47883,
                "link": 0.43696,
                "sats": -0.47883
            },
            "price_change_percentage_24h_in_currency": {
                "aed": 19.41564,
                "ars": 19.49099,
                "aud": 19.09553,
                "bch": 14.65537,
                "bdt": 19.48388,
                "bhd": 19.39505,
                "bmd": 19.41564,
                "bnb": 21.12743,
                "brl": 19.91366,
                "btc": 14.22216,
                "cad": 19.3479,
                "chf": 19.31949,
                "clp": 18.04015,
                "cny": 19.26136,
                "czk": 18.98576,
                "dkk": 19.24572,
                "dot": 14.85355,
                "eos": 14.73802,
                "eth": 14.94888,
                "eur": 19.24167,
                "gbp": 19.28171,
                "gel": 19.41564,
                "hkd": 19.41378,
                "huf": 19.10773,
                "idr": 19.50293,
                "ils": 18.66315,
                "inr": 19.39957,
                "jpy": 18.67292,
                "krw": 19.2892,
                "kwd": 19.36907,
                "lkr": 19.29457,
                "ltc": 8.54019,
                "mmk": 19.4797,
                "mxn": 19.28838,
                "myr": 19.00248,
                "ngn": 19.38694,
                "nok": 19.63579,
                "nzd": 19.33854,
                "php": 19.19483,
                "pkr": 18.41871,
                "pln": 19.29278,
                "rub": 18.43861,
                "sar": 19.39186,
                "sek": 19.1963,
                "sgd": 19.23541,
                "thb": 18.94863,
                "try": 19.59603,
                "twd": 19.25273,
                "uah": 19.07242,
                "usd": 19.41564,
                "vef": 19.41564,
                "vnd": 19.51866,
                "xag": 17.86957,
                "xau": 18.61444,
                "xdr": 19.49395,
                "xlm": 17.05231,
                "xrp": 16.05593,
                "yfi": 15.85764,
                "zar": 19.6369,
                "bits": 14.22216,
                "link": 16.52527,
                "sats": 14.22216
            },
            "price_change_percentage_7d_in_currency": {
                "aed": 28.02274,
                "ars": 28.61594,
                "aud": 28.86921,
                "bch": 6.36484,
                "bdt": 28.05072,
                "bhd": 28.04521,
                "bmd": 28.02449,
                "bnb": 18.71894,
                "brl": 29.1386,
                "btc": 3.80798,
                "cad": 28.61252,
                "chf": 27.99365,
                "clp": 28.01129,
                "cny": 27.95151,
                "czk": 27.75543,
                "dkk": 27.86027,
                "dot": 8.48639,
                "eos": 10.39473,
                "eth": 8.58463,
                "eur": 27.8626,
                "gbp": 27.76038,
                "gel": 28.75052,
                "hkd": 28.11644,
                "huf": 29.8273,
                "idr": 29.04469,
                "ils": 24.99656,
                "inr": 28.04896,
                "jpy": 27.39346,
                "krw": 28.73186,
                "kwd": 27.9625,
                "lkr": 27.59699,
                "ltc": 6.60973,
                "mmk": 28.0335,
                "mxn": 27.69705,
                "myr": 27.38121,
                "ngn": 26.37415,
                "nok": 29.34623,
                "nzd": 29.94559,
                "php": 28.72499,
                "pkr": 26.77901,
                "pln": 27.89443,
                "rub": 25.11484,
                "sar": 28.01087,
                "sek": 28.22179,
                "sgd": 28.15366,
                "thb": 27.61598,
                "try": 29.01482,
                "twd": 28.33618,
                "uah": 26.55226,
                "usd": 28.02449,
                "vef": 28.02449,
                "vnd": 28.29317,
                "xag": 29.54084,
                "xau": 26.65053,
                "xdr": 27.80714,
                "xlm": 17.53165,
                "xrp": 14.40195,
                "yfi": 6.31245,
                "zar": 28.7298,
                "bits": 3.80798,
                "link": 15.97715,
                "sats": 3.80798
            },
            "price_change_percentage_14d_in_currency": {
                "aed": 14.37734,
                "ars": 15.43151,
                "aud": 14.47258,
                "bch": -1.42018,
                "bdt": 14.47825,
                "bhd": 14.37273,
                "bmd": 14.37516,
                "bnb": -1.10094,
                "brl": 14.81977,
                "btc": -5.21388,
                "cad": 14.73464,
                "chf": 14.17959,
                "clp": 15.67538,
                "cny": 15.49334,
                "czk": 13.28804,
                "dkk": 13.56509,
                "dot": 2.61836,
                "eos": 0.78639,
                "eth": -7.40866,
                "eur": 13.57688,
                "gbp": 13.54722,
                "gel": 14.59056,
                "hkd": 14.48702,
                "huf": 14.99136,
                "idr": 15.19842,
                "ils": 12.4214,
                "inr": 14.1845,
                "jpy": 14.35048,
                "krw": 14.77067,
                "kwd": 14.19547,
                "lkr": 13.30771,
                "ltc": -2.64877,
                "mmk": 14.47295,
                "mxn": 14.39599,
                "myr": 13.70525,
                "ngn": 20.5894,
                "nok": 14.97241,
                "nzd": 14.75475,
                "php": 14.81795,
                "pkr": 13.36232,
                "pln": 12.96209,
                "rub": 12.91948,
                "sar": 14.36693,
                "sek": 13.12297,
                "sgd": 14.25609,
                "thb": 13.70983,
                "try": 16.18227,
                "twd": 15.37048,
                "uah": 14.82544,
                "usd": 14.37516,
                "vef": 14.37516,
                "vnd": 15.26331,
                "xag": 14.81973,
                "xau": 11.87456,
                "xdr": 14.31254,
                "xlm": 5.69134,
                "xrp": 4.27404,
                "yfi": -0.84488,
                "zar": 16.00109,
                "bits": -5.21388,
                "link": 13.314,
                "sats": -5.21388
            },
            "price_change_percentage_30d_in_currency": {
                "aed": 27.05936,
                "ars": 29.60182,
                "aud": 28.53126,
                "bch": -2.49207,
                "bdt": 27.13278,
                "bhd": 27.03485,
                "bmd": 27.06282,
                "bnb": -3.65375,
                "brl": 27.55416,
                "btc": -12.76974,
                "cad": 28.27782,
                "chf": 29.61296,
                "clp": 32.20952,
                "cny": 28.61939,
                "czk": 29.54608,
                "dkk": 27.01674,
                "dot": 0.78184,
                "eos": 2.34603,
                "eth": -15.5825,
                "eur": 27.01615,
                "gbp": 27.19341,
                "gel": 25.87974,
                "hkd": 27.23926,
                "huf": 28.78662,
                "idr": 26.58901,
                "ils": 24.33037,
                "inr": 26.71519,
                "jpy": 29.00912,
                "krw": 27.51806,
                "kwd": 27.02483,
                "lkr": 24.17323,
                "ltc": 4.2188,
                "mmk": 27.13356,
                "mxn": 25.87419,
                "myr": 27.73476,
                "ngn": 120.68112,
                "nok": 28.79523,
                "nzd": 27.59618,
                "php": 26.52418,
                "pkr": 25.83238,
                "pln": 25.79333,
                "rub": 28.67998,
                "sar": 27.06784,
                "sek": 26.0102,
                "sgd": 27.45324,
                "thb": 28.74269,
                "try": 30.70265,
                "twd": 29.03582,
                "uah": 27.80279,
                "usd": 27.06282,
                "vef": 27.06282,
                "vnd": 28.31572,
                "xag": 29.40854,
                "xau": 26.45971,
                "xdr": 27.57949,
                "xlm": 16.27167,
                "xrp": 10.79695,
                "yfi": 3.39178,
                "zar": 29.33787,
                "bits": -12.76974,
                "link": -4.68811,
                "sats": -12.76974
            },
            "price_change_percentage_60d_in_currency": {
                "aed": 28.35915,
                "ars": 33.54817,
                "aud": 34.34231,
                "bch": 8.60625,
                "bdt": 28.17661,
                "bhd": 28.12923,
                "bmd": 28.35565,
                "bnb": -0.36891,
                "brl": 31.83931,
                "btc": -13.53934,
                "cad": 31.27067,
                "chf": 34.30135,
                "clp": 40.71948,
                "cny": 30.33181,
                "czk": 33.96736,
                "dkk": 30.67024,
                "dot": 24.78619,
                "eos": 24.30048,
                "eth": -14.84615,
                "eur": 30.90949,
                "gbp": 29.17639,
                "gel": 27.16054,
                "hkd": 28.64356,
                "huf": 34.55554,
                "idr": 31.1374,
                "ils": 26.63858,
                "inr": 27.85907,
                "jpy": 36.35474,
                "krw": 32.38991,
                "kwd": 28.15151,
                "lkr": 22.56357,
                "ltc": 14.68861,
                "mmk": 28.16847,
                "mxn": 29.12127,
                "myr": 32.75522,
                "ngn": 125.83671,
                "nok": 33.26291,
                "nzd": 33.17411,
                "php": 30.06785,
                "pkr": 27.44932,
                "pln": 29.91417,
                "rub": 30.7417,
                "sar": 28.35973,
                "sek": 31.73841,
                "sgd": 30.65142,
                "thb": 33.86644,
                "try": 35.97697,
                "twd": 32.27846,
                "uah": 28.17493,
                "usd": 28.35565,
                "vef": 28.35565,
                "vnd": 30.38074,
                "xag": 34.67313,
                "xau": 29.35918,
                "xdr": 29.62183,
                "xlm": 33.30927,
                "xrp": 32.64395,
                "yfi": 17.86507,
                "zar": 34.87493,
                "bits": -13.53934,
                "link": -2.74007,
                "sats": -13.53934
            },
            "price_change_percentage_200d_in_currency": {
                "aed": 440.00569,
                "ars": 1485.17175,
                "aud": 439.15713,
                "bch": 294.9832,
                "bdt": 440.29526,
                "bhd": 438.50155,
                "bmd": 440.02039,
                "bnb": 218.6705,
                "brl": 448.43687,
                "btc": 151.36207,
                "cad": 445.05193,
                "chf": 441.85316,
                "clp": 517.00892,
                "cny": 436.45339,
                "czk": 474.03109,
                "dkk": 445.57452,
                "dot": 208.68213,
                "eos": 342.53186,
                "eth": 187.4603,
                "eur": 446.21182,
                "gbp": 441.51068,
                "gel": 451.36906,
                "hkd": 440.7055,
                "huf": 460.05406,
                "idr": 454.11994,
                "ils": 415.40003,
                "inr": 439.62682,
                "jpy": 458.31362,
                "krw": 441.89436,
                "kwd": 438.67717,
                "lkr": 419.88444,
                "ltc": 442.35549,
                "mmk": 438.84734,
                "mxn": 441.90999,
                "myr": 459.50445,
                "ngn": 1006.56772,
                "nok": 449.30565,
                "nzd": 430.25807,
                "php": 436.16678,
                "pkr": 416.85851,
                "pln": 431.20938,
                "rub": 390.95215,
                "sar": 439.75484,
                "sek": 416.49976,
                "sgd": 436.91629,
                "thb": 449.50279,
                "try": 522.75222,
                "twd": 435.1598,
                "uah": 454.7754,
                "usd": 440.02039,
                "vef": 440.02039,
                "vnd": 460.32186,
                "xag": 440.2381,
                "xau": 404.92232,
                "xdr": 442.83151,
                "xlm": 496.22502,
                "xrp": 462.00287,
                "yfi": 278.43991,
                "zar": 447.93123,
                "bits": 151.36207,
                "link": 99.91889,
                "sats": 151.36207
            },
            "price_change_percentage_1y_in_currency": {
                "aed": 494.21819,
                "ars": 2438.32445,
                "aud": 514.94486,
                "bch": 152.42114,
                "bdt": 513.16433,
                "bhd": 493.97519,
                "bmd": 494.20686,
                "bnb": 341.86711,
                "brl": 471.00774,
                "btc": 120.45781,
                "cad": 493.39189,
                "chf": 458.65379,
                "clp": 592.49747,
                "cny": 515.7577,
                "czk": 527.30864,
                "dkk": 483.18616,
                "dot": 337.69489,
                "eos": 683.89962,
                "eth": 179.24814,
                "eur": 482.36728,
                "gbp": 468.8572,
                "gel": 500.98489,
                "hkd": 492.57296,
                "huf": 506.90999,
                "idr": 512.50519,
                "ils": 479.22112,
                "inr": 496.37183,
                "jpy": 550.90454,
                "krw": 501.21893,
                "kwd": 495.43027,
                "lkr": 408.72679,
                "ltc": 580.20942,
                "mmk": 494.54769,
                "mxn": 453.61789,
                "myr": 529.29651,
                "ngn": 1942.04437,
                "nok": 510.75718,
                "nzd": 501.58329,
                "php": 503.45119,
                "pkr": 539.46368,
                "pln": 433.78253,
                "rub": 618.45011,
                "sar": 493.81543,
                "sek": 489.23754,
                "sgd": 492.60976,
                "thb": 503.32462,
                "try": 882.44258,
                "twd": 511.84954,
                "uah": 516.44124,
                "usd": 494.20686,
                "vef": 494.20686,
                "vnd": 516.25245,
                "xag": 440.03671,
                "xau": 425.32484,
                "xdr": 494.23051,
                "xlm": 315.26454,
                "xrp": 272.57681,
                "yfi": 508.68932,
                "zar": 520.84445,
                "bits": 120.45781,
                "link": 116.93984,
                "sats": 120.45781
            },
            "market_cap_change_24h_in_currency": {
                "aed": 35438720550,
                "ars": 8152780028299,
                "aud": 14615630013,
                "bch": 24013624,
                "bdt": 1062516933782,
                "bhd": 3633249011,
                "bmd": 9648702810,
                "bnb": 25190768,
                "brl": 49107816271,
                "btc": 115893,
                "cad": 13050373998,
                "chf": 8454557246,
                "clp": 8801598193147,
                "cny": 68905793258,
                "czk": 221255829831,
                "dkk": 65868041512,
                "dot": 864716957,
                "eos": 8570518758,
                "eth": 2207134,
                "eur": 8835046489,
                "gbp": 7578405430,
                "gel": 25665549474,
                "hkd": 75519884905,
                "huf": 3453466922236,
                "idr": 152276809335696,
                "ils": 33306153249,
                "inr": 799300209410,
                "jpy": 1399453161100,
                "krw": 12813600226551,
                "kwd": 2961969582,
                "lkr": 2974344229053,
                "ltc": 56492525,
                "mmk": 20326750644659,
                "mxn": 163832160026,
                "myr": 45045005828,
                "ngn": 15231109783186,
                "nok": 103301471319,
                "nzd": 15777972582,
                "php": 536560238123,
                "pkr": 2555933612307,
                "pln": 38244397916,
                "rub": 840319065524,
                "sar": 36147092257,
                "sek": 98815915600,
                "sgd": 12871154787,
                "thb": 338971111178,
                "try": 303608687206,
                "twd": 302982658627,
                "uah": 361659327114,
                "usd": 9648702810,
                "vef": 966124612,
                "vnd": 238901575746529,
                "xag": 397066900,
                "xau": 4551783,
                "xdr": 7298132097,
                "xlm": 68106226817,
                "xrp": 13347424715,
                "yfi": 897654,
                "zar": 187292976877,
                "bits": 115893482713,
                "link": 414402808,
                "sats": 11589348271278
            },
            "market_cap_change_percentage_24h_in_currency": {
                "aed": 19.64375,
                "ars": 19.71923,
                "aud": 19.32302,
                "bch": 14.66822,
                "bdt": 19.71212,
                "bhd": 19.62312,
                "bmd": 19.64375,
                "bnb": 21.15945,
                "brl": 20.14272,
                "btc": 14.20458,
                "cad": 19.57587,
                "chf": 19.54741,
                "clp": 18.26563,
                "cny": 19.48917,
                "czk": 19.21304,
                "dkk": 19.4735,
                "dot": 14.84271,
                "eos": 14.79155,
                "eth": 14.9985,
                "eur": 19.46944,
                "gbp": 19.50956,
                "gel": 19.64375,
                "hkd": 19.64188,
                "huf": 19.33525,
                "idr": 19.7312,
                "ils": 18.88982,
                "inr": 19.62764,
                "jpy": 18.89961,
                "krw": 19.51707,
                "kwd": 19.59709,
                "lkr": 19.52244,
                "ltc": 8.63875,
                "mmk": 19.70793,
                "mxn": 19.51624,
                "myr": 19.2298,
                "ngn": 19.61499,
                "nok": 19.86431,
                "nzd": 19.5665,
                "php": 19.42251,
                "pkr": 18.64491,
                "pln": 19.52065,
                "rub": 18.66485,
                "sar": 19.61992,
                "sek": 19.42399,
                "sgd": 19.46317,
                "thb": 19.17584,
                "try": 19.82448,
                "twd": 19.48052,
                "uah": 19.29987,
                "usd": 19.64375,
                "vef": 19.64375,
                "vnd": 19.74697,
                "xag": 18.09472,
                "xau": 18.84101,
                "xdr": 19.7222,
                "xlm": 17.04534,
                "xrp": 15.86964,
                "yfi": 15.91364,
                "zar": 19.86543,
                "bits": 14.20458,
                "link": 16.58839,
                "sats": 14.20458
            },
            "total_supply": 570709553.320213,
            "max_supply": null,
            "circulating_supply": 442552214.977831,
            "last_updated": "2024-02-29T14:43:55.107Z"
        },
        "community_data": {
            "facebook_likes": null,
            "twitter_followers": 2468793,
            "reddit_average_posts_48h": 0,
            "reddit_average_comments_48h": 0,
            "reddit_subscribers": 0,
            "reddit_accounts_active_48h": 0,
            "telegram_channel_user_count": 57579
        },
        "developer_data": {
            "forks": 3516,
            "stars": 11071,
            "subscribers": 276,
            "total_issues": 5177,
            "closed_issues": 4611,
            "pull_requests_merged": 23614,
            "pull_request_contributors": 411,
            "code_additions_deletions_4_weeks": {
                "additions": 10193,
                "deletions": -5277
            },
            "commit_count_4_weeks": 171,
            "last_4_weeks_commit_activity_series": []
        },
        "status_updates": [],
        "last_updated": "2024-02-29T14:43:55.107Z",
        "tickers": [
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 133.6,
                "volume": 16644402.65,
                "converted_last": {
                    "btc": 0.00210652,
                    "eth": 0.038229,
                    "usd": 133.71
                },
                "converted_volume": {
                    "btc": 31702,
                    "eth": 575333,
                    "usd": 2012245800
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017479,
                "timestamp": "2024-02-29T14:37:55+00:00",
                "last_traded_at": "2024-02-29T14:37:55+00:00",
                "last_fetch_at": "2024-02-29T14:38:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_USDT?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "TokoCrypto",
                    "identifier": "toko_crypto",
                    "has_trading_incentive": false
                },
                "last": 133.92,
                "volume": 18037.313425925928,
                "converted_last": {
                    "btc": 0.00211114,
                    "eth": 0.03830057,
                    "usd": 133.95
                },
                "converted_volume": {
                    "btc": 38.079259,
                    "eth": 690.839,
                    "usd": 2416128
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017479,
                "timestamp": "2024-02-29T14:36:36+00:00",
                "last_traded_at": "2024-02-29T14:36:36+00:00",
                "last_fetch_at": "2024-02-29T14:36:36+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tokocrypto.com/trade/SOLUSDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 132.9,
                "volume": 3211689.252,
                "converted_last": {
                    "btc": 0.00209373,
                    "eth": 0.0379953,
                    "usd": 132.9
                },
                "converted_volume": {
                    "btc": 6724,
                    "eth": 122029,
                    "usd": 426833502
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017524,
                "timestamp": "2024-02-29T14:39:49+00:00",
                "last_traded_at": "2024-02-29T14:39:49+00:00",
                "last_fetch_at": "2024-02-29T14:39:49+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/SOL-USD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 132.72,
                "volume": 1829244.78085627,
                "converted_last": {
                    "btc": 0.00209215,
                    "eth": 0.03799637,
                    "usd": 132.72
                },
                "converted_volume": {
                    "btc": 3827,
                    "eth": 69505,
                    "usd": 242777367
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017536,
                "timestamp": "2024-02-29T14:40:51+00:00",
                "last_traded_at": "2024-02-29T14:40:51+00:00",
                "last_fetch_at": "2024-02-29T14:40:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-USD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Toobit",
                    "identifier": "toobit",
                    "has_trading_incentive": false
                },
                "last": 134.11,
                "volume": 1897728.81,
                "converted_last": {
                    "btc": 0.00212013,
                    "eth": 0.03844915,
                    "usd": 134.14
                },
                "converted_volume": {
                    "btc": 3625,
                    "eth": 65742,
                    "usd": 229360090
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.014915,
                "timestamp": "2024-02-29T14:32:08+00:00",
                "last_traded_at": "2024-02-29T14:32:08+00:00",
                "last_fetch_at": "2024-02-29T14:32:08+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.toobit.com/en-US/spot/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "DigiFinex",
                    "identifier": "digifinex",
                    "has_trading_incentive": false
                },
                "last": 134.4512,
                "volume": 925158.94,
                "converted_last": {
                    "btc": 0.0021222,
                    "eth": 0.03849052,
                    "usd": 134.45
                },
                "converted_volume": {
                    "btc": 1963,
                    "eth": 35610,
                    "usd": 124391744
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01744,
                "timestamp": "2024-02-29T14:33:25+00:00",
                "last_traded_at": "2024-02-29T14:33:25+00:00",
                "last_fetch_at": "2024-02-29T14:33:25+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.digifinex.com/en-ww/trade/USDT/SOL",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "WEEX",
                    "identifier": "weex",
                    "has_trading_incentive": false
                },
                "last": 134,
                "volume": 87848.426382,
                "converted_last": {
                    "btc": 0.00211508,
                    "eth": 0.03837085,
                    "usd": 134.06
                },
                "converted_volume": {
                    "btc": 167.628,
                    "eth": 3041,
                    "usd": 10625138
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017473,
                "timestamp": "2024-02-29T14:35:02+00:00",
                "last_traded_at": "2024-02-29T14:35:02+00:00",
                "last_fetch_at": "2024-02-29T14:35:02+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.weex.com/trade/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bybit",
                    "identifier": "bybit_spot",
                    "has_trading_incentive": false
                },
                "last": 132.87,
                "volume": 4741197.192,
                "converted_last": {
                    "btc": 0.00209501,
                    "eth": 0.03804839,
                    "usd": 132.9
                },
                "converted_volume": {
                    "btc": 8985,
                    "eth": 163188,
                    "usd": 570011688
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01752,
                "timestamp": "2024-02-29T14:40:15+00:00",
                "last_traded_at": "2024-02-29T14:40:15+00:00",
                "last_fetch_at": "2024-02-29T14:40:15+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bybit.com/trade/spot/SOL/USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "BingX",
                    "identifier": "bingx",
                    "has_trading_incentive": false
                },
                "last": 132.62,
                "volume": 885488.300906,
                "converted_last": {
                    "btc": 0.00210482,
                    "eth": 0.03823609,
                    "usd": 132.92
                },
                "converted_volume": {
                    "btc": 1696,
                    "eth": 30812,
                    "usd": 107111778
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.022551,
                "timestamp": "2024-02-29T14:42:28+00:00",
                "last_traded_at": "2024-02-29T14:42:28+00:00",
                "last_fetch_at": "2024-02-29T14:42:28+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://bingx.com/en-us/spot/SOLUSDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "FDUSD",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 134.43,
                "volume": 5127816.12,
                "converted_last": {
                    "btc": 0.00212674,
                    "eth": 0.03856719,
                    "usd": 134.08
                },
                "converted_volume": {
                    "btc": 9798,
                    "eth": 177686,
                    "usd": 617710386
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017437,
                "timestamp": "2024-02-29T14:24:15+00:00",
                "last_traded_at": "2024-02-29T14:24:15+00:00",
                "last_fetch_at": "2024-02-29T14:24:15+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_FDUSD?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "first-digital-usd"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "OKX",
                    "identifier": "okex",
                    "has_trading_incentive": false
                },
                "last": 132.87,
                "volume": 3457091.39461,
                "converted_last": {
                    "btc": 0.00209501,
                    "eth": 0.03801855,
                    "usd": 132.98
                },
                "converted_volume": {
                    "btc": 6590,
                    "eth": 119594,
                    "usd": 418314441
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017527,
                "timestamp": "2024-02-29T14:39:56+00:00",
                "last_traded_at": "2024-02-29T14:39:56+00:00",
                "last_fetch_at": "2024-02-29T14:39:56+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.okx.com/trade-spot/sol-usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Tapbit",
                    "identifier": "tapbit",
                    "has_trading_incentive": false
                },
                "last": 134.08,
                "volume": 121121.19,
                "converted_last": {
                    "btc": 0.00211634,
                    "eth": 0.03839376,
                    "usd": 134.14
                },
                "converted_volume": {
                    "btc": 231.435,
                    "eth": 4199,
                    "usd": 14669524
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.052293,
                "timestamp": "2024-02-29T14:35:01+00:00",
                "last_traded_at": "2024-02-29T14:35:01+00:00",
                "last_fetch_at": "2024-02-29T14:35:01+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.tapbit.com/spot/exchange/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Hotcoin Global",
                    "identifier": "hotcoin_global",
                    "has_trading_incentive": false
                },
                "last": 134.6,
                "volume": 186828.87,
                "converted_last": {
                    "btc": 0.00212455,
                    "eth": 0.03854276,
                    "usd": 134.64
                },
                "converted_volume": {
                    "btc": 396.927,
                    "eth": 7201,
                    "usd": 25155098
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.014914,
                "timestamp": "2024-02-29T14:34:30+00:00",
                "last_traded_at": "2024-02-29T14:34:30+00:00",
                "last_fetch_at": "2024-02-29T14:34:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.hotcoin.com/currencyExchange/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Biconomy",
                    "identifier": "biconomy",
                    "has_trading_incentive": false
                },
                "last": 132.93,
                "volume": 392890.19610446,
                "converted_last": {
                    "btc": 0.00209596,
                    "eth": 0.03803572,
                    "usd": 133.04
                },
                "converted_volume": {
                    "btc": 748.2,
                    "eth": 13578,
                    "usd": 47492118
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.022594,
                "timestamp": "2024-02-29T14:39:53+00:00",
                "last_traded_at": "2024-02-29T14:39:53+00:00",
                "last_fetch_at": "2024-02-29T14:39:53+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.biconomy.com/exchange?coin=SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "PointPay",
                    "identifier": "pointpay",
                    "has_trading_incentive": false
                },
                "last": 132.5353012,
                "volume": 241137.2626517,
                "converted_last": {
                    "btc": 0.00210348,
                    "eth": 0.03821167,
                    "usd": 132.84
                },
                "converted_volume": {
                    "btc": 462.733,
                    "eth": 8406,
                    "usd": 29222000
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015526,
                "timestamp": "2024-02-29T14:42:45+00:00",
                "last_traded_at": "2024-02-29T14:42:45+00:00",
                "last_fetch_at": "2024-02-29T14:42:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.pointpay.io/trade-classic/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Deepcoin",
                    "identifier": "deepcoin",
                    "has_trading_incentive": false
                },
                "last": 133.04,
                "volume": 28355.77029834,
                "converted_last": {
                    "btc": 0.00211149,
                    "eth": 0.03835718,
                    "usd": 133.34
                },
                "converted_volume": {
                    "btc": 54.434,
                    "eth": 988.839,
                    "usd": 3437529
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01752,
                "timestamp": "2024-02-29T14:42:38+00:00",
                "last_traded_at": "2024-02-29T14:42:38+00:00",
                "last_fetch_at": "2024-02-29T14:42:38+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.deepcoin.com/en/Spot?currentId=SOL",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "Backpack Exchange ",
                    "identifier": "backpack_exchange",
                    "has_trading_incentive": false
                },
                "last": 134.24,
                "volume": 2717128.64,
                "converted_last": {
                    "btc": 0.00212038,
                    "eth": 0.03845367,
                    "usd": 134.16
                },
                "converted_volume": {
                    "btc": 5233,
                    "eth": 94901,
                    "usd": 331090004
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017446,
                "timestamp": "2024-02-29T14:32:48+00:00",
                "last_traded_at": "2024-02-29T14:32:48+00:00",
                "last_fetch_at": "2024-02-29T14:32:48+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://backpack.exchange/trade/SOL_USDC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "C-Patex",
                    "identifier": "c_patex",
                    "has_trading_incentive": false
                },
                "last": 134.223421,
                "volume": 188089.64451853,
                "converted_last": {
                    "btc": 0.00211861,
                    "eth": 0.03842149,
                    "usd": 134.04
                },
                "converted_volume": {
                    "btc": 398.488,
                    "eth": 7227,
                    "usd": 25212396
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.019998,
                "timestamp": "2024-02-29T14:32:54+00:00",
                "last_traded_at": "2024-02-29T14:32:54+00:00",
                "last_fetch_at": "2024-02-29T14:32:54+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://c-patex.com/exchange/SOL/USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "MEXC",
                    "identifier": "mxc",
                    "has_trading_incentive": false
                },
                "last": 133.65,
                "volume": 417503.46,
                "converted_last": {
                    "btc": 0.00210688,
                    "eth": 0.03823066,
                    "usd": 133.68
                },
                "converted_volume": {
                    "btc": 879.63,
                    "eth": 15961,
                    "usd": 55813691
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017491,
                "timestamp": "2024-02-29T14:37:57+00:00",
                "last_traded_at": "2024-02-29T14:37:57+00:00",
                "last_fetch_at": "2024-02-29T14:37:57+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.mexc.com/exchange/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "KuCoin",
                    "identifier": "kucoin",
                    "has_trading_incentive": false
                },
                "last": 132.981,
                "volume": 1739595.75125525,
                "converted_last": {
                    "btc": 0.00211055,
                    "eth": 0.03834017,
                    "usd": 133.28
                },
                "converted_volume": {
                    "btc": 3672,
                    "eth": 66696,
                    "usd": 231858534
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01451,
                "timestamp": "2024-02-29T14:42:17+00:00",
                "last_traded_at": "2024-02-29T14:42:17+00:00",
                "last_fetch_at": "2024-02-29T14:42:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.kucoin.com/trade/SOL-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Nominex",
                    "identifier": "nominex",
                    "has_trading_incentive": false
                },
                "last": 132.84,
                "volume": 1551.799814814815,
                "converted_last": {
                    "btc": 0.00209454,
                    "eth": 0.03800997,
                    "usd": 132.95
                },
                "converted_volume": {
                    "btc": 3.250307,
                    "eth": 58.984,
                    "usd": 206314
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017531,
                "timestamp": "2024-02-29T14:39:41+00:00",
                "last_traded_at": "2024-02-29T14:39:41+00:00",
                "last_fetch_at": "2024-02-29T14:39:41+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://nominex.io/en/markets/SOL/USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "LBank",
                    "identifier": "lbank",
                    "has_trading_incentive": false
                },
                "last": 134.23,
                "volume": 155679.4512,
                "converted_last": {
                    "btc": 0.00211871,
                    "eth": 0.03842338,
                    "usd": 134.05
                },
                "converted_volume": {
                    "btc": 329.84,
                    "eth": 5982,
                    "usd": 20869008
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017447,
                "timestamp": "2024-02-29T14:32:51+00:00",
                "last_traded_at": "2024-02-29T14:32:51+00:00",
                "last_fetch_at": "2024-02-29T14:32:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.lbank.com/trade/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "XT.COM",
                    "identifier": "xt",
                    "has_trading_incentive": false
                },
                "last": 0.002104,
                "volume": 32969.5,
                "converted_last": {
                    "btc": 0.002104,
                    "eth": 0.03817837,
                    "usd": 133.5
                },
                "converted_volume": {
                    "btc": 65.094,
                    "eth": 1181,
                    "usd": 4130296
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.033253,
                "timestamp": "2024-02-29T14:37:06+00:00",
                "last_traded_at": "2024-02-29T14:37:06+00:00",
                "last_fetch_at": "2024-02-29T14:37:06+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.xt.com/en/trade/sol_btc",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "WOO X",
                    "identifier": "wootrade",
                    "has_trading_incentive": false
                },
                "last": 132.87,
                "volume": 144005.24,
                "converted_last": {
                    "btc": 0.00209501,
                    "eth": 0.03801855,
                    "usd": 132.98
                },
                "converted_volume": {
                    "btc": 301.693,
                    "eth": 5475,
                    "usd": 19150009
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.052703,
                "timestamp": "2024-02-29T14:39:59+00:00",
                "last_traded_at": "2024-02-29T14:39:59+00:00",
                "last_fetch_at": "2024-02-29T14:39:59+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://x.woo.network/spot",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "HitBTC",
                    "identifier": "hitbtc",
                    "has_trading_incentive": false
                },
                "last": 132.3855,
                "volume": 152138.041,
                "converted_last": {
                    "btc": 0.0021011,
                    "eth": 0.03817639,
                    "usd": 132.97
                },
                "converted_volume": {
                    "btc": 292.523,
                    "eth": 5315,
                    "usd": 18512365
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.027607,
                "timestamp": "2024-02-29T14:41:15+00:00",
                "last_traded_at": "2024-02-29T14:41:15+00:00",
                "last_fetch_at": "2024-02-29T14:41:15+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://hitbtc.com/SOL-to-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "FMFW.io",
                    "identifier": "bitcoin_com",
                    "has_trading_incentive": false
                },
                "last": 132.8566,
                "volume": 152081.12,
                "converted_last": {
                    "btc": 0.0020948,
                    "eth": 0.03801471,
                    "usd": 132.97
                },
                "converted_volume": {
                    "btc": 318.58,
                    "eth": 5781,
                    "usd": 20221911
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.027646,
                "timestamp": "2024-02-29T14:39:06+00:00",
                "last_traded_at": "2024-02-29T14:39:06+00:00",
                "last_fetch_at": "2024-02-29T14:39:06+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://fmfw.io/SOL-to-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Pionex",
                    "identifier": "pionex",
                    "has_trading_incentive": false
                },
                "last": 132.878,
                "volume": 327078.05,
                "converted_last": {
                    "btc": 0.00210891,
                    "eth": 0.03830168,
                    "usd": 133.01
                },
                "converted_volume": {
                    "btc": 628.79,
                    "eth": 11420,
                    "usd": 39657561
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.012635,
                "timestamp": "2024-02-29T14:43:09+00:00",
                "last_traded_at": "2024-02-29T14:43:09+00:00",
                "last_fetch_at": "2024-02-29T14:43:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.pionex.com/en/trade/SOL_USDT/Bot",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bitcointry Exchange",
                    "identifier": "bitcointry_exchange",
                    "has_trading_incentive": false
                },
                "last": 134.17,
                "volume": 5598.38,
                "converted_last": {
                    "btc": 0.00211776,
                    "eth": 0.0384062,
                    "usd": 133.99
                },
                "converted_volume": {
                    "btc": 10.673589,
                    "eth": 193.568,
                    "usd": 675320
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017459,
                "timestamp": "2024-02-29T14:32:29+00:00",
                "last_traded_at": "2024-02-29T14:32:29+00:00",
                "last_fetch_at": "2024-02-29T14:32:29+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://bitcointry.com/en/exchange/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Gate.io",
                    "identifier": "gate",
                    "has_trading_incentive": false
                },
                "last": 132.64,
                "volume": 710094.56064568,
                "converted_last": {
                    "btc": 0.00210514,
                    "eth": 0.03824978,
                    "usd": 133.22
                },
                "converted_volume": {
                    "btc": 1362,
                    "eth": 24750,
                    "usd": 86204186
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015064,
                "timestamp": "2024-02-29T14:41:49+00:00",
                "last_traded_at": "2024-02-29T14:41:49+00:00",
                "last_fetch_at": "2024-02-29T14:41:49+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://gate.io/trade/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 122.54,
                "volume": 380199.05600732,
                "converted_last": {
                    "btc": 0.00209454,
                    "eth": 0.03803985,
                    "usd": 132.87
                },
                "converted_volume": {
                    "btc": 796.343,
                    "eth": 14463,
                    "usd": 50517752
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01817,
                "timestamp": "2024-02-29T14:40:51+00:00",
                "last_traded_at": "2024-02-29T14:40:51+00:00",
                "last_fetch_at": "2024-02-29T14:40:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-EUR",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "XT.COM",
                    "identifier": "xt",
                    "has_trading_incentive": false
                },
                "last": 133.66,
                "volume": 46499.667,
                "converted_last": {
                    "btc": 0.00210704,
                    "eth": 0.03823352,
                    "usd": 133.69
                },
                "converted_volume": {
                    "btc": 88.973,
                    "eth": 1614,
                    "usd": 5645424
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017479,
                "timestamp": "2024-02-29T14:37:07+00:00",
                "last_traded_at": "2024-02-29T14:37:07+00:00",
                "last_fetch_at": "2024-02-29T14:37:07+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.xt.com/en/trade/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "PointPay",
                    "identifier": "pointpay",
                    "has_trading_incentive": false
                },
                "last": 0.00210728,
                "volume": 34756.6116649,
                "converted_last": {
                    "btc": 0.00210728,
                    "eth": 0.03828077,
                    "usd": 133.08
                },
                "converted_volume": {
                    "btc": 68.653,
                    "eth": 1247,
                    "usd": 4335521
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015187,
                "timestamp": "2024-02-29T14:42:45+00:00",
                "last_traded_at": "2024-02-29T14:42:45+00:00",
                "last_fetch_at": "2024-02-29T14:42:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.pointpay.io/trade-classic/SOL_BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "CoinCatch",
                    "identifier": "coincatch",
                    "has_trading_incentive": false
                },
                "last": 134.16,
                "volume": 18496.8529,
                "converted_last": {
                    "btc": 0.0021176,
                    "eth": 0.03840334,
                    "usd": 133.98
                },
                "converted_volume": {
                    "btc": 35.185123,
                    "eth": 638.092,
                    "usd": 2226169
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017463,
                "timestamp": "2024-02-29T14:32:20+00:00",
                "last_traded_at": "2024-02-29T14:32:20+00:00",
                "last_fetch_at": "2024-02-29T14:32:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coincatch.com/en/spot/SOLUSDT_SPBL",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "FMFW.io",
                    "identifier": "bitcoin_com",
                    "has_trading_incentive": false
                },
                "last": 0.00210552,
                "volume": 18150.857,
                "converted_last": {
                    "btc": 0.00210552,
                    "eth": 0.03821079,
                    "usd": 133.64
                },
                "converted_volume": {
                    "btc": 38.216992,
                    "eth": 693.559,
                    "usd": 2425744
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.036578,
                "timestamp": "2024-02-29T14:38:05+00:00",
                "last_traded_at": "2024-02-29T14:38:05+00:00",
                "last_fetch_at": "2024-02-29T14:38:05+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://fmfw.io/SOL-to-BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "HitBTC",
                    "identifier": "hitbtc",
                    "has_trading_incentive": false
                },
                "last": 0.00210501,
                "volume": 18134.882,
                "converted_last": {
                    "btc": 0.00210501,
                    "eth": 0.03823954,
                    "usd": 132.93
                },
                "converted_volume": {
                    "btc": 35.112764,
                    "eth": 637.857,
                    "usd": 2217401
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.034579,
                "timestamp": "2024-02-29T14:42:21+00:00",
                "last_traded_at": "2024-02-29T14:42:21+00:00",
                "last_fetch_at": "2024-02-29T14:42:21+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://hitbtc.com/SOL-to-BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "WhiteBIT",
                    "identifier": "whitebit",
                    "has_trading_incentive": false
                },
                "last": 134.4061,
                "volume": 166625.1595,
                "converted_last": {
                    "btc": 0.00212149,
                    "eth": 0.03847761,
                    "usd": 134.41
                },
                "converted_volume": {
                    "btc": 353.493,
                    "eth": 6411,
                    "usd": 22395981
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.083543,
                "timestamp": "2024-02-29T14:33:29+00:00",
                "last_traded_at": "2024-02-29T14:33:29+00:00",
                "last_fetch_at": "2024-02-29T14:33:29+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://whitebit.com/trade/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Gemini",
                    "identifier": "gemini",
                    "has_trading_incentive": false
                },
                "last": 132.895,
                "volume": 102041.935415,
                "converted_last": {
                    "btc": 0.00209491,
                    "eth": 0.03804647,
                    "usd": 132.9
                },
                "converted_volume": {
                    "btc": 213.768,
                    "eth": 3882,
                    "usd": 13560863
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.010754,
                "timestamp": "2024-02-29T14:40:39+00:00",
                "last_traded_at": "2024-02-29T14:40:39+00:00",
                "last_fetch_at": "2024-02-29T14:40:39+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.gemini.com/trade/SOLUSD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.0021016,
                "volume": 850533.52,
                "converted_last": {
                    "btc": 0.0021016,
                    "eth": 0.03817759,
                    "usd": 132.72
                },
                "converted_volume": {
                    "btc": 1679,
                    "eth": 30496,
                    "usd": 106012723
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.047538,
                "timestamp": "2024-02-29T14:41:07+00:00",
                "last_traded_at": "2024-02-29T14:41:07+00:00",
                "last_fetch_at": "2024-02-29T14:42:42+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_BTC?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 133.16,
                "volume": 141824.30497457,
                "converted_last": {
                    "btc": 0.00209959,
                    "eth": 0.0381031,
                    "usd": 133.27
                },
                "converted_volume": {
                    "btc": 297.772,
                    "eth": 5404,
                    "usd": 18900478
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.030064,
                "timestamp": "2024-02-29T14:38:17+00:00",
                "last_traded_at": "2024-02-29T14:38:17+00:00",
                "last_fetch_at": "2024-02-29T14:38:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "Bybit",
                    "identifier": "bybit_spot",
                    "has_trading_incentive": false
                },
                "last": 132.99,
                "volume": 432848.773,
                "converted_last": {
                    "btc": 0.00209518,
                    "eth": 0.0380515,
                    "usd": 132.91
                },
                "converted_volume": {
                    "btc": 825.162,
                    "eth": 14986,
                    "usd": 52345965
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.022546,
                "timestamp": "2024-02-29T14:40:15+00:00",
                "last_traded_at": "2024-02-29T14:40:15+00:00",
                "last_fetch_at": "2024-02-29T14:40:15+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bybit.com/trade/spot/SOL/USDC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Bit2Me",
                    "identifier": "bit2me",
                    "has_trading_incentive": false
                },
                "last": 123.82,
                "volume": 370030.6012054008,
                "converted_last": {
                    "btc": 0.002122,
                    "eth": 0.03848301,
                    "usd": 134.26
                },
                "converted_volume": {
                    "btc": 717.287,
                    "eth": 13008,
                    "usd": 45382860
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.056557,
                "timestamp": "2024-02-29T14:32:09+00:00",
                "last_traded_at": "2024-02-29T14:32:09+00:00",
                "last_fetch_at": "2024-02-29T14:32:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.bit2me.com/exchange/SOL-EUR",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "FameEX",
                    "identifier": "fameex",
                    "has_trading_incentive": false
                },
                "last": 132.56,
                "volume": 503740.83846,
                "converted_last": {
                    "btc": 0.00210387,
                    "eth": 0.03821879,
                    "usd": 132.86
                },
                "converted_volume": {
                    "btc": 966.366,
                    "eth": 17555,
                    "usd": 61026828
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015041,
                "timestamp": "2024-02-29T14:42:44+00:00",
                "last_traded_at": "2024-02-29T14:42:44+00:00",
                "last_fetch_at": "2024-02-29T14:42:44+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.fameex.com/en-US/trade/sol-usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "BTSE",
                    "identifier": "btse",
                    "has_trading_incentive": false
                },
                "last": 134.49,
                "volume": 140476.52208755136,
                "converted_last": {
                    "btc": 0.00212276,
                    "eth": 0.0385007,
                    "usd": 134.49
                },
                "converted_volume": {
                    "btc": 298.198,
                    "eth": 5408,
                    "usd": 18892687
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.042372,
                "timestamp": "2024-02-29T14:33:34+00:00",
                "last_traded_at": "2024-02-29T14:33:34+00:00",
                "last_fetch_at": "2024-02-29T14:33:34+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.btse.com/en/trading/SOL-USD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bitget",
                    "identifier": "bitget",
                    "has_trading_incentive": false
                },
                "last": 132.913,
                "volume": 275904.4569,
                "converted_last": {
                    "btc": 0.00209569,
                    "eth": 0.03803085,
                    "usd": 133.02
                },
                "converted_volume": {
                    "btc": 525.892,
                    "eth": 9543,
                    "usd": 33381106
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.035282,
                "timestamp": "2024-02-29T14:39:12+00:00",
                "last_traded_at": "2024-02-29T14:39:12+00:00",
                "last_fetch_at": "2024-02-29T14:39:12+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitget.com/spot/SOLUSDT?type=spot",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bit2Me",
                    "identifier": "bit2me",
                    "has_trading_incentive": false
                },
                "last": 134.16,
                "volume": 139861.961686349,
                "converted_last": {
                    "btc": 0.00212092,
                    "eth": 0.03846349,
                    "usd": 134.19
                },
                "converted_volume": {
                    "btc": 271.021,
                    "eth": 4915,
                    "usd": 17147551
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.029826,
                "timestamp": "2024-02-29T14:32:09+00:00",
                "last_traded_at": "2024-02-29T14:32:09+00:00",
                "last_fetch_at": "2024-02-29T14:32:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.bit2me.com/exchange/SOL-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "BTSE",
                    "identifier": "btse",
                    "has_trading_incentive": false
                },
                "last": 134.4343441815,
                "volume": 106538.52326495718,
                "converted_last": {
                    "btc": 0.00212194,
                    "eth": 0.0384857,
                    "usd": 134.44
                },
                "converted_volume": {
                    "btc": 226.068,
                    "eth": 4100,
                    "usd": 14322784
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.043157,
                "timestamp": "2024-02-29T14:33:36+00:00",
                "last_traded_at": "2024-02-29T14:33:36+00:00",
                "last_fetch_at": "2024-02-29T14:33:36+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.btse.com/en/trading/SOL-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bitunix",
                    "identifier": "bitunix",
                    "has_trading_incentive": false
                },
                "last": 134.09,
                "volume": 419216.32,
                "converted_last": {
                    "btc": 0.0021165,
                    "eth": 0.0383833,
                    "usd": 133.91
                },
                "converted_volume": {
                    "btc": 887.271,
                    "eth": 16091,
                    "usd": 56137814
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.119305,
                "timestamp": "2024-02-29T14:32:17+00:00",
                "last_traded_at": "2024-02-29T14:32:17+00:00",
                "last_fetch_at": "2024-02-29T14:32:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitunix.com/spot-trade?symbol=SOLUSDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Crypto.com Exchange",
                    "identifier": "crypto_com",
                    "has_trading_incentive": false
                },
                "last": 132.929,
                "volume": 235663.03,
                "converted_last": {
                    "btc": 0.00210047,
                    "eth": 0.03816506,
                    "usd": 132.93
                },
                "converted_volume": {
                    "btc": 495.004,
                    "eth": 8994,
                    "usd": 31326451
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.063144,
                "timestamp": "2024-02-29T14:41:23+00:00",
                "last_traded_at": "2024-02-29T14:41:23+00:00",
                "last_fetch_at": "2024-02-29T14:41:23+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://crypto.com/exchange/trade/spot/SOL_USD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Delta Exchange",
                    "identifier": "delta_spot",
                    "has_trading_incentive": false
                },
                "last": 133.02,
                "volume": 1344.1000000000004,
                "converted_last": {
                    "btc": 0.00209738,
                    "eth": 0.03806147,
                    "usd": 133.13
                },
                "converted_volume": {
                    "btc": 2.819086,
                    "eth": 51.158,
                    "usd": 178942
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.03012,
                "timestamp": "2024-02-29T14:39:53+00:00",
                "last_traded_at": "2024-02-29T14:39:53+00:00",
                "last_fetch_at": "2024-02-29T14:39:53+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.delta.exchange/app/spot/trade/SOL/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "XBT",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 0.0021027,
                "volume": 100162.12920785,
                "converted_last": {
                    "btc": 0.0021027,
                    "eth": 0.038188,
                    "usd": 133.39
                },
                "converted_volume": {
                    "btc": 210.611,
                    "eth": 3825,
                    "usd": 13360561
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.05711,
                "timestamp": "2024-02-29T14:40:51+00:00",
                "last_traded_at": "2024-02-29T14:40:51+00:00",
                "last_fetch_at": "2024-02-29T14:40:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-XBT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Crypto.com Exchange",
                    "identifier": "crypto_com",
                    "has_trading_incentive": false
                },
                "last": 133.509,
                "volume": 108065.53,
                "converted_last": {
                    "btc": 0.00210466,
                    "eth": 0.03819033,
                    "usd": 133.54
                },
                "converted_volume": {
                    "btc": 227.441,
                    "eth": 4127,
                    "usd": 14431432
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.068894,
                "timestamp": "2024-02-29T14:38:00+00:00",
                "last_traded_at": "2024-02-29T14:38:00+00:00",
                "last_fetch_at": "2024-02-29T14:38:00+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://crypto.com/exchange/trade/spot/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Icrypex",
                    "identifier": "icrypex",
                    "has_trading_incentive": false
                },
                "last": 134.3,
                "volume": 27384.98106,
                "converted_last": {
                    "btc": 0.00211981,
                    "eth": 0.03844341,
                    "usd": 134.12
                },
                "converted_volume": {
                    "btc": 58.051,
                    "eth": 1053,
                    "usd": 3672902
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.297929,
                "timestamp": "2024-02-29T14:32:31+00:00",
                "last_traded_at": "2024-02-29T14:32:31+00:00",
                "last_fetch_at": "2024-02-29T14:32:31+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.icrypex.com/en/trade/spot/SOLUSDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "WhiteBIT",
                    "identifier": "whitebit",
                    "has_trading_incentive": false
                },
                "last": 0.0021204,
                "volume": 20345.75,
                "converted_last": {
                    "btc": 0.0021204,
                    "eth": 0.03845786,
                    "usd": 134.34
                },
                "converted_volume": {
                    "btc": 43.141128,
                    "eth": 782.454,
                    "usd": 2733255
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.09711,
                "timestamp": "2024-02-29T14:33:30+00:00",
                "last_traded_at": "2024-02-29T14:33:30+00:00",
                "last_fetch_at": "2024-02-29T14:33:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://whitebit.com/trade/SOL_BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "BitMart",
                    "identifier": "bitmart",
                    "has_trading_incentive": false
                },
                "last": 133.8815,
                "volume": 193896.12,
                "converted_last": {
                    "btc": 0.00212484,
                    "eth": 0.0386078,
                    "usd": 134.47
                },
                "converted_volume": {
                    "btc": 411.999,
                    "eth": 7486,
                    "usd": 26073414
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.094793,
                "timestamp": "2024-02-29T14:41:29+00:00",
                "last_traded_at": "2024-02-29T14:41:29+00:00",
                "last_fetch_at": "2024-02-29T14:41:29+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitmart.com/trade/en?symbol=SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Coinmetro",
                    "identifier": "coin_metro",
                    "has_trading_incentive": false
                },
                "last": 123.7318632895631,
                "volume": 3950.2473480026706,
                "converted_last": {
                    "btc": 0.00211664,
                    "eth": 0.0383992,
                    "usd": 134.16
                },
                "converted_volume": {
                    "btc": 8.361259,
                    "eth": 151.686,
                    "usd": 529979
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.243821,
                "timestamp": "2024-02-29T14:35:33+00:00",
                "last_traded_at": "2024-02-29T14:35:33+00:00",
                "last_fetch_at": "2024-02-29T14:35:33+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://go.coinmetro.com/exchange/sol-eur",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "HTX",
                    "identifier": "huobi",
                    "has_trading_incentive": false
                },
                "last": 133.3671,
                "volume": 504296.7274885356,
                "converted_last": {
                    "btc": 0.00210285,
                    "eth": 0.03816236,
                    "usd": 133.47
                },
                "converted_volume": {
                    "btc": 962.694,
                    "eth": 17471,
                    "usd": 61104980
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.075383,
                "timestamp": "2024-02-29T14:38:55+00:00",
                "last_traded_at": "2024-02-29T14:38:55+00:00",
                "last_fetch_at": "2024-02-29T14:38:55+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.huobi.com/en-us/exchange/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bitfinex",
                    "identifier": "bitfinex",
                    "has_trading_incentive": false
                },
                "last": 132.84,
                "volume": 37233.98232119,
                "converted_last": {
                    "btc": 0.00210831,
                    "eth": 0.03829073,
                    "usd": 132.97
                },
                "converted_volume": {
                    "btc": 78.501,
                    "eth": 1426,
                    "usd": 4951020
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.075245,
                "timestamp": "2024-02-29T14:43:09+00:00",
                "last_traded_at": "2024-02-29T14:43:09+00:00",
                "last_fetch_at": "2024-02-29T14:43:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trading.bitfinex.com/t/SOL:UST?type=exchange",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "KuCoin",
                    "identifier": "kucoin",
                    "has_trading_incentive": false
                },
                "last": 132.89,
                "volume": 47887.9467,
                "converted_last": {
                    "btc": 0.00210498,
                    "eth": 0.03823893,
                    "usd": 132.93
                },
                "converted_volume": {
                    "btc": 100.803,
                    "eth": 1831,
                    "usd": 6365796
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.015042,
                "timestamp": "2024-02-29T14:42:52+00:00",
                "last_traded_at": "2024-02-29T14:42:52+00:00",
                "last_fetch_at": "2024-02-29T14:42:52+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.kucoin.com/trade/SOL-USDC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Phemex",
                    "identifier": "phemex",
                    "has_trading_incentive": false
                },
                "last": 133.67,
                "volume": 105284.2,
                "converted_last": {
                    "btc": 0.00210763,
                    "eth": 0.03824903,
                    "usd": 133.78
                },
                "converted_volume": {
                    "btc": 221.9,
                    "eth": 4027,
                    "usd": 14084632
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.075058,
                "timestamp": "2024-02-29T14:38:12+00:00",
                "last_traded_at": "2024-02-29T14:38:12+00:00",
                "last_fetch_at": "2024-02-29T14:38:12+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://phemex.com/spot/trade/SOLUSDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Bitfinex",
                    "identifier": "bitfinex",
                    "has_trading_incentive": false
                },
                "last": 132.37,
                "volume": 99424.53374192,
                "converted_last": {
                    "btc": 0.00209164,
                    "eth": 0.03800457,
                    "usd": 132.37
                },
                "converted_volume": {
                    "btc": 207.961,
                    "eth": 3779,
                    "usd": 13160826
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.151057,
                "timestamp": "2024-02-29T14:41:50+00:00",
                "last_traded_at": "2024-02-29T14:41:50+00:00",
                "last_fetch_at": "2024-02-29T14:41:50+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trading.bitfinex.com/t/SOL:USD?type=exchange",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "QMall",
                    "identifier": "qmall",
                    "has_trading_incentive": false
                },
                "last": 134.08,
                "volume": 307095.03678128,
                "converted_last": {
                    "btc": 0.00211966,
                    "eth": 0.03844055,
                    "usd": 134.11
                },
                "converted_volume": {
                    "btc": 585.832,
                    "eth": 10624,
                    "usd": 37065726
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.107396,
                "timestamp": "2024-02-29T14:32:03+00:00",
                "last_traded_at": "2024-02-29T14:32:03+00:00",
                "last_fetch_at": "2024-02-29T14:32:03+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://qmall.io/trade/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "WhiteBIT",
                    "identifier": "whitebit",
                    "has_trading_incentive": false
                },
                "last": 134.91,
                "volume": 4984.2,
                "converted_last": {
                    "btc": 0.00212939,
                    "eth": 0.03862093,
                    "usd": 134.91
                },
                "converted_volume": {
                    "btc": 10.613312,
                    "eth": 192.494,
                    "usd": 672418
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.1329,
                "timestamp": "2024-02-29T14:33:30+00:00",
                "last_traded_at": "2024-02-29T14:33:30+00:00",
                "last_fetch_at": "2024-02-29T14:33:30+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://whitebit.com/trade/SOL_USD",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 122.5,
                "volume": 170207.082,
                "converted_last": {
                    "btc": 0.0020926,
                    "eth": 0.03797485,
                    "usd": 132.83
                },
                "converted_volume": {
                    "btc": 356.176,
                    "eth": 6464,
                    "usd": 22608347
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.065295,
                "timestamp": "2024-02-29T14:39:48+00:00",
                "last_traded_at": "2024-02-29T14:39:48+00:00",
                "last_fetch_at": "2024-02-29T14:39:48+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/SOL-EUR",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Bitvavo",
                    "identifier": "bitvavo",
                    "has_trading_incentive": false
                },
                "last": 122.55,
                "volume": 613955.86823556,
                "converted_last": {
                    "btc": 0.0020991,
                    "eth": 0.0381401,
                    "usd": 132.84
                },
                "converted_volume": {
                    "btc": 1289,
                    "eth": 23416,
                    "usd": 81559170
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.081826,
                "timestamp": "2024-02-29T14:41:08+00:00",
                "last_traded_at": "2024-02-29T14:41:08+00:00",
                "last_fetch_at": "2024-02-29T14:41:08+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://account.bitvavo.com/markets/SOL-EUR",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "ETH",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.03853,
                "volume": 330293.719,
                "converted_last": {
                    "btc": 0.00212609,
                    "eth": 0.03855175,
                    "usd": 134
                },
                "converted_volume": {
                    "btc": 656.376,
                    "eth": 11902,
                    "usd": 41368043
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.051867,
                "timestamp": "2024-02-29T14:26:20+00:00",
                "last_traded_at": "2024-02-29T14:26:20+00:00",
                "last_fetch_at": "2024-02-29T14:26:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_ETH?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "ethereum"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "OKX",
                    "identifier": "okex",
                    "has_trading_incentive": false
                },
                "last": 0.002106,
                "volume": 161406.2146,
                "converted_last": {
                    "btc": 0.002106,
                    "eth": 0.03821793,
                    "usd": 133.68
                },
                "converted_volume": {
                    "btc": 317.513,
                    "eth": 5762,
                    "usd": 20154166
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.0428,
                "timestamp": "2024-02-29T14:39:56+00:00",
                "last_traded_at": "2024-02-29T14:39:56+00:00",
                "last_fetch_at": "2024-02-29T14:39:56+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.okx.com/trade-spot/sol-btc",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Bitfinex",
                    "identifier": "bitfinex",
                    "has_trading_incentive": false
                },
                "last": 0.0021067,
                "volume": 7646.05595556,
                "converted_last": {
                    "btc": 0.0021067,
                    "eth": 0.03827817,
                    "usd": 133.32
                },
                "converted_volume": {
                    "btc": 16.107946,
                    "eth": 292.677,
                    "usd": 1019395
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.094967,
                "timestamp": "2024-02-29T14:39:43+00:00",
                "last_traded_at": "2024-02-29T14:39:43+00:00",
                "last_fetch_at": "2024-02-29T14:41:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://trading.bitfinex.com/t/SOL:BTC?type=exchange",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "OKX",
                    "identifier": "okex",
                    "has_trading_incentive": false
                },
                "last": 133.17,
                "volume": 122698.322341,
                "converted_last": {
                    "btc": 0.00210941,
                    "eth": 0.0383195,
                    "usd": 133.21
                },
                "converted_volume": {
                    "btc": 235.368,
                    "eth": 4276,
                    "usd": 14863659
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.052612,
                "timestamp": "2024-02-29T14:42:39+00:00",
                "last_traded_at": "2024-02-29T14:42:39+00:00",
                "last_fetch_at": "2024-02-29T14:42:39+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.okx.com/trade-spot/sol-usdc",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "TRY",
                "market": {
                    "name": "BtcTurk | Kripto",
                    "identifier": "btcturk",
                    "has_trading_incentive": false
                },
                "last": 4155.48,
                "volume": 123520.5491,
                "converted_last": {
                    "btc": 0.00209777,
                    "eth": 0.03809837,
                    "usd": 133.08
                },
                "converted_volume": {
                    "btc": 259.117,
                    "eth": 4706,
                    "usd": 16437656
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.067562,
                "timestamp": "2024-02-29T14:40:58+00:00",
                "last_traded_at": "2024-02-29T14:40:58+00:00",
                "last_fetch_at": "2024-02-29T14:40:58+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.btcturk.com/pro/al-sat/SOL_TRY",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "LATOKEN",
                    "identifier": "latoken",
                    "has_trading_incentive": false
                },
                "last": 134.48,
                "volume": 202617.97090697617,
                "converted_last": {
                    "btc": 0.00212266,
                    "eth": 0.03849877,
                    "usd": 134.48
                },
                "converted_volume": {
                    "btc": 430.088,
                    "eth": 7801,
                    "usd": 27248725
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.057424,
                "timestamp": "2024-02-29T14:33:21+00:00",
                "last_traded_at": "2024-02-29T14:33:21+00:00",
                "last_fetch_at": "2024-02-29T14:33:21+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://latoken.com/exchange/USDT-SOL",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "CoinW",
                    "identifier": "coinw",
                    "has_trading_incentive": false
                },
                "last": 134.195,
                "volume": 14847.476,
                "converted_last": {
                    "btc": 0.00211816,
                    "eth": 0.03841718,
                    "usd": 134.2
                },
                "converted_volume": {
                    "btc": 31.449288,
                    "eth": 570.398,
                    "usd": 1992505
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.107383,
                "timestamp": "2024-02-29T14:33:06+00:00",
                "last_traded_at": "2024-02-29T14:33:06+00:00",
                "last_fetch_at": "2024-02-29T14:33:06+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinw.com/front/market",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "EXMO",
                    "identifier": "exmo",
                    "has_trading_incentive": false
                },
                "last": 132.6424,
                "volume": 54907.15343148,
                "converted_last": {
                    "btc": 0.00210518,
                    "eth": 0.03825047,
                    "usd": 133.23
                },
                "converted_volume": {
                    "btc": 115.589,
                    "eth": 2100,
                    "usd": 7315087
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.01445,
                "timestamp": "2024-02-29T14:41:48+00:00",
                "last_traded_at": "2024-02-29T14:41:48+00:00",
                "last_fetch_at": "2024-02-29T14:41:48+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exmo.com/en/trade/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 122.51,
                "volume": 129225.2,
                "converted_last": {
                    "btc": 0.00210288,
                    "eth": 0.03820086,
                    "usd": 132.8
                },
                "converted_volume": {
                    "btc": 244.3,
                    "eth": 4438,
                    "usd": 15427749
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.04894,
                "timestamp": "2024-02-29T14:40:07+00:00",
                "last_traded_at": "2024-02-29T14:40:07+00:00",
                "last_fetch_at": "2024-02-29T14:42:03+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_EUR?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "BYDFi",
                    "identifier": "bydfi",
                    "has_trading_incentive": false
                },
                "last": 134.19,
                "volume": 33900.05,
                "converted_last": {
                    "btc": 0.00211808,
                    "eth": 0.03841193,
                    "usd": 134.01
                },
                "converted_volume": {
                    "btc": 71.803,
                    "eth": 1302,
                    "usd": 4542986
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.022375,
                "timestamp": "2024-02-29T14:32:17+00:00",
                "last_traded_at": "2024-02-29T14:32:17+00:00",
                "last_fetch_at": "2024-02-29T14:32:17+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bydfi.com/en/spot/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "MXN",
                "market": {
                    "name": "Bitso",
                    "identifier": "bitso",
                    "has_trading_incentive": false
                },
                "last": 2281.74,
                "volume": 10080.85250418,
                "converted_last": {
                    "btc": 0.00210508,
                    "eth": 0.03819794,
                    "usd": 133.57
                },
                "converted_volume": {
                    "btc": 21.220988,
                    "eth": 385.068,
                    "usd": 1346499
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.017012,
                "timestamp": "2024-02-29T14:37:43+00:00",
                "last_traded_at": "2024-02-29T14:37:43+00:00",
                "last_fetch_at": "2024-02-29T14:37:43+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": null,
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 0.0020981,
                "volume": 71204.206,
                "converted_last": {
                    "btc": 0.0020981,
                    "eth": 0.03807457,
                    "usd": 133.18
                },
                "converted_volume": {
                    "btc": 149.394,
                    "eth": 2711,
                    "usd": 9482783
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.114231,
                "timestamp": "2024-02-29T14:39:47+00:00",
                "last_traded_at": "2024-02-29T14:39:47+00:00",
                "last_fetch_at": "2024-02-29T14:39:47+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/SOL-BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "ETH",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 0.038203,
                "volume": 17118.4543167,
                "converted_last": {
                    "btc": 0.00210308,
                    "eth": 0.03816643,
                    "usd": 133.49
                },
                "converted_volume": {
                    "btc": 36.001396,
                    "eth": 653.35,
                    "usd": 2285114
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.062783,
                "timestamp": "2024-02-29T14:38:20+00:00",
                "last_traded_at": "2024-02-29T14:38:20+00:00",
                "last_fetch_at": "2024-02-29T14:38:20+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-ETH",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "ethereum"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 134.08,
                "volume": 98976.12,
                "converted_last": {
                    "btc": 0.00212713,
                    "eth": 0.03853582,
                    "usd": 134.23
                },
                "converted_volume": {
                    "btc": 190.225,
                    "eth": 3446,
                    "usd": 12003658
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.044756,
                "timestamp": "2024-02-29T14:21:45+00:00",
                "last_traded_at": "2024-02-29T14:21:45+00:00",
                "last_fetch_at": "2024-02-29T14:21:45+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_USDC?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 132.83,
                "volume": 109021.414,
                "converted_last": {
                    "btc": 0.00209438,
                    "eth": 0.0380071,
                    "usd": 132.94
                },
                "converted_volume": {
                    "btc": 228.333,
                    "eth": 4144,
                    "usd": 14493449
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.082838,
                "timestamp": "2024-02-29T14:39:48+00:00",
                "last_traded_at": "2024-02-29T14:39:48+00:00",
                "last_fetch_at": "2024-02-29T14:39:48+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/SOL-USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "TRY",
                "market": {
                    "name": "Bitci TR",
                    "identifier": "bitci",
                    "has_trading_incentive": false
                },
                "last": 4162.2,
                "volume": 7434.50592018,
                "converted_last": {
                    "btc": 0.00210619,
                    "eth": 0.03826889,
                    "usd": 133.29
                },
                "converted_volume": {
                    "btc": 13.760444,
                    "eth": 250.024,
                    "usd": 870833
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.012051,
                "timestamp": "2024-02-29T14:41:01+00:00",
                "last_traded_at": "2024-02-29T14:41:01+00:00",
                "last_fetch_at": "2024-02-29T14:41:01+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitci.com/exchange/advanced/SOL_TRY",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "PointPay",
                    "identifier": "pointpay",
                    "has_trading_incentive": false
                },
                "last": 132.7046916,
                "volume": 8809.3740346,
                "converted_last": {
                    "btc": 0.00210204,
                    "eth": 0.03818561,
                    "usd": 132.75
                },
                "converted_volume": {
                    "btc": 16.987268,
                    "eth": 308.59,
                    "usd": 1072760
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.395599,
                "timestamp": "2024-02-29T14:42:46+00:00",
                "last_traded_at": "2024-02-29T14:42:46+00:00",
                "last_fetch_at": "2024-02-29T14:42:46+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.pointpay.io/trade-classic/SOL_USDC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "ETH",
                "market": {
                    "name": "Coinbase Exchange",
                    "identifier": "gdax",
                    "has_trading_incentive": false
                },
                "last": 0.03808,
                "volume": 31375.9123,
                "converted_last": {
                    "btc": 0.00210125,
                    "eth": 0.03817923,
                    "usd": 132.98
                },
                "converted_volume": {
                    "btc": 65.929,
                    "eth": 1198,
                    "usd": 4172317
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.104712,
                "timestamp": "2024-02-29T14:41:10+00:00",
                "last_traded_at": "2024-02-29T14:41:10+00:00",
                "last_fetch_at": "2024-02-29T14:41:10+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.coinbase.com/trade/SOL-ETH",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "ethereum"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "BtcTurk | Kripto",
                    "identifier": "btcturk",
                    "has_trading_incentive": false
                },
                "last": 132.91,
                "volume": 146296.3301,
                "converted_last": {
                    "btc": 0.00209564,
                    "eth": 0.03805985,
                    "usd": 132.94
                },
                "converted_volume": {
                    "btc": 306.585,
                    "eth": 5568,
                    "usd": 19448885
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.113242,
                "timestamp": "2024-02-29T14:40:58+00:00",
                "last_traded_at": "2024-02-29T14:40:58+00:00",
                "last_fetch_at": "2024-02-29T14:40:58+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.btcturk.com/pro/al-sat/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "GBP",
                "market": {
                    "name": "Kraken",
                    "identifier": "kraken",
                    "has_trading_incentive": false
                },
                "last": 104.95,
                "volume": 45088.70432974,
                "converted_last": {
                    "btc": 0.00209506,
                    "eth": 0.03804918,
                    "usd": 132.9
                },
                "converted_volume": {
                    "btc": 94.463,
                    "eth": 1716,
                    "usd": 5992490
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.152672,
                "timestamp": "2024-02-29T14:40:51+00:00",
                "last_traded_at": "2024-02-29T14:40:51+00:00",
                "last_fetch_at": "2024-02-29T14:40:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://pro.kraken.com/app/trade/SOL-GBP",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "CoinTR Pro",
                    "identifier": "cointr",
                    "has_trading_incentive": false
                },
                "last": 132.45,
                "volume": 494460.1,
                "converted_last": {
                    "btc": 0.00210212,
                    "eth": 0.03818707,
                    "usd": 132.75
                },
                "converted_volume": {
                    "btc": 954.455,
                    "eth": 17339,
                    "usd": 60274661
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.816602,
                "timestamp": "2024-02-29T14:42:40+00:00",
                "last_traded_at": "2024-02-29T14:42:40+00:00",
                "last_fetch_at": "2024-02-29T14:42:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.cointr.com/en-us/spot/SOL_USDT",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Tokenize",
                    "identifier": "tokenize",
                    "has_trading_incentive": false
                },
                "last": 133.8046,
                "volume": 33044.74005536192,
                "converted_last": {
                    "btc": 0.00210806,
                    "eth": 0.03825685,
                    "usd": 133.8
                },
                "converted_volume": {
                    "btc": 69.66,
                    "eth": 1264,
                    "usd": 4421538
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.80429,
                "timestamp": "2024-02-29T14:38:51+00:00",
                "last_traded_at": "2024-02-29T14:38:51+00:00",
                "last_fetch_at": "2024-02-29T14:38:51+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://tokenize.exchange/market/USD-SOL",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USD",
                "market": {
                    "name": "Bitso",
                    "identifier": "bitso",
                    "has_trading_incentive": false
                },
                "last": 133.735,
                "volume": 15811.95656181,
                "converted_last": {
                    "btc": 0.00210768,
                    "eth": 0.03824513,
                    "usd": 133.74
                },
                "converted_volume": {
                    "btc": 33.326537,
                    "eth": 604.73,
                    "usd": 2114612
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.068034,
                "timestamp": "2024-02-29T14:37:43+00:00",
                "last_traded_at": "2024-02-29T14:37:43+00:00",
                "last_fetch_at": "2024-02-29T14:37:43+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": null,
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "LBank",
                    "identifier": "lbank",
                    "has_trading_incentive": false
                },
                "last": 134.17,
                "volume": 6164.81,
                "converted_last": {
                    "btc": 0.00211927,
                    "eth": 0.03843362,
                    "usd": 134.09
                },
                "converted_volume": {
                    "btc": 13.064925,
                    "eth": 236.936,
                    "usd": 826620
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.014868,
                "timestamp": "2024-02-29T14:32:54+00:00",
                "last_traded_at": "2024-02-29T14:32:54+00:00",
                "last_fetch_at": "2024-02-29T14:32:54+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.lbank.com/trade/sol_usdc",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "CoinEx",
                    "identifier": "coinex",
                    "has_trading_incentive": false
                },
                "last": 133.63,
                "volume": 105094.1213574,
                "converted_last": {
                    "btc": 0.00210657,
                    "eth": 0.03821642,
                    "usd": 133.52
                },
                "converted_volume": {
                    "btc": 200.134,
                    "eth": 3631,
                    "usd": 12685492
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.089505,
                "timestamp": "2024-02-29T14:35:25+00:00",
                "last_traded_at": "2024-02-29T14:35:25+00:00",
                "last_fetch_at": "2024-02-29T14:35:25+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.coinex.com/trading?currency=USDT&dest=SOL#limit",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Crypto.com Exchange",
                    "identifier": "crypto_com",
                    "has_trading_incentive": false
                },
                "last": 0.0021035,
                "volume": 9303.1901,
                "converted_last": {
                    "btc": 0.0021035,
                    "eth": 0.03822003,
                    "usd": 133.12
                },
                "converted_volume": {
                    "btc": 19.56926,
                    "eth": 355.568,
                    "usd": 1238445
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.227931,
                "timestamp": "2024-02-29T14:41:21+00:00",
                "last_traded_at": "2024-02-29T14:41:21+00:00",
                "last_fetch_at": "2024-02-29T14:41:21+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://crypto.com/exchange/trade/spot/SOL_BTC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "SGD",
                "market": {
                    "name": "Tokenize",
                    "identifier": "tokenize",
                    "has_trading_incentive": false
                },
                "last": 180.1009,
                "volume": 33838.482123972506,
                "converted_last": {
                    "btc": 0.00211051,
                    "eth": 0.03830136,
                    "usd": 133.96
                },
                "converted_volume": {
                    "btc": 71.416,
                    "eth": 1296,
                    "usd": 4533013
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.766953,
                "timestamp": "2024-02-29T14:38:50+00:00",
                "last_traded_at": "2024-02-29T14:38:50+00:00",
                "last_fetch_at": "2024-02-29T14:38:50+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://tokenize.exchange/market/SGD-SOL",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "TRY",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 4152.2,
                "volume": 133817.47,
                "converted_last": {
                    "btc": 0.00209611,
                    "eth": 0.0380683,
                    "usd": 132.97
                },
                "converted_volume": {
                    "btc": 256.743,
                    "eth": 4663,
                    "usd": 16287036
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.107532,
                "timestamp": "2024-02-29T14:40:07+00:00",
                "last_traded_at": "2024-02-29T14:40:07+00:00",
                "last_fetch_at": "2024-02-29T14:40:07+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_TRY?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Dex-Trade",
                    "identifier": "dextrade",
                    "has_trading_incentive": false
                },
                "last": 0.0021062,
                "volume": 13561.96890057,
                "converted_last": {
                    "btc": 0.0021062,
                    "eth": 0.03826115,
                    "usd": 133.01
                },
                "converted_volume": {
                    "btc": 28.564219,
                    "eth": 518.897,
                    "usd": 1803855
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.279171,
                "timestamp": "2024-02-29T14:42:18+00:00",
                "last_traded_at": "2024-02-29T14:42:18+00:00",
                "last_fetch_at": "2024-02-29T14:42:18+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://dex-trade.com/spot/trading/SOLBTC?interface=classic",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "BTC",
                "market": {
                    "name": "Pionex",
                    "identifier": "pionex",
                    "has_trading_incentive": false
                },
                "last": 0.00210864,
                "volume": 8721.35,
                "converted_last": {
                    "btc": 0.00210864,
                    "eth": 0.03829669,
                    "usd": 132.99
                },
                "converted_volume": {
                    "btc": 17.08168,
                    "eth": 310.234,
                    "usd": 1077336
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.092855,
                "timestamp": "2024-02-29T14:43:09+00:00",
                "last_traded_at": "2024-02-29T14:43:09+00:00",
                "last_fetch_at": "2024-02-29T14:43:09+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.pionex.com/en/trade/SOL_BTC/Bot",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "bitcoin"
            },
            {
                "base": "SOL",
                "target": "USDC",
                "market": {
                    "name": "VALR",
                    "identifier": "valr",
                    "has_trading_incentive": false
                },
                "last": 134.41,
                "volume": 5066.7025,
                "converted_last": {
                    "btc": 0.00212905,
                    "eth": 0.03867631,
                    "usd": 134.45
                },
                "converted_volume": {
                    "btc": 9.400915,
                    "eth": 170.777,
                    "usd": 593676
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.127829,
                "timestamp": "2024-02-29T14:42:40+00:00",
                "last_traded_at": "2024-02-29T14:42:40+00:00",
                "last_fetch_at": "2024-02-29T14:42:40+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.valr.com/exchange/SOL/USDC",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "usd-coin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "P2B",
                    "identifier": "p2pb2b",
                    "has_trading_incentive": false
                },
                "last": 134.12,
                "volume": 966523.02,
                "converted_last": {
                    "btc": 0.00211697,
                    "eth": 0.03839189,
                    "usd": 133.94
                },
                "converted_volume": {
                    "btc": 2046,
                    "eth": 37107,
                    "usd": 129457338
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.594398,
                "timestamp": "2024-02-29T14:32:56+00:00",
                "last_traded_at": "2024-02-29T14:32:56+00:00",
                "last_fetch_at": "2024-02-29T14:32:56+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": null,
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "BNB",
                "market": {
                    "name": "Binance",
                    "identifier": "binance",
                    "has_trading_incentive": false
                },
                "last": 0.3256,
                "volume": 41577.86,
                "converted_last": {
                    "btc": 0.00210175,
                    "eth": 0.03818028,
                    "usd": 132.73
                },
                "converted_volume": {
                    "btc": 79.871,
                    "eth": 1451,
                    "usd": 5043910
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.092393,
                "timestamp": "2024-02-29T14:42:43+00:00",
                "last_traded_at": "2024-02-29T14:42:43+00:00",
                "last_fetch_at": "2024-02-29T14:42:43+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/SOL_BNB?ref=37754157",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "binancecoin"
            },
            {
                "base": "SOL",
                "target": "USDT",
                "market": {
                    "name": "Bitrue",
                    "identifier": "bitrue",
                    "has_trading_incentive": false
                },
                "last": 133.926,
                "volume": 85149.629,
                "converted_last": {
                    "btc": 0.00211123,
                    "eth": 0.03830228,
                    "usd": 133.96
                },
                "converted_volume": {
                    "btc": 179.771,
                    "eth": 3261,
                    "usd": 11406446
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.394844,
                "timestamp": "2024-02-29T14:36:32+00:00",
                "last_traded_at": "2024-02-29T14:36:32+00:00",
                "last_fetch_at": "2024-02-29T14:36:32+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitrue.com/trade/sol_usdt",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "tether"
            },
            {
                "base": "SOL",
                "target": "EUR",
                "market": {
                    "name": "Bitget",
                    "identifier": "bitget",
                    "has_trading_incentive": false
                },
                "last": 122.6,
                "volume": 1323.5981,
                "converted_last": {
                    "btc": 0.00209431,
                    "eth": 0.03800585,
                    "usd": 132.94
                },
                "converted_volume": {
                    "btc": 2.516236,
                    "eth": 45.662552,
                    "usd": 159719
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.284669,
                "timestamp": "2024-02-29T14:39:16+00:00",
                "last_traded_at": "2024-02-29T14:39:16+00:00",
                "last_fetch_at": "2024-02-29T14:39:16+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.bitget.com/spot/SOLEUR?type=spot",
                "token_info_url": null,
                "coin_id": "solana"
            },
            {
                "base": "SOL",
                "target": "ETH",
                "market": {
                    "name": "PointPay",
                    "identifier": "pointpay",
                    "has_trading_incentive": false
                },
                "last": 0.03826922,
                "volume": 9856.7424446,
                "converted_last": {
                    "btc": 0.00210596,
                    "eth": 0.03825671,
                    "usd": 132.99
                },
                "converted_volume": {
                    "btc": 19.558346,
                    "eth": 355.296,
                    "usd": 1235126
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.036119,
                "timestamp": "2024-02-29T14:42:46+00:00",
                "last_traded_at": "2024-02-29T14:42:46+00:00",
                "last_fetch_at": "2024-02-29T14:42:46+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://exchange.pointpay.io/trade-classic/SOL_ETH",
                "token_info_url": null,
                "coin_id": "solana",
                "target_coin_id": "ethereum"
            }
        ]
    }
]