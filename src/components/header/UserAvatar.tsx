import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {Avatar, Badge, IconButton, styled} from "@mui/material";
import noAvatar from "../../assets/images/image/blankAvatar.jpg";
import {useSelector} from "react-redux";

export const UserAvatar = ({setAnchorElUser} : any) => {
    const userProfile = useSelector((state : any) => state.userProfile.user)
    const userAvatarServer = userProfile[0].photoURL
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
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
                {/*<Box sx={{marginLeft : "15px"}} > Name </Box>*/}
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
