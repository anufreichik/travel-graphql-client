import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const registerSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    repassword: yup.string().required('Re-Password is required'),
    firstName:yup.string().required('First Name is required')
});

