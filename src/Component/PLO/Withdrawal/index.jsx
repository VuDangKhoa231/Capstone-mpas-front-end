import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import themes from '../../../theme/themes';
import WithdrawalHistory from './WithdrawalHistory';
import WithdrawalList from './WithdrawalList';
import { useDispatch, useSelector } from 'react-redux';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {/* <SearchBar /> */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  return (

    <Stack direction='column' p='10px' spacing={4}>
      {/* Header */}
      <Typography variant='h2'>Yêu cầu rút tiền</Typography>

      {/* Content */}
      <Box width={'100%'}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Yêu cầu" {...a11yProps(0)} />
            <Tab label="Lịch sử Rút tiền" {...a11yProps(1)} />
          </Tabs>
        </Box>



        <CustomTabPanel value={value} index={0}>
          <WithdrawalList accessToken={user?.login.accessToken} dispatch={dispatch} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <WithdrawalHistory accessToken={user?.login.accessToken} dispatch={dispatch} />
        </CustomTabPanel>
      </Box>
    </Stack>
  )
}