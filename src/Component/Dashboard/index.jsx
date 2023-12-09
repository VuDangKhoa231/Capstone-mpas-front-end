import { getMessaging, getToken, requestPermission } from "@firebase/messaging"
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardCustom from './Dashboard-Customer'
import DashboardPLO from './Dashboard-PLO'
import DashboardTotal from './DashboardTotal'



export default function Index() {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    return (
        <Box p={'10px'}>
            <Typography variant='h2'>Trang chủ</Typography >
       
       
         
            <DashboardTotal dispatch={dispatch} accessToken={user?.login.accessToken} />
            <DashboardCustom dispatch={dispatch} accessToken={user?.login.accessToken} />
            <DashboardPLO dispatch={dispatch} accessToken={user?.login.accessToken} />
        </Box>
    )
}
