import { gql } from '@apollo/client';
export const foodTypes=gql `
     extend type Query{
        foodPlace(foodPlaceId:ID,destinationId:ID):FoodPlace
        foodPlaces(destinationId:ID):FoodPlace
    }

    type FoodPlace{
        _id:ID
        foodPlaceName:String
        foodType:String
        address:String
        notes:String
        link:String
    }

    extend type Mutation {
        foodPlaceCreate(values:FoodPlaceInput):FoodPlace
        foodPlaceUpdate(foodPlaceId:ID, values:FoodPlaceInput):FoodPlace
        foodPlaceDelete(foodPlaceId:ID):String
    }

    input FoodPlaceInput{
        foodPlaceName: String
        foodType:String
        address:String
        notes:String
        link:String
        destination:ID!
        owner:ID
    }
`
