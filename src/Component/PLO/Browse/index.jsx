import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchBar from '../../../Layout/SearchBar';
import themes from '../../../theme/themes';
import BrowseHistory from './BrowseHistory';
import { BrowseList } from './BrowseList';

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
    return (
        <Stack direction='column' p='10px' spacing={4}>
            {/* Header */}
            <Typography variant='h2'>Hồ sơ chờ kiểm duyệt</Typography>
          
            {/* Content */}
            <Box width={'100%'}>
             
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Yêu cầu" {...a11yProps(0)} />
                                <Tab label="Lịch sử phê duyệt" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                  
             
                <CustomTabPanel value={value} index={0}>
                    <BrowseList/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <BrowseHistory />
                </CustomTabPanel>
            </Box>
        </Stack>
    )
}
