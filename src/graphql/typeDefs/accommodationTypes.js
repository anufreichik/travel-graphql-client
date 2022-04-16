import { gql } from '@apollo/client';

export const accommodationTypes=gql `
     type Query{
        accommodation(accommodationId:ID,destinationId:ID):Accommodation
        accommodations(destinationId:ID):Activity
    }

    type Accommodation{
        _id:ID
        accommodationName:String
        accommodationType:String
        address:String
        notes:String
        link:String
    }

    extend type Mutation {
        accommodationCreate(values:AccommodationInput):Accommodation
        accommodationUpdate(accommodationId:ID, values:AccommodationInput):Accommodation
        accommodationDelete(accommodationId:ID):String
    }

    input AccommodationInput{
        accommodationName: String
        accommodationType:String
        address:String
        notes:String
        link:String
        destination:ID!
        owner:ID
    }
`
