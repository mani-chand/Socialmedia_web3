import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
Typography,
Avatar,
Box,
Card,
CardHeader,
CardContent,
} from "@mui/material";
import { red } from "@mui/material/colors";
export default function Chats(props) {
const [_from, setFrom] = useState("");
const [_to, setTo] = useState("");
const { contract } = useContract(
    "0xE81dc4f52cBAAc9015DebdCadA96679139ce1867"
);
const { data } = useContractRead(contract, "getAllmessages");
const setUsers = () => {
    const _from = JSON.parse(localStorage.getItem("user"));
    setFrom(_from[0]);
    const _to = JSON.parse(localStorage.getItem("selectedUser"));
    setTo(_to[0]);
    console.log(_to[0], _from[0]);
};
useEffect(() => {
    setUsers();
}, []);
return (
    <>
    {data ? (
        <>
        {data.map((chat) => {
            return (
            <div>
                <Card
                style={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                sx={{ maxWidth: 345 }}
                >
                <Box>
                    {chat[1] === _to && chat[2] === _from ? (
                    <Box>
                        <CardHeader
                        avatar={
                            <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            >
                            R
                            </Avatar>
                        }
                        title={chat[2]}
                        subheader="September 14, 2016"
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {chat[0]}
                        </Typography>
                        </CardContent>
                    </Box>
                    ) : (
                    ""
                    )}
                </Box>
                <Box>
                    {chat[2] === _to && chat[1] === _from ? (
                    <Box>
                        <CardHeader
                        avatar={
                            <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            >
                            R
                            </Avatar>
                        }
                        title={chat[2]}
                        subheader="September 14, 2016"
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {chat[0]}
                        </Typography>
                        </CardContent>
                    </Box>
                    ) : (
                    ""
                    )}
                </Box>
                </Card>
            </div>
            );
        })}
        </>
    ) : (
        <></>
    )}
    </>
);
}
