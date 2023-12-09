import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase/messaging_init_in_sw";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getLastMessageTime, getMessageTime } from "../../ultis/formatDate";
import themes from "../../theme/themes";
const MessageCard = ({ data }) => {
    const user = useSelector((state) => state.auth?.login.currentUser)
    return (
        <Box>
            {data?.fromId === user.adminID ? Sender(data) : Receiver(data)}
        </Box>

    );
};

function Receiver(data){
   
        if(data.read === "") {
            const timeNow = new Date().getTime().toString();
            const customDocRef = doc(collection(database, `admin/ADMIN1/user/${data.fromId}/messages`), data.sent);
            const updateTime = async () => {
                await updateDoc(customDocRef, {
                    read: timeNow,
                });
            }
            updateTime();
        }
  
    
    
    return (
        <Box sx={{ display: 'flex', alignSelf: 'center' }} pl={1} pr={7}>
            <Box sx={{ borderRadius: 6, backgroundColor: '#F0F0F0', color: 'black', overflowWrap: 'break-word', wordBreak: 'break-all' }} mt={0.5} mb={0.5} px={1} py={1.2} >
                <Typography variant="body1">
                    {data.msg}
                </Typography>
                <Typography fontSize={'12px'} sx={{color: themes.palette.grey.dark}}>{getMessageTime({ time: data.sent})}</Typography>
            </Box>
          
        </Box>
    )

}

function Sender(data){
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pl={6} pr={1}> 
            {data.read !== "" &&
                <Box alignSelf={'center'} mr={1}>
                    <DoneAllIcon sx={{ color: '#89BF04' }} />
                </Box>}
            <Box sx={{ borderRadius: 6, backgroundColor: '#0084FF', color: 'white', overflowWrap: 'break-word', wordBreak: 'break-all', textAlign:'end' }} mt={0.5} mb={0.5} px={1.2} py={1}>
                <Typography variant="body1">
                    {data.msg}
                </Typography>
                <Typography fontSize={'12px'}sx={{color: themes.palette.grey.light}}>{getMessageTime({time: data.sent})}</Typography>
            </Box>
            
        </Box>
    )
}
export default MessageCard;