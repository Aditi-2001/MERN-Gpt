import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, {useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { red } from '@mui/material/colors'
import { IoMdSend } from 'react-icons/io'
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator'
import toast from 'react-hot-toast'
import ChatItem from '../components/chat/ChatItem'
import { useNavigate } from 'react-router-dom'

const Chat = () => {

    const navigate = useNavigate()
    const inputRef = useRef(null)
    const auth = useAuth()
    const [chatMessages, setChatMessages] = useState([])

    const handleSubmit = async () => {
        const content = inputRef.current.value
        if(inputRef && inputRef.current){
            inputRef.current.value = ""
        }
        const newMessage = {role: "user", content}
        setChatMessages((prev)=> [...prev, newMessage])

        const chatData = await sendChatRequest(content)
        setChatMessages([...chatData.chats])
        //
    }

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", {id: "deletechats"})
            await deleteUserChats()
            setChatMessages([])
            toast.success("Deleted chats Successsfully", {id: "deletechats"})
        } catch (error) {
            console.log(error)
            toast.error("Deleting Chats Failed", {id: "deletechats"})
        }
    }

    useLayoutEffect(() => {
        if(auth.isLoggedIn && auth.user) {
            toast.loading("Loading chats", {id : "loadchats"})
            getUserChats().then((data) => {
                setChatMessages([...data.chats])
                toast.success("Successfully Loaded chats", {id: "loadchats"})
            }).catch( err => {
                console.log(err)
                toast.error("Loading Failed", {id: "loadchats"})
            })

        }
    },[auth])

    useEffect(() => {

        if(!auth.user){
            return navigate("/login")
        }

    },[auth])

  return <Box sx={{
    display: 'flex',
    flex: '1',
    width: '100%',
    height: '100%',
    mt: 3,
    gap: 3,
  }}>

    <Box sx={{
        display: {
            md: 'flex',
            xs: 'none',
            sm: 'none',
        },
        flex: 0.2,
        flexDirection: 'column'
    }} >
       <Box sx={{display: 'flex', width: '100%', height: '60vh', bgcolor:'rgb(17,29,39)', borderRadius:5 , flexDirection: 'column', mx: 3 }}>
            <Avatar sx={{
                mx: 'auto',
                my: 2,
                bgcolor: "white",
                color: 'black',
                fontWeight: 700,
            }}>
                {console.log(auth.user)}
                {auth.user.name[0]}{
                    auth.user.name.includes(" ") && auth.user.name.split(" ")[1][0]
                }
            </Avatar>
            <Typography sx={{
                mx: 'auto',
                fontFamily: 'work sans',
            }} >
                You are talking to a ChatBOT
            </Typography>
            <Typography sx={{
                mx: 'auto',
                fontFamily: 'work sans',
                my: 4,
                p: 3
            }} >
                You can ask some questions related to knowledge, Buisness, Advices,
                Education, etc. But avoid sharing personal information.
            </Typography>
            <Button onClick={handleDeleteChats} sx={{
                width: '200px',
                my: 'auto',
                color: 'white',
                fontWeight: '700',
                borderRadius: 3,
                mx: 'auto',
                bgcolor: red[300],
                ":hover": {
                    bgcolor: red.A400,
                }
            }} >
                Clear Conversation
            </Button>
        </Box>  
    </Box>

    <Box sx={{
        display: 'flex',
        flex: {md: 0.8, xs: 1, sm: 1},
        flexDirection: 'column',
        px: 3,
    }}>
        <Typography sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2
        }}>
            Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
        }}>
            {
                chatMessages.map( (message,idx) => <ChatItem key={idx} content={message.content} role={message.role} />)
            }
        </Box>
        <Box sx={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17, 27, 39)',
            display: 'flex',
            margin: 'auto'
        }}>
            {" "}
            <input ref={inputRef} type='text' style={{width: '100%', backgroundColor: 'transparent', padding: '30px', border: 'none', outline: 'none', color: 'white', fontSize: '20px'}} />
            <IconButton onClick={handleSubmit} sx={{
                color: 'white',
                mx: 1,
            }}>
               <IoMdSend/> 
            </IconButton>
        </Box>
        
    </Box>

  </Box>
}

export default Chat
