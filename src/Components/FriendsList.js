import React, { useState, useEffect } from "react";
import { Button, Typography, Menu, MenuItem, Fade } from "@mui/material/";
import { Center } from "@chakra-ui/react";
export default function FriendsList(props) {
const [curUser, setCurUser] = useState(null);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
useEffect(() => {
    const _from = JSON.parse(localStorage.getItem("user"));
    setCurUser(_from[0]);
}, [curUser]);
const handleClick = (event, index) => {
    localStorage.setItem("selectedUser", JSON.stringify(props.users[index]));
    setAnchorEl(event.currentTarget);
};
const handleClose = () => {
    setAnchorEl(null);
};
const handleChatClose = () => {
    setAnchorEl(null);
    window.location.replace("/chats");
};

return (
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }}
    >
    {props.users ? (
        <>
        <Center>
            <Typography variant="h4" gutterBottom>
            Friends
            </Typography>
        </Center>
        <ul>
            {props.users.map((user, index) => {
            return (
                <li style={{ listStyleType: "none" }}>
                <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleClick(e, index)}
                >
                    <Typography variant="h6" gutterBottom>
                    {user[0] === curUser ? "" : user[0]}
                    </Typography>
                </Button>
                </li>
            );
            })}
        </ul>
        </>
    ) : (
        <></>
    )}
    <Menu
        id="fade-menu"
        MenuListProps={{
        "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
    >
        <MenuItem onClick={handleChatClose}>chat</MenuItem>
    </Menu>
    </div>
);
}
