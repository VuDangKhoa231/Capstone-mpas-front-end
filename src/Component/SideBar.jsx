import DashboardIcon from '@mui/icons-material/Dashboard';
import DiamondIcon from '@mui/icons-material/Diamond';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaceIcon from '@mui/icons-material/Face';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, List, ListItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import themes from '../theme/themes';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
const Menu = [
    {
        id: 1, name: 'Trang chủ', logo: <DashboardIcon fontSize='large' />, path: '/', children: null
    },
    {
        id: 2, name: 'Chủ bãi xe', logo: '', path: '', children: [
            {
                id: 2.1, name: 'Danh sách', logo: <FiberManualRecordIcon fontSize='16px' />, path: '/PLO'
            },
            {
                id: 2.2, name: 'Yêu cầu xét duyệt', logo: <FiberManualRecordIcon fontSize='16px' />, path: '/Browse'
            }, {
                id: 2.3, name: 'Yêu cầu rút tiền', logo: <FiberManualRecordIcon fontSize='16px' />, path: '/Withdrawal'
            }]
    },
    {
        id: 3, name: 'Khách hàng', logo: <PeopleAltIcon fontSize='large' />, path: '/Customer', children: null
    }

]
const SideBar = ({ selectedMenuItem, setSelectedMenuItem }) => {
    const expand = useState()
    return (
        <Drawer
            sx={{ position: '' }}
            variant="permanent"
            anchor="left"
            zindex={99}
           
        >
            <List sx={{ backgroundColor: themes.backgroundColor, color: 'white', minHeight: '98.3vh' }}>
                <Box sx={{ height: '6vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={'20px'}>
                    <img src='../image/logo.png' width={'20%'} />
                </Box>
                {Menu.map((item) => (
                    item.children !== null ? (
                        <Accordion key={item.id} disableGutters elevation={0} defaultExpanded sx={{ backgroundColor: themes.backgroundColor, color: 'white', '&.Mui-expanded': { minHeight: 'auto' } }} >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                                <Stack direction="row" spacing={2} sx={{ display: 'flex', alignItems: 'center', p: '10px' }}>
                                    <img src='../../image/motorcycle-white.png' style={{ width: '35px' }} />
                                    <Typography variant="h6">{item.name}</Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ py: 0, px: 2 }}>
                                <List>
                                    {item.children.map((item) => (
                                        <Link key={item.id} to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                                            <ListItem button onClick={() => setSelectedMenuItem(item.id)}>
                                                <Stack direction="row" spacing={2} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: selectedMenuItem !== item.id ? 'white' : themes.backgroundColor, backgroundColor: selectedMenuItem !== item.id ? themes.backgroundColor : 'white', width: '100%', borderRadius: '10px', p: '10px' }}>
                                                    {item.logo}
                                                    <Typography variant="h6">{item.name}</Typography>
                                                </Stack>
                                            </ListItem>

                                        </Link>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <Link key={item.id} to={item.path} style={{ textDecoration: 'none', color: 'white' }} >
                            <ListItem button onClick={() => setSelectedMenuItem(item.id)}>
                                <Stack direction="row" spacing={2} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: selectedMenuItem !== item.id ? 'white' : themes.backgroundColor, backgroundColor: selectedMenuItem !== item.id ? themes.backgroundColor : 'white', width: '100%', borderRadius: '10px', p: '10px' }}>
                                    {item.logo}
                                    <Typography variant="h6">{item.name}</Typography>
                                </Stack>
                            </ListItem>
                        </Link>
                    )
                ))}
            </List>
        </Drawer >
    );
}

export default SideBar;