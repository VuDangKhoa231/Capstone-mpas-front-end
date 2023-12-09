import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { deleteCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutSuccess } from '../redux/authSlice';
import Notifications from './Notication';
import Chat from './Chat';
import { getNotification } from '../api/notification';
import { deleteToken, getMessaging, getToken } from '@firebase/messaging';
import ChatIcon from '@mui/icons-material/Chat';
import { database, getAllUser } from '../firebase/messaging_init_in_sw';
import ChatDetail from './Chat/ChatDetail';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import themes from '../theme/themes';




export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((state) => state.auth?.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const noti = useSelector((state) => state.notification.list)
    const [isNotificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
    const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
    const [dataChat, setDateChat] = useState();
    const isMenuOpen = Boolean(anchorEl);

    //Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutSuccess());
        deleteCookie('token');
        navigate('/login');

        const messaging = getMessaging();

        getToken(messaging)
            .then((currentToken) => {
                if (currentToken) {
                    // Xóa device token
                    deleteToken(messaging, currentToken)
                        .then(() => {
                            console.log('Device Token deleted');
                        })
                        .catch((error) => {
                            console.error('Error deleting device token:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error getting current device token:', error);
            });
    }

    //Noti
    const handleNotificationClick = () => {
        setNotificationDrawerOpen(!isNotificationDrawerOpen);
        if (!isNotificationDrawerOpen) {
            getNotification(dispatch, user?.login?.accessToken);
        }
    };


    //Chat 
    const handleNChatClick = () => {
        setChatDrawerOpen(!isChatDrawerOpen);
    };


    useEffect(() => {
        const messageRef = collection(database, `admin/ADMIN1/user`)
        const queryMessages = query(messageRef);
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let message = [];
            snapshot.forEach((doc) => {
                message.push({ ...doc.data() });
            })
            setDateChat(message);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <Typography padding='10px'> {user?.fullName}</Typography>
            <Divider />
            <MenuItem onClick={() => handleLogout()}>
                <Stack direction='row' spacing={2}>
                    <LogoutIcon />
                    <Typography>Đăng Xuất</Typography>
                </Stack>
            </MenuItem>
        </Menu>
    );



    return (
        <AppBar position="static" sx={{ backgroundColor: '#F5F5F5' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction={'row'}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleNChatClick}
                        sx={{mr:1}}
                    >
                            <ChatIcon sx={{ color: themes.palette.grey.dark }} fontSize='large' />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <Avatar />
                    </IconButton>
                </Stack>
            </Toolbar>
            {renderMenu}
            <Chat openChat={isChatDrawerOpen} onClose={handleNChatClick} data={dataChat} />
            <Notifications openNoti={isNotificationDrawerOpen} onClose={handleNotificationClick} data={noti?.data} />
        </AppBar>
    )
}