import {gql} from "@apollo/client";

export const GET_DESTINATIONS = gql`
    query Destinations($offset:Int, $limit:Int){
        destinations(offset:$offset, limit: $limit){
            list {
                _id
                destinationName
                starredBy
                owner
                destinationFood {
                    foodPlaceName
                    foodType
                }
                destinationActivity {
                    activityName
                    activityType
                }
                destinationAccommodation {
                    accommodationName
                    accommodationType
                }
            }
            totalCount
        }
    }
`;

export const GET_DESTINATIONSBYUSER = gql`
    query UserDestinations($owner:ID!){
        userdestinations(owner:$owner){
            _id
            destinationName
            starredBy
            owner
            destinationFood {
                foodPlaceName
                foodType
            }
            destinationActivity {
                activityName
                activityType
            }
            destinationAccommodation {
                accommodationName
                accommodationType
            }
        }
    }
`;

export const GET_DESTINATION_BYID = gql`
    query GetDestinationById($destinationId:ID!){
        destination(destinationId:$destinationId){
            destinationName
            destinationDescription
            starredBy
            owner
            destinationFood {
                _id
                foodPlaceName
                foodType
                address
                notes
                link
            }
            destinationActivity {
                _id
                activityName
                activityType
                address
                notes
                link
            }
            destinationAccommodation {
                _id
                accommodationName
                accommodationType
                address
                link
                notes
            }

        }
    }
`;


