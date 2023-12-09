import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import 'dayjs/locale/vi';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { getDashboard } from '../../api/dashboard';
export default function DashboardTotal({ dispatch, accessToken }) {

  const dashboard = useSelector((state) => state.dashboard.dashboard)

  useEffect(() => {
    getDashboard(dispatch, accessToken)
  }, [])


  return (
    <>
      {dashboard?.isFetching ? (
        <Box sx={{ display: 'flex', width: '100%', height: '20vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) :
        (
          <Box display={'flex'} justifyContent={'space-around'} mt={'20px'}>
            <Paper elevation={6} sx={{ p: '20px 40px 20px 40px', width: '400px' }}>
              <Box display={'flex'} justifyContent={'center'}>
                <PeopleAltIcon fontSize='large' />
                <Typography variant='h4' sx={{ fontWeight: 'bold', ml: '20px' }}> Khách hàng</Typography>
              </Box>
              <Typography variant='h3' textAlign={'center'} mt={'20px'}> {dashboard?.data?.data.totalCustomer}</Typography>
            </Paper>
            <Paper elevation={6} sx={{ p: '20px 40px 20px 40px', width: '400px' }} >

              <Box display={'flex'} justifyContent={'center'}>
                <img src='../image/motorcycle-black.png' style={{ width: '40px' , height: '40px'}} />

                <Typography variant='h4' sx={{ fontWeight: 'bold', ml: '20px' }}> Chủ bãi xe</Typography>
              </Box>
              <Typography variant='h3' textAlign={'center'} mt={'20px'}>  {dashboard?.data?.data.totalPlo}</Typography>
            </Paper>
          </Box>
        )
      }
    </>
  )
}
