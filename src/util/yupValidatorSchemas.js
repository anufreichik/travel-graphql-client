import * as yup from 'yup';

const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;
const urlRegEx = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*$)/;

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const registerSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    repassword: yup.string().required('Re-Password is required'),
    firstName: yup.string().required('First Name is required')
});

export const destinationSchema = yup.object().shape({
    name: yup.string().required('Destination Name is required')
});

export const activitySchema = yup.object().shape({
        activityName: yup.string().required('Activity Name is required'),
        activityLink: yup
            .string()
            .trim()
            .nullable()
            .notRequired()
            .when('activityLink', {
                is: (value) => value?.length,
                then: (rule) => rule.matches(urlRegEx, 'Link should be valid url'),
            }),
    },
    [
        ['activityLink', 'activityLink'],
    ]
);

export const foodExperienceSchema = yup.object().shape({
        foodPlaceName: yup.string().required('Activity Name is required'),
        foodPlaceLink: yup
            .string()
            .trim()
            .nullable()
            .notRequired()
            .when('foodPlaceLink', {
                is: (value) => value?.length,
                then: (rule) => rule.matches(urlRegEx, 'Link should be valid url'),
            }),
    },
    [
        ['foodPlaceLink', 'foodPlaceLink'],
    ]
);


export const accommodationSchema = yup.object().shape({
        accommodationName: yup.string().required('Accommodation Name is required'),
        accommodationLink: yup
            .string()
            .trim()
            .nullable()
            .notRequired()
            .when('accommodationLink', {
                is: (value) => value?.length,
                then: (rule) => rule.matches(urlRegEx, 'Link should be valid url'),
            }),
    },
    [
        ['accommodationLink', 'accommodationLink'],
    ]
);



