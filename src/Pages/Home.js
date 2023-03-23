import React,{useState,useEffect} from 'react';
import { useContract,useStorageUpload, useContractWrite,useContractRead } from "@thirdweb-dev/react";
import './../App.css'
import Navbar from './../Components/Navbar'
import PostCard from './../Components/PostCard.js'
import {Box,Grid,Stack,Button } from '@mui/material';
import {Form} from 'react-bootstrap';
import FriendsList from '../Components/FriendsList';
function Home(props) {
    const { contract } = useContract("0xa514eA1a6a2EB698C34F0A0712D8e57A43B4D820");
    const [user,setUser] = useState(null);
    const { data,  } = useContractRead(contract, "getAllUsers")
    const { mutateAsync: upload } = useStorageUpload();
    const { mutateAsync: createPost,  } = useContractWrite(contract, "createPost")
    const [post,setPost] = useState({
        message:"",
        file:""
    })
    useEffect(()=>{
        const isAuth = localStorage.getItem("auth")
    if(isAuth!=="true"){
        window.location.replace('/')
    }
    },[])
    const [file, setFile] = useState();
        const authUser = ()=>{
            const authUser = JSON.parse(localStorage.getItem("user"))
            if(authUser){
                setUser(authUser)
            }
        }
        useEffect(()=>{
            authUser()
        },[])
    const handlePost =async()=>{
        try {
            const _file = await upload({
                data: [file],
                options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
                });
            setPost({...user,file:_file[0]})
            const _uname = user[0]
            const _message = post.message
            const data = await createPost([ _file[0], _uname, _message ]);
            console.info("contract call successs", data);
            } catch (err) {
            console.error("contract call failure", err);
            }
    }
    return (
        <div style={{maxWidth:"95%"}}>
            <Navbar/>
            <Box>
                <Grid container spacing={2} style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:"76px",marginLeft:"15px",minHeight:"78vh"}}>
                    <Grid
                    style={{maxHeight: '85vh',overflow: 'auto',scrollbarWidth:"none"}}
                    xs={7}>
                        <Form.Group className="mb-3">
                            <Form.Control
                            onChange={(e)=>setPost({...post,message:e.target.value})} 
                            placeholder='Type something'
                            className="mb-3"
                            style={{width:"47%",border:"3px solid black",marginLeft:"25px"}} 
                            as="textarea"
                            rows={5}
                            size='lg' />
                            <Stack style={{display:"flex",flexDirection:"row"}}>
                            <input
                            style={{margin:"0px 25px"}}
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])} />
                            <Button
                            onClick={handlePost}
                            style={{width:"10px",height:"20px",margin:"0px 25px"}} 
                            variant="contained">
                                POST
                            </Button>
                            </Stack>
                        </Form.Group>
                        <Box style={{margin:"5px 18px"}}>
                            <PostCard user={user}/>
                        </Box>
                    </Grid>
                    <Grid style={{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"}} xs={5}>
                        <FriendsList users={data}/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Home;