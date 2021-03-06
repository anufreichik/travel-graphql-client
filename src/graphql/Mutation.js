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

export const DESTINATION_STAR = gql`
    mutation destinationUpdateStarred($destinationId: ID!, $userId:ID!) {
        destinationUpdateStarred (
            destinationId:$destinationId
            userId:$userId
        ){
            _id
            destinationName
            destinationDescription
            starredBy
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

export const ACCOMMODATION_DELETE = gql`
    mutation accommodationDelete($accommodationId:ID!) {
        accommodationDelete (
            accommodationId: $accommodationId
        )
    }
`;

export const ACTIVITY_DELETE = gql`
    mutation activityDelete($activityId:ID!) {
        activityDelete (
        activityId: $activityId
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

export const ACCOMMODATION_UPDATE = gql`
    mutation accommodationUpdate($accommodationId:ID!, $accommodation: AccommodationInput) {
        accommodationUpdate (
            values:$accommodation, accommodationId: $accommodationId
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

export const ACTIVITY_UPDATE = gql`
    mutation activityUpdate($activityId:ID!, $activity: ActivityInput) {
        activityUpdate (
            values:$activity, activityId: $activityId
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
