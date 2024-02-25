import React from 'react';
import {AppBar, Box, Container, Toolbar} from "@mui/material";
import {UseMobileHook} from "../hooks/UseMobileHook";
import HeaderDesktop from "./HeaderDesktop";
import MobileHeader from "./HeaderMobile";
import {ReactComponent as LeaderIcon} from "../../assets/images/icons/icon-cup-dark.svg"



const Header = ({routes,userLogged} : any) => {
   const {width} = UseMobileHook()
    const isMobile : boolean = width <= 900


    return (
        <Box>
            { isMobile ?
                <MobileHeader routes={routes} userLogged={userLogged}/>
                :
                <HeaderDesktop routes={routes} userLogged={userLogged}/>
            }
        </Box>

    );
};

export default Header;

