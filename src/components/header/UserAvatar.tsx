import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {Avatar, Badge, IconButton, styled} from "@mui/material";
import noAvatar from "../../assets/images/image/blankAvatar.jpg";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";


// Quick Description: UserAvatar Component
// Showing the current user avatar from his account , if avatar does not exist , showing default avatar picture.

export const UserAvatar = ({setAnchorElUser} : any) => {
    const {user} = useSelector((state : RootState) => state.userProfile)
    // current user profile avatar from db firebase
    const userAvatarServer : string | null = user[0]?.photoURL

    //handleOpenUserMenu func. handle to open menu by passing openMenu state
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        const openMenu = event.currentTarget
        setAnchorElUser(openMenu);
    };

    return (
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    variant="dot"
                >
                    <Avatar sx={{ border: "1px solid #fff"}} src={userAvatarServer ? userAvatarServer : noAvatar} alt='avatar'> </Avatar>
                </StyledBadge>
            </IconButton>
        </Tooltip>
    )
}


export const StyledBadge = styled(Badge)(({theme}) => ({
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
