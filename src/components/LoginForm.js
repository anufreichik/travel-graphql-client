import React, {useState, useContext} from 'react';
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {loginSchema} from "../util/yupValidatorSchemas";
import {Box, Button, CircularProgress, Icon, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert, LoadingButton} from '@mui/lab';
import {AuthContext} from "../context/authContext";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../graphql/Mutation";
import {useNavigate} from "react-router-dom";


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);

    const {register, watch, handleSubmit, reset, control, getValues, formState: {errors}} = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
            },
            mode: 'onBlur',
            reValidateMode: 'onChange',
            resolver: yupResolver(loginSchema),
        }
    )

    const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER, {
        update(cache, result) {
            // Update the cache as an approximation of server-side mutation effects
            console.log(result, 'result in update')
        },
        onCompleted({userLogin}) {
            console.log(userLogin, 'loginUser data');
            if (userLogin) {
                context.login(userLogin);
                navigate('/');
            }
        }
        ,
        onError({graphQLErrors}) {
            setServerErrors(graphQLErrors[0].extensions.errors);
        },
       // variables: {email: getValues().email, password: getValues().password}
    });

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };



    const onSubmit = (formData) => {
        loginUser({
            variables: {email: formData.email, password: formData.password}
        });
    }

    if (loading) return <CircularProgress/>

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
                '& > :not(style)': {mt: 1},
            }}
            noValidate
            autoComplete="off"
        >
            {Object.keys(serverErrors).length > 0 && (
                <Box marginBottom={1}>
                    {Object.values(serverErrors).map((value, index) => (
                        <Alert key={index} severity={'error'}>{value.toString()}</Alert>
                    ))}
                </Box>
            )}
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    id='email'
                    type="email"
                    label="Email address"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    id='password'
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...register('password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />
            </Stack>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size='large'
                //loading={loading}
            >
                Login
            </Button>
            {serverErrors && serverErrors?.map((err, index) => <Alert key={index}
                                                                      severity={'error'}>{err.extensions.code}</Alert>)}
        </Box>
    );
};

export default LoginForm;
