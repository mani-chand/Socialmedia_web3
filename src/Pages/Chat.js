import React,{useState,useEffect} from 'react';
import Chats from './../Components/Chats';
import Navbar from  './../Components/Navbar';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import {Box,TextField,Stack,Button } from '@mui/material';
export default function Chat(props) {
    const [curUser,setCurUser] = useState(null)
    const [SelUser,setSelUser] = useState(null)
    const [_message,setMessage] = useState("")
    useEffect(()=>{
        const isAuth = localStorage.getItem("auth")
    if(isAuth!=="true"){
        window.location.replace('/')
    }
    },[])
    const { contract } = useContract("0xE81dc4f52cBAAc9015DebdCadA96679139ce1867");
    const { mutateAsync: sendMessage,  } = useContractWrite(contract, "sendMessage")
    const handleSubmit = async()=>{
        try {
            const _from = JSON.parse(localStorage.getItem("user"))
            setCurUser(_from[0])
            const _to = JSON.parse(localStorage.getItem("selectedUser"))
            setSelUser(_to[0])
            console.log( _message, _to[0], _from[0])
            const data = await sendMessage([ _message, _to[0], _from[0] ]);
            console.info("contract call successs",data);
        } catch (err) {
            console.error("contract call failure", err);
        }
        setMessage("")
    }
    return (
        <div>
            <Navbar/>
            <Box style={{marginTop:"80px",overflowY:"scroll",minHeight:"87vh"}}>
                <Stack spacing={2} style={{maxHeight: '85vh',overflow: 'auto',scrollbarWidth:"none"}}>
                    <Chats curUse={curUser} SelUser={SelUser}/>
                </Stack>
            <TextField value={_message} onChange={(e)=>{setMessage(e.target.value)}} fullWidth label="send a message" id="fullWidth" />
            <Button onClick={handleSubmit} style={{marginTop:"10px"}} variant="contained">SEND</Button>
            </Box>
        </div>
    );
}