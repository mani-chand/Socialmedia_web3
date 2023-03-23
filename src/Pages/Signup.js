import React, { useState, useEffect } from "react";
import Loader from "./../Components/Loader.js";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Navbar from "../Components/Navbar";
function Signup(props) {
const connect = useMetamask();
const address = useAddress();
const { contract } = useContract(
    "0xa514eA1a6a2EB698C34F0A0712D8e57A43B4D820"
);
const { mutateAsync: createUser, isLoading } = useContractWrite(
    contract,
    "createUser"
);
const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
});
useEffect(() => {
    const isAuth = localStorage.getItem("auth");
    if (isAuth === "true") {
    window.location.replace("/home");
    }
}, []);
const handleSubmit = async () => {
    connect();
    console.log(user, address);
    try {
    console.log(user.name, user.email, user.password);
    const _name = user.name;
    const _mail = user.email;
    const _password = user.password;
    const data = await createUser([_name, _mail, _password]);
    console.info("contract call successs", data);
    setUser({ name: "", email: "", password: "" });
    window.location.replace("/");
    } catch (err) {
    console.error("contract call failure", err);
    setUser({ name: "", email: "", password: "" });
    }
};
return (
    <Box>
    <Navbar />
    {isLoading ? (
        <Loader />
    ) : (
        <Stack>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Typography variant="h3">SIGNUP</Typography>
            <Stack>
            <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                type="text"
                value={user.name}
                onChange={(e) => {
                setUser({ ...user, name: e.target.value });
                }}
                style={{ width: 1000, marginTop: "20px" }}
            />
            <TextField
                id="standard-basic"
                label="email"
                variant="standard"
                type="email"
                value={user.email}
                onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                }}
                style={{ width: 1000, marginTop: "20px" }}
            />
            <TextField
                id="standard-basic"
                label="password"
                variant="standard"
                value={user.password}
                type="password"
                onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                }}
                style={{ width: 1000, marginTop: "20px" }}
            />
            </Stack>
            <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ width: 1000, marginTop: "20px" }}
            >
            SIGNUP
            </Button>
        </Box>
        </Stack>
    )}
    </Box>
);
}

export default Signup;
