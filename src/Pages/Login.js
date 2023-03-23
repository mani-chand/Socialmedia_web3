import React,{useState,useEffect} from 'react';
import {Box,Stack,Typography,TextField,Button} from '@mui/material';
import Navbar from '../Components/Navbar';
import { useContract, useContractRead} from "@thirdweb-dev/react";
function Login(props) {
    const { contract } = useContract("0xa514eA1a6a2EB698C34F0A0712D8e57A43B4D820");
    const [user,setUser] = useState({
        email:"",
        password:""
    });
    useEffect(()=>{
        const isAuth = localStorage.getItem("auth")
    if(isAuth==="true"){
        window.location.replace('/home')
    }
    },[])
    const _mail = user.email
    const _password = user.password
    const { data, isLoading } = useContractRead(contract, "validUser", _mail, _password)
    const handleSubmit=()=>{
        //console.log(user)
        setUser({email:"",password:""})
        if(!isLoading){
            if(data[0]){
                    localStorage.setItem("user",JSON.stringify(data[1]))
                    localStorage.setItem("auth",true)
                    window.location.replace('/home')
            }else{
                console.log("false")
            }
        }
    }
    return (
        <Box>
            <Navbar/>
            <Stack>
                <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                    <Typography variant="h3">LOGIN</Typography>
                    <Stack >
                    <TextField 
                    id="standard-basic" 
                    label="EMAIL" 
                    type='email'
                    variant="standard" 
                    value={user.email}
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}
                    style = {{width: 1000, marginTop:"20px"}}/>
                    <TextField 
                    id="standard-basic" 
                    type='password'
                    label="PASSWORD" 
                    variant="standard" 
                    value={user.password}
                    onChange={(e)=>{setUser({...user,password:e.target.value})}}
                    style = {{width: 1000, marginTop:"20px"}}/>
                    </Stack>
                    <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style = {{width: 1000, marginTop:"20px"}}>
                    LOGIN
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default Login;