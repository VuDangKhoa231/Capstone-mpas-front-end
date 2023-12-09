import { Box, Divider, Drawer, Stack, Typography } from '@mui/material'
import React from 'react'
import NotiCard from './NotiCard'
import themes from '../../theme/themes'



export default function Index({ openNoti, onClose, data }) {

    return (
        <Drawer anchor="right" open={openNoti} onClose={onClose}>
            <div style={{ width: 300, padding: 5 }}>
                <Typography variant='h4'>Thông báo</Typography>
                <Stack>
                    {data?.map((item, index) => (
                        <Box key={index} sx={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: themes.palette.grey[300], }, }}>
                            <NotiCard key={index} item={item} />
                            <Divider sx={{ width: '100%' }} />
                        </Box>
                    ))}
                </Stack>
            </div>
        </Drawer>
    )
}
