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


