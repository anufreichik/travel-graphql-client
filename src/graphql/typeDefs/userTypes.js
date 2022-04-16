import { gql } from '@apollo/client';

export const userTypes = gql`
    extend type Query {
        user(userId: ID!): User
        users(offset: Int, limit: Int): [User!]!
    }

    type Mutation {
        userCreate(registerInput:RegisterInput): RegisteredUser!
        userLogin(email:String!, password:String!):RegisteredUser!
    }

    input RegisterInput{
        email:String!
        password:String!
        firstName:String!
        lastName:String
    }

    type User {
        _id: ID!
        email: String!
        firstName: String!
        lastName: String
        lastAccess: String
    }

    type RegisteredUser {
        _id: ID!
        email: String!
        firstName: String
        lastName: String
        lastAccess: String
        token:String!
    }

`
