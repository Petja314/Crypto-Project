import React from 'react';
import {Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button} from "@mui/material";
import BtcPriceWidget from "./BtcPriceWidget";
import  BackgroundBlock from "../../assets/images/image/block_bg.svg"
import { css } from '@mui/system';


const CryptoTable = () => {

    return (
        <Box>
            <BtcPriceWidget/>
            <TableContainer component={Paper}
                            sx={{borderRadius: '20px'}}
            >
                <Table stickyHeader


                >
                    <TableHead
                    >
                        <TableRow
                            sx={{ background : "red" , paddingTop: "120px"}}
                        >
                            <TableCell>Id</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Gender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                    >
                        {
                            tableData.map(item => (
                                <TableRow
                                    key={item.id}
                                >
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.first_name}</TableCell>
                                    <TableCell>{item.last_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    );
};

export default CryptoTable;


const tableData = [{
    "id": 1,
    "first_name": "Arlen",
    "last_name": "Ernke",
    "email": "aernke0@theglobeandmail.com",
    "gender": "Male",
    "ip_address": "116.109.104.176"
}, {
    "id": 2,
    "first_name": "Even",
    "last_name": "Ryan",
    "email": "eryan1@i2i.jp",
    "gender": "Male",
    "ip_address": "16.88.173.109"
}, {
    "id": 3,
    "first_name": "Gwendolyn",
    "last_name": "Collidge",
    "email": "gcollidge2@bigcartel.com",
    "gender": "Female",
    "ip_address": "34.25.22.160"
}, {
    "id": 4,
    "first_name": "Holly",
    "last_name": "Ortzen",
    "email": "hortzen3@360.cn",
    "gender": "Female",
    "ip_address": "230.42.117.198"
}, {
    "id": 5,
    "first_name": "Colas",
    "last_name": "Tillyer",
    "email": "ctillyer4@prweb.com",
    "gender": "Non-binary",
    "ip_address": "86.100.16.2"
}, {
    "id": 6,
    "first_name": "Robinett",
    "last_name": "Burness",
    "email": "rburness5@istockphoto.com",
    "gender": "Female",
    "ip_address": "126.62.59.68"
}, {
    "id": 7,
    "first_name": "Ned",
    "last_name": "Jacquemy",
    "email": "njacquemy6@phpbb.com",
    "gender": "Male",
    "ip_address": "100.243.67.155"
}, {
    "id": 8,
    "first_name": "Korey",
    "last_name": "Conti",
    "email": "kconti7@earthlink.net",
    "gender": "Genderfluid",
    "ip_address": "239.46.70.83"
}, {
    "id": 9,
    "first_name": "Sheridan",
    "last_name": "Paler",
    "email": "spaler8@live.com",
    "gender": "Male",
    "ip_address": "138.196.140.242"
}, {
    "id": 10,
    "first_name": "Broderic",
    "last_name": "Vasilevich",
    "email": "bvasilevich9@over-blog.com",
    "gender": "Male",
    "ip_address": "18.208.109.12"
}
    , {
        "id": 11,
        "first_name": "Broderic",
        "last_name": "Vasilevich",
        "email": "bvasilevich9@over-blog.com",
        "gender": "Male",
        "ip_address": "18.208.109.12"
    }, {
        "id": 12,
        "first_name": "Broderic",
        "last_name": "Vasilevich",
        "email": "bvasilevich9@over-blog.com",
        "gender": "Male",
        "ip_address": "18.208.109.12"
    }, {
        "id": 13,
        "first_name": "Broderic",
        "last_name": "Vasilevich",
        "email": "bvasilevich9@over-blog.com",
        "gender": "Male",
        "ip_address": "18.208.109.12"
    }

]
