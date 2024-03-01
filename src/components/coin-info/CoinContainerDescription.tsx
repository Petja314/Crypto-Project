import React, {useEffect, useState} from 'react';
import { Container} from "@mui/material";
import { useParams} from "react-router-dom";
import {CoinDescription} from "./CoinDescription";


export const CoinContainerDescription = () => {
    const {id} = useParams()

    return (
        <Container>

            <CoinDescription
                id={id}
            />

        </Container>
    )
}