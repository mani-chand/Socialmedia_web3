import React,{} from 'react';
import { useContract,MediaRenderer, useContractRead } from "@thirdweb-dev/react";
import {Card,Typography,Avatar,CardHeader,CardContent,CardActions} from '@mui/material/';
import { red } from '@mui/material/colors';
export default function PostCard(props) {
  const { contract } = useContract("0xa514eA1a6a2EB698C34F0A0712D8e57A43B4D820");
  const { data, isLoading } = useContractRead(contract, "getAllPosts")
  return (
    <>
    {(data&&(!isLoading))?
    <>
      {data.map(post=>{
        return (
          <Card style={{marginTop:"10px"}} lg={{minWidth:100}} sx={{ maxWidth: "95%" }} key={post[2]}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={post[0]}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post[2]}
        </Typography>
      </CardContent>
      {(post[1])?
      <MediaRenderer
      width='100%'
      style={{display:"block",margin:"0 auto"}}
      src={post[1]}/>
      :<></>}
      <CardActions disableSpacing>
      </CardActions>
    </Card>
        )
      })}
    </>
    :
    <></>}
    </>
  );
}