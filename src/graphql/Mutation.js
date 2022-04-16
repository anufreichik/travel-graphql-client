import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation userLogin($email: String!, $password: String!) {
        userLogin (
            email: $email,
            password: $password
        ){
            _id
            email
            firstName
            lastName
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation userCreate($email: String!, $password: String!, $firstName:String!, $lastName:String) {
        userCreate (
            registerInput:{email:$email,password:$password, firstName:$firstName, lastName:$lastName}
        ){
            _id
            email
            firstName
            lastName
            token
        }
    }
`;



