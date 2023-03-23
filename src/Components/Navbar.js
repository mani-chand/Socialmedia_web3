import React,{useState,useEffect} from 'react';
import {ConnectWallet} from "@thirdweb-dev/react";
import {AppBar,Button,Typography,Toolbar,Box,CssBaseline,Divider,IconButton,List} from '@mui/material';
function Navbar(props) {
const { window } = props;
// eslint-disable-next-line
const [mobileOpen, setMobileOpen] = useState(false);
const [auth,setAuth] = useState(false)
const handleLogOut = ()=>{
    localStorage.setItem("auth",false)
    localStorage.removeItem("user")
}
const isLogout=()=>{
    const isAuth = localStorage.getItem("auth")
    if(isAuth==="true"){
        setAuth(true)
    }else{
        setAuth(false)
    }
}
useEffect(()=>{
    isLogout()
},[])
const handleDrawerToggle = () => {
setMobileOpen((prevState) => !prevState);
};
// eslint-disable-next-line
const drawer = (
<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
<Typography variant="h6" sx={{ my: 2 }}>
MUI
</Typography>
<Divider />
<List>
<Button
variant="contained"
>
Login
</Button>
<Button
variant="contained"
>
Signup
</Button>
<Button
variant="contained"
>
Connect
</Button>
</List>
</Box>
);
// eslint-disable-next-line
const container = window !== undefined ? () => window().document.body : undefined;

return (
<Box sx={{ display: 'flex' }}>
<CssBaseline />
    <AppBar component="nav">
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            </IconButton>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            Social Media
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(!auth)?
            <>
            <Button
            style={{fontSize:18,margin:"0 7px",backgroundColor:"#fff",color:"black"}}
            variant="contained"
            href="/"
            >
            Login
            </Button>
            <Button
            style={{fontSize:18,margin:"0 7px",backgroundColor:"#fff",color:"black"}}
            variant="contained"
            href="/newuser"
            >
            Signup
            </Button>
            </>
            :
            <>
            <Button
            style={{fontSize:18,margin:"0 7px",backgroundColor:"#fff",color:"black"}}
            variant="contained"
            href="/home"
            >
            Home
            </Button>
            <Button
            style={{fontSize:18,margin:"0 7px",backgroundColor:"#fff",color:"black"}}
            variant="contained"
            href="/"
            onClick={handleLogOut}
            >
            Logout
            </Button>
            </>}
            <Button>    
            <ConnectWallet>
               connect
            </ConnectWallet>
            </Button>
            </Box>
        </Toolbar>
    </AppBar>
</Box>
);
}

export default Navbar;
