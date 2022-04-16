import React, {useContext, useState} from 'react';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {registerSchema} from "../util/yupValidatorSchemas";
import {Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AuthContext} from "../context/authContext";
import {useMutation} from "@apollo/client";
import {REGISTER_USER} from "../graphql/Mutation";
import {useNavigate} from "react-router-dom";


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState({});

    const {register, watch, handleSubmit, reset, control, formState: {errors}} = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
                repassword: '',
                firstName: '',
                lastName: ''
            },
            mode: 'onBlur',
            reValidateMode: 'onChange',
            resolver: yupResolver(registerSchema),
        }
    )

    const [registerUser, {data, loading, error}] = useMutation(REGISTER_USER, {
        // errorPolicy: 'all',
        update(cache, result) {
            // Update the cache as an approximation of server-side mutation effects
            console.log(result, 'result in update')
        },
        onCompleted({userCreate}) {
            console.log(userCreate, 'register data');
            if (userCreate) {
                context.login(userCreate);
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
        registerUser({
            variables: {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName
            }
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

                <TextField
                    id='repassword'
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Re-Password"
                    {...register('repassword')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={Boolean(errors.repassword)}
                    helperText={errors.repassword?.message}
                />

                <TextField
                    id='firstName'
                    fullWidth
                    label="First Name"
                    {...register('firstName')}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    id='lastName'
                    fullWidth
                    label="Last Name"
                    {...register('lastName')}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                />

            </Stack>

            {/*<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}*/}
            {/*        label="Remember me"*/}
            {/*    />*/}

            {/*    <Link component={RouterLink} variant="subtitle2" to="#">*/}
            {/*        Forgot password?*/}
            {/*    </Link>*/}
            {/*</Stack>*/}

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size='large'
            >
                Create User
            </Button>

        </Box>
    );
};

export default RegisterForm;
