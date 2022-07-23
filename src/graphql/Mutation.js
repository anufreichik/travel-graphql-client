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

export const DESTINATION_CREATE = gql`
    mutation destinationCreate($destination: DestinationInput) {
        destinationCreate (
            values:$destination
        ){
            _id
            destinationName
            destinationDescription
            owner
        }
    }
`;

export const ACTIVITY_CREATE = gql`
    mutation activityCreate($activity: ActivityInput) {
        activityCreate (
            values: $activity
        ){
            _id
            activityName
            activityType
            address
            notes
            link
        }
    }
`;

export const FOOD_PLACE_CREATE = gql`
    mutation foodPlaceCreate($foodExperience: FoodPlaceInput) {
        foodPlaceCreate (
            values: $foodExperience
        ){
            _id
            foodPlaceName
            foodType
            address
            notes
            link
        }
    }
`;

export const ACCOMMODATION_CREATE = gql`
    mutation accommodationCreate($accommodation: AccommodationInput) {
        accommodationCreate (
            values: $accommodation
        ){
            _id
            accommodationName
            accommodationType
            address
            notes
            link
        }
    }
`;


export const DESTINATION_DELETE = gql`
    mutation destinationDelete($destinationId:ID!) {
        destinationDelete (
            destinationId: $destinationId
        )
    }
`;

export const FOOD_PLACE_DELETE = gql`
    mutation foodPlaceDelete($foodPlaceId:ID!) {
        foodPlaceDelete (
            foodPlaceId: $foodPlaceId
        )
    }
`;

export const FOOD_PLACE_UPDATE = gql`
    mutation foodPlaceUpdate($foodPlaceId:ID!, $foodPlace: FoodPlaceInput) {
        foodPlaceUpdate (
           values:$foodPlace, foodPlaceId: $foodPlaceId
        ){
            _id
            foodPlaceName
            foodType
            address
            notes
            link
        }
    }
`;



