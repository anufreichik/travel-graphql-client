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

export const destinationSchema = yup.object().shape({
    name:yup.string().required('Destination Name is required')
});

export const activitySchema = yup.object().shape({
    activityName:yup.string().required('Activity Name is required'),
    link:yup.string()
       .matches(
           /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
           'Link should be valid url'
       )
});


