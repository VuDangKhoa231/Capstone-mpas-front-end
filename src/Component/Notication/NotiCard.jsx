import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ChipCustom from '../../Layout/ChipCustom'


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import themes from '../../theme/themes';

export default function NotiCard({ item }) {
  const dayjs = require('dayjs');
  const formattedDate = dayjs(item.created_at).format("HH:mm:ss - DD/MM/YYYY");
  return (
    <Box  sx={{ my: '5px', p: '10px 10px 0px 10px' }}>
      <Grid container spacing={0.5}>
        <Grid item xs={2}>
          {item.sender_type === "PLO" ?
            <>
              <img src='../../image/motorcycle-black.png' style={{ width: '35px' }} />
            </>
            :
            <>
              <PeopleAltIcon fontSize='large' />
            </>}
        </Grid>

        <Grid item xs={10}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='body1' fontWeight={'bold'}>{item.senderName}</Typography>
            <ChipCustom label={`${item.sender_type === "PLO" ? "PLO" : "CUS"}`} backgroundColor={item.sender_type === "PLO" ? '#f39c12': '#00cc66'} />
          </Box>
        </Grid>
      </Grid>
      <Typography sx={{minHeight: '60px'}}>{item.content}</Typography>
      <Typography textAlign={'end'} color={themes.palette.grey.dark}>{formattedDate}</Typography>

    </Box>
  )
}
