import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import { Box, Divider, Grid, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../firebase/messaging_init_in_sw';
import MessageCard from './MessageCard';
import InputEmojiWithRef from 'react-input-emoji';


export default function ChatDetail({ selectUser, setIsOpen }) {
    const [isCollapsed, setCollapsed] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [messageList, setMessageList] = useState([]);
    const user = useSelector((state) => state.auth?.login.currentUser)
    const [loading, setLoading] = useState(true);
    const [showEmoji, setShowEmoji] = useState(false);

    const handleClickShowEmoji = () => setShowEmoji((showEmoji) => !showEmoji);


    const handleToggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    const messageRef = collection(database, `admin/ADMIN1/user/${selectUser.id}/messages`)
    useEffect(() => {
        const queryMessages = query(messageRef);
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let message = [];
            snapshot.forEach((doc, index) => {
                message.push({ ...doc.data(), id: index });
            })
            setMessageList(message);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [selectUser])

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (!loading && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [loading, messageList]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (textInput == "") return;
        const customDocId = new Date().getTime().toString();
        const customDocRef = doc(collection(database, `admin/ADMIN1/user/${selectUser.id}/messages`), customDocId);
        await setDoc(customDocRef, {
            fromId: user?.adminID,
            toId: selectUser.id,
            sent: customDocId,
            read: "",
            msg: textInput,
            type: "text",
        })
        setTextInput('');
    }
    return (
        <Paper elevation={6}
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 10,
                zIndex: 10,
                height: isCollapsed ? '35px' : '500px',
                width: '350px',
                transition: 'height 0.3s ease-in-out',
            }}>

            <Grid container>
                <Grid item xs={9}>
                    <Typography p={1}>{selectUser.name}</Typography>
                </Grid>
                <Grid item xs={1.5}>
                    <IconButton onClick={handleToggleCollapse} sx={{ ':hover': { color: 'blue' } }}><RemoveIcon fontSize='medium' /></IconButton>
                </Grid>
                <Grid item xs={1.5}>
                    <IconButton onClick={() => setIsOpen(false)} sx={{ ':hover': { color: 'red' } }}><CloseIcon /></IconButton>
                </Grid>
            </Grid>
            <Divider width='100%' />

            <Box sx={{ overflowY: 'auto', height: '400px' }} ref={chatContainerRef}>
                <Box>
                    {messageList && messageList.length > 0 &&
                        messageList.map((item, index) => (
                            <MessageCard data={item} key={index} />
                        ))
                    }
                </Box>
            </Box>

            <form onSubmit={handleSend}>
                <Divider width='100%' />
                <Grid container display={'flex'} alignItems={'center'}>
                    <Grid item xs={10} pl={1}>
                        <InputEmojiWithRef value={textInput} onChange={setTextInput}/>
                    </Grid>
                    <Grid item xs={2} textAlign={'center'}>
                        <IconButton type='submit' sx={{ color: 'blue' }}> <SendIcon /></IconButton>
                    </Grid>
                </Grid>
            </form>



        </Paper>
    )
}
