import { Box, Divider, Drawer, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import NotiCard from '../Notication/NotiCard'
import themes from '../../theme/themes'
import ChatCard from './ChatCard'
import ChatDetail from './ChatDetail'


export default function Index({ openChat, onClose, data }) {
    const [selectedUser, setSelectedUser] = useState();
    const [isOpen, setIsOpen] = useState(false);

    console.log('data', data)   ;
    return (
        <>
            <Drawer anchor="right" open={openChat} onClose={onClose}>
                <div style={{ width: 300, padding: 5 }}>
                    <Typography variant='h4'>Tin nhắn</Typography>
                    <Stack>
                        {data && data.length > 0 ?
                            <>
                                {data?.map((item, index) => {
                                    return (
                                        <Box key={index} onClick={() => { setSelectedUser(item); onClose(); setIsOpen(true) }} sx={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: themes.palette.grey[300], }, }}>
                                            <ChatCard key={index} item={item} />
                                            <Divider sx={{ width: '100%' }} />
                                        </Box>
                                    )
                                })}
                            </>
                            :
                            <Box display={'flex'} justifyContent={'center'} height={'90vh'} alignItems={'center'}>
                                <Typography variant='h6'>Không có hộp thoại nào!</Typography>
                            </Box>
                        }

                    </Stack>
                </div>
            </Drawer>
            {isOpen && <ChatDetail selectUser={selectedUser} setIsOpen={setIsOpen} />}
        </>

    )
}

