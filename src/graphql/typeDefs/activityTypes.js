import { gql } from '@apollo/client';

export const activityTypes=gql `
     extend type Query{
        activity(activityId:ID,destinationId:ID):Activity
        activities(destinationId:ID):Activity
    }

    type Activity{
        _id:ID
        activityName:String
        activityType:String
        address:String
        notes:String
        link:String
    }

    extend type Mutation {
        activityCreate(values:ActivityInput):Activity
        activityUpdate(activityId:ID, values:ActivityInput):Activity
        activityDelete(activityId:ID):String
    }

    input ActivityInput{
        activityName: String!
        activityType:String
        address:String
        notes:String
        link:String
        destination:ID!
        owner:ID
    }
`

