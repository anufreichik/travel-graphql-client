import { gql } from "@apollo/client";

export const GET_DESTINATIONS = gql`
    query Destinations($offset:Int, $limit:Int){
        destinations(offset:$offset, limit: $limit){
            list {
                destinationName
                destinationFood {
                    foodPlaceName
                    foodType
                }
                destinationActivity {
                    activityName
                    activityType
                }
            }
            totalCount
        }
    }
`;

export const GET_DESTINATIONSBYUSER = gql`
    query UserDestinations($owner:ID!){
        userdestinations(owner:$owner){
                destinationName
                destinationFood {
                    foodPlaceName
                    foodType
                }
                destinationActivity {
                    activityName
                }
            
        }
    }
`;

export const GET_DESTINATION_BYID = gql`
    query GetDestinationById($destinationId:ID!){
        destination(destinationId:$destinationId){
            destinationName
            destinationDescription
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


