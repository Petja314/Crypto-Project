import Dashboard from "../dashboard/Dashboard";
import React from "react";
import {Box, Menu, MenuItem, MenuList, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {logOuThunkCreator} from "../../redux/AuthReducer";
import {useDispatch} from "react-redux";
import {UserAvatar} from "./UserAvatar";
import PortfolioManager from "../portfolio/PortfolioManager";
import DexExchange from "../dex-exchange/DexExchange";
import News from "../news/News";
import Profile from "../profile/Profile";
import {AppDispatch} from "../../redux/ReduxStore";


const menu_options = [
    {path: '/profile', element: <Profile/>, name: "Profile"},
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard"},
    {path: '/portfolio', element: <PortfolioManager/>, name: "Portfolio"},
    {path: '/dex-exchange', element: <DexExchange/>, name: "DEX Exchange"},
    {path: '/news', element: <News/>, name: "News"},
];


/**
 * Quick Description: LoginSettings Component
 * Displays the user avatar with a menu containing options such as logout and navigation routes.
 */

const LoginSettings = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    // anchorElUser - handle to display the menu with app name and path's
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    //Handling the logout logic -  logOuThunkCreator make an api call to sign out , closing the menu , and navigate back to login page.
    const logOutHandler = async () => {
        await dispatch(logOuThunkCreator())
        navigate('/login')
        setAnchorElUser(null);
    }

    return (
        <Box
            sx={{
            flexGrow: 0,
        }}>
            <UserAvatar
                setAnchorElUser={setAnchorElUser}
            />
            <Menu
                sx={{mt: '60px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
            >
                <MenuList>
                    <MenuItem onClick={() => setAnchorElUser(null)}>
                        <Box onClick={logOutHandler}>Logout</Box>
                    </MenuItem>
                </MenuList>
                {menu_options.map((menu) => (
                    <MenuItem key={menu.name} onClick={() => setAnchorElUser(null)}>
                        <Typography textAlign="center">
                            <NavLink
                                style={{textDecoration: 'none', listStyleType: "none", color: "white", cursor: "pointer"}}
                                to={menu.path}
                            >
                                {menu.name}
                            </NavLink>
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default LoginSettings



