import React, {useContext} from 'react';
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
const routerLinkStyle = {textDecoration:"none", color:"grey", fontSize:"14px"};
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
       <Box sx={{flexGrow:1}}>
           <AppBar position='static'>
               <Toolbar>
                   <Typography variant="h5" component="div">
                        <Link to="/" style={{textDecoration:"none", color:"grey"}}>Home</Link>
                   </Typography>
                   {
                       user ? (
                               <Box alignItems="right" sx={{flexGrow:1, textAlign:"right"}}>
                                   <Typography component="span">{`Logged in as ${user.email}`}</Typography>{' '}

                                   <IconButton
                                       aria-label="more"
                                       id="show-more"
                                       aria-controls={open ? 'show-more-menu' : undefined}
                                       aria-expanded={open ? 'true' : undefined}
                                       aria-haspopup="true"
                                       onClick={handleClick}
                                       size="small"
                                       sx={{ ml: 2 }}
                                   >
                                       <MoreVertIcon />
                                   </IconButton>
                                   <Menu
                                       id="basic-menu"
                                       anchorEl={anchorEl}
                                       open={open}
                                       onClose={handleClose}
                                       MenuListProps={{
                                           'aria-labelledby': 'basic-button',
                                       }}
                                       sx={{ marginRight: 3 }}
                                   >
                                       <MenuItem onClick={handleClose}>Profile</MenuItem>
                                       <MenuItem onClick={handleClose}><Link to="/useraccount" style={routerLinkStyle}>My Account</Link>
                                       </MenuItem>
                                       <MenuItem onClick={handleClose}> <Link to="/"  onClick={logout} style={routerLinkStyle}>Logout</Link></MenuItem>
                                   </Menu>

                               </Box>
                       ) :
                           (
                               <Box alignItems="right" sx={{flexGrow:1, textAlign:"right"}}>
                                   <Link to="/login" style={{...routerLinkStyle, marginRight:"10px"}}>Login</Link>
                                   <Link to="/register" style={routerLinkStyle}>Register</Link>
                               </Box>
                           )
                   }
               </Toolbar>
           </AppBar>
       </Box>
    );
}

export default Navbar;
