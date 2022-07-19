import React from 'react';
import LoginForm from "../components/user/LoginForm";
import { Container, styled} from "@mui/material";
const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '60vh',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(10, 0)
}));

const Login = () => {
    return (
        <Container maxWidth="sm">
            <ContentStyle>
            <LoginForm/>
            </ContentStyle>
        </Container>
    );
};

export default Login;
