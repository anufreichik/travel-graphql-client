import React from 'react';
import { Container, styled} from "@mui/material";
import RegisterForm from "../components/user/RegisterForm";
const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '60vh',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(5, 0)
}));

const Register = () => {
    return (
        <Container maxWidth="sm">
            <ContentStyle>
              <RegisterForm/>
            </ContentStyle>
        </Container>
    );
};

export default Register;

