import Dashboard from "../dashboard/Dashboard";
import dashboard from "../../assets/images/header-img/delicious.svg";
import LoginContainer from "../login/LoginContainer";
import React from "react";
import {Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, MenuList, styled, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {Link, Navigate, NavLink, useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {logOuThunkCreator} from "../redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {UserAvatar} from "./UserAvatar";


const settings = [
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard", icon: dashboard},
    // {path: '/login', element: <LoginContainer/>, name: "Logout"},
];

 const LoginSettings = ({userLogged} : any) => {
     const dispatch : any = useDispatch()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


     const logOutHandler = async () => {
         dispatch(logOuThunkCreator())
     }
     // console.log('isAuth :' , isAuth.isAuth)

     if (userLogged === null) {
         return <Navigate to="/login" />
     }

     // console.log('userLogged SETTINGS :' , userLogged)

    return (
        <Box sx={{
            // border : "2px solid red",
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
                onClose={handleCloseUserMenu}
            >

                <MenuList>
                    <MenuItem onClick={handleCloseUserMenu}>
                            <Box onClick={logOutHandler}>Logout</Box>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                        <Link to={"/dashboard"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            Dashboard
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                        <Link to={"/profile"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            Profile
                        </Link>
                    </MenuItem>
                </MenuList  >


                {/*{settings.map((setting) => (*/}
                {/*    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>*/}
                {/*        <Typography textAlign="center">*/}
                {/*            <NavLink style={{textDecoration: 'none', listStyleType: "none", color: "white", cursor: "pointer"}} to={setting.path}>*/}
                {/*                {setting.name}*/}
                {/*            </NavLink>*/}
                {/*        </Typography>*/}
                {/*    </MenuItem>*/}
                {/*))}*/}
            </Menu>
        </Box>
    )
}

export default LoginSettings



