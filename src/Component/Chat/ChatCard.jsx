import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChipCustom from '../../Layout/ChipCustom'


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import themes from '../../theme/themes';
import { database, getLastMessage } from '../../firebase/messaging_init_in_sw';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getLastMessageTime } from '../../ultis/formatDate';
export default function ChatCard({ item }) {
    const [lastMessage, setLastMessgae] = useState('');
    const user = useSelector((state) => state.auth?.login.currentUser)
    const messageRef = collection(database, `admin/ADMIN1/user/${item.id}/messages`)
    useEffect(() => {
        const q = query(messageRef, orderBy('sent', 'desc'), limit(1));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setLastMessgae(doc.data());
                console.log('doc', doc.data());
            });
        });

        return () => unsubscribe();
    }, [item])

    return (
        <Box sx={{ p: '10px 2px 0px 10px', height: '80px' }}>
           
            <Grid container spacing={1}>
                <Grid item xs={9.8}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={0.5}>
                        <Typography variant='body1' fontWeight={'bold'}>{item.name}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={2.2}>
                    <ChipCustom label={`${(item.id).slice(0, 2) == "PL" ? "PLO" : "CUS"}`} backgroundColor={(item.id).slice(0, 2) == "PL" ? '#f39c12' : '#00cc66'} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={11}>
                    <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{lastMessage.fromId === user?.adminID ?  `Bạn: ${lastMessage.msg}` : lastMessage.msg}</Typography>
                </Grid>
                <Grid item xs={1}>
                    {lastMessage.toId === user?.adminID && lastMessage.read === "" && <FiberManualRecordIcon sx={{ color: '#89BF04' }} />}
                </Grid>
            </Grid>
            {lastMessage.read !== "" && lastMessage.fromId === user?.adminID &&
                <Box sx={{display: 'flex' , justifyContent: 'flex-end'}}>
                     {console.log('test', lastMessage.sent)}
                    <Typography variant='body2' >  {getLastMessageTime({time: lastMessage.sent})}</Typography>
                </Box>}
                
        </Box>
    )
}
