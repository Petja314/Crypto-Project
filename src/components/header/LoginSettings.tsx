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


const settings = [
    {path: '/dashboard', element: <Dashboard/>, name: "Dashboard", icon: dashboard},
    // {path: '/login', element: <LoginContainer/>, name: "Logout"},
];

 const LoginSettings = ({userLogged} : any) => {
     const dispatch : any = useDispatch()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
     const appInitial = useSelector((state: any) => state.appInitial)


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


     const logOutHandler = async () => {
         // try {
         //     await signOut(auth)
         //     navigate("/login")
         // } catch (error) {
         //     console.error(error)
         // }
         // console.log('click')
         dispatch(logOuThunkCreator())
     }
     // console.log('isAuth :' , isAuth.isAuth)

     if (!userLogged) {
         return <Navigate to="/login" />
     }

    return (
        <Box sx={{
            // border : "2px solid red",
            flexGrow: 0,
        }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                    >
                        <Avatar src={'https://randomuser.me/api/portraits/men/79.jpg'} alt='avatar'> </Avatar>
                    </StyledBadge>
                    {/*<Box sx={{marginLeft : "15px"}} > Name </Box>*/}
                </IconButton>
            </Tooltip>
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



const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

