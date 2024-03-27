import React from 'react';
import {Box} from "@mui/material";
import {UseMobileHook} from "../hooks/UseMobileHook";
import HeaderDesktop from "./HeaderDesktop";
import MobileHeader from "./HeaderMobile";


// Quick Description: Header Component
// Showing the header based on device mobile/desktop

const Header = () => {
   const {width} = UseMobileHook()
    const isMobile : boolean = width <= 900

    return (
        <Box>
            { isMobile ?
                <MobileHeader  />
                :
                <HeaderDesktop/>
            }
        </Box>

    );
};

export default Header;

