import React from 'react';
import {Button,Typography,Menu,MenuItem,Fade} from '@mui/material/';
import { Center } from '@chakra-ui/react';
export default function FriendsList(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {(props.users)?
        <>
        <Center>
        <Typography variant="h4" gutterBottom>
           Friends
      </Typography>
        </Center>
        <ul>
            {props.users.map(user=>{
                return (
            <li style={{listStyleType:"none"}}>
            <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <Typography variant="h6" gutterBottom>
            {user[0]}
            </Typography>
            </Button>
            </li>
                )
            })}
        </ul>
        </>
        :
        <></>}
        <Menu
        id="fade-menu"
        MenuListProps={{
            'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        >
        <MenuItem onClick={handleClose}>chat</MenuItem>
        <MenuItem onClick={handleClose}>send Currency</MenuItem>
        </Menu>
    </div>
  );
}