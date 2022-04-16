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

