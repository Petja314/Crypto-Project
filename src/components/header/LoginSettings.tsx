import Dashboard from "../dashboard/Dashboard";
import dashboard from "../../assets/images/header-img/delicious.svg";
import LoginContainer from "../login/LoginContainer";
import React from "react";
import {Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, MenuList, styled, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {Link, Navigate, NavLink, Outlet, useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {logOuThunkCreator} from "../../redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {UserAvatar} from "./UserAvatar";
import {actionsProfile} from "../../redux/ProfileReducer";
import PortfolioManager from "../portfolio/PortfolioManager";
import DexExchange from "../dex-exchange/DexExchange";
import News from "../news/News";
import Profile from "../profile/Profile";


const menu_options = [
    {path: '/profile', element: <Profile/>, name: "Profile"},
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard"},
    {path: '/portfolio', element: <PortfolioManager/>, name: "Portfolio"},
    {path: '/dex-exchange', element: <DexExchange/>, name: "DEX Exchange"},
    {path: '/news', element: <News/>, name: "News"},
];

// Quick Description: LoginSettings Component
// Displays the user avatar with a menu containing options such as logout and navigation routes.

const LoginSettings = () => {
    const dispatch: any = useDispatch()
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
        <Box sx={{
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



