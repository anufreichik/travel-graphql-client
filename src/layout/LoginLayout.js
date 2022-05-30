import React from 'react';
import {Box, Container, CssBaseline} from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';

const LoginLayout = ({children}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Navbar/>
                <Box sx={{ backgroundColor: '#f5f5f4', height: '100%', padding:'20px' }} >
                    <Outlet/>
                </Box>
                {/*<Footer/>*/}
            </Container>
        </React.Fragment>
    );
};

export default LoginLayout;
